import { LitElement, html, css, svg } from "lit";
import { property, query } from "lit/decorators.js";

// Hardcoded thermostat modes (excluding "Eteint" which is handled by button)
const THERMOSTAT_MODES = ["Chauffage", "Climatisation", "Ventilation"];

// Arc configuration - similar to xiaomi (180° arc with opening at bottom)
const ARC_RADIUS = 85;
const ARC_PATH = "M 30 150 A 85 85 0 1 1 170 150"; // 180° arc, opening at bottom
const ARC_LENGTH = 85 * 2 * Math.PI * (180 / 360); // Circumference for 180°
const STROKE_WIDTH = 25; // Increased stroke width for better visibility
const CLICK_AREA_PADDING = 10; // Additional padding for clickable area

// Circle center for this arc (calculated from arc geometry)
const CIRCLE_CENTER_X = 100;
const CIRCLE_CENTER_Y = 102; // Approximately (actual: 101.78)

// Angle range for the arc (going backwards from right through top to left)
const START_ANGLE = 34.2; // Right point (170, 150) - Start of arc at 0%
const TOTAL_ARC_DEGREES = 180; // 180° arc passing through top
const ARC_END_ANGLE = START_ANGLE - TOTAL_ARC_DEGREES; // -145.8° (end of arc at 100%)
const ARC_END_ANGLE_POSITIVE = ARC_END_ANGLE + 360; // 214.2° (positive equivalent)

export class DayModeCircularSlider extends LitElement {
  @property({ attribute: false }) public hass: any;
  @property({ type: String }) public entityId?: string;
  @property({ type: String }) public currentValue?: string;
  @query("svg") private _svg?: SVGSVGElement;

  private _valueToPercentage(index: number): number {
    // Reverse the index mapping so that:
    // - index 0 (Chauffage, first in list) -> 100% (left side of arc)
    // - index 1 (Climatisation) -> 66.67% (top/middle)
    // - index 2 (Ventilation, last in list) -> 33.33% -> 0% (right side of arc)
    if (THERMOSTAT_MODES.length <= 1) return 0;
    const reversedIndex = THERMOSTAT_MODES.length - index;
    return reversedIndex / THERMOSTAT_MODES.length;
  }

  private _strokeDashArc(fromIndex: number, toIndex: number): [string, string] {
    const start = this._valueToPercentage(fromIndex);
    const end = this._valueToPercentage(toIndex);

    const arc = Math.max((end - start) * ARC_LENGTH, 0);
    const arcOffset = start * ARC_LENGTH;

    const strokeDasharray = `${arc} ${ARC_LENGTH - arc}`;
    const strokeDashOffset = `-${arcOffset}`;

    return [strokeDasharray, strokeDashOffset];
  }

  private _getPercentageFromEvent(e: MouseEvent | TouchEvent): number {
    if (!this._svg) return 0;

    let clientX = 0;
    let clientY = 0;

    if (e instanceof MouseEvent) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else if (e instanceof TouchEvent && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    const bound = this._svg.getBoundingClientRect();
    const x = (2 * (clientX - bound.left - bound.width / 2)) / bound.width;
    const y = (2 * (clientY - bound.top - bound.height / 2)) / bound.height;

    // Calculate angle from center
    const phi = Math.atan2(y, x);
    const rad2deg = (rad: number) => (rad / (2 * Math.PI)) * 360;
    let angle = rad2deg(phi);

    // The arc goes from START_ANGLE (right) backwards through -90° (top) to ARC_END_ANGLE (left)
    // Valid arc range: START_ANGLE to ARC_END_ANGLE (going backwards/counterclockwise)
    // In positive angles: START_ANGLE and (ARC_END_ANGLE_POSITIVE to 360)
    
    // Check if click is in the valid arc range
    if (angle >= ARC_END_ANGLE && angle <= START_ANGLE) {
      // In the arc range (including negative angles from -145.8° to 34.2°)
      // Convert to percentage: 0% at START_ANGLE, 100% at ARC_END_ANGLE
      const angleFromStart = START_ANGLE - angle;
      const percentage = angleFromStart / TOTAL_ARC_DEGREES;
      return Math.max(0, Math.min(1, percentage));
    } else if (angle >= ARC_END_ANGLE_POSITIVE) {
      // Also in arc range (positive angles >= 214.2°, wrapping from 360° toward 0°)
      const angleFromStart = START_ANGLE + (360 - angle);
      const percentage = angleFromStart / TOTAL_ARC_DEGREES;
      return Math.max(0, Math.min(1, percentage));
    }
    
    // Click is outside the arc (in the bottom gap between 34° and 214°)
    return -1; // Return invalid value
  }

  private _onSelect(index: number) {
    const option = THERMOSTAT_MODES[index];
    if (!option) return;

    this.dispatchEvent(
      new CustomEvent("option-selected", {
        detail: { index, option },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _onSvgClick(e: MouseEvent) {
    const percentage = this._getPercentageFromEvent(e);
    // If percentage is -1, the click was outside the arc
    if (percentage < 0) return;
    
    const index = Math.round(percentage * (THERMOSTAT_MODES.length - 1));
    this._onSelect(Math.max(0, Math.min(index, THERMOSTAT_MODES.length - 1)));
  }

  protected render() {
    return html`
      <div class="slider-container">
        <svg viewBox="0 0 200 200" @click=${this._onSvgClick}>
          <!-- Define text paths for each zone -->
          <defs>
            ${THERMOSTAT_MODES.map((mode, i) => {
              const percentage = this._valueToPercentage(i);
              const nextPercentage = this._valueToPercentage(i + 1);
              const midPercentage = (percentage + nextPercentage) / 2;

              // Calculate start and end angles for this segment
              // Arc goes from right (34°) backwards through top to left
              // So we SUBTRACT the angle offset
              const startAngle =
                (START_ANGLE - percentage * TOTAL_ARC_DEGREES) *
                (Math.PI / 180);
              const endAngle =
                (START_ANGLE - nextPercentage * TOTAL_ARC_DEGREES) *
                (Math.PI / 180);

              // Calculate path for text to follow
              const startX =
                CIRCLE_CENTER_X + ARC_RADIUS * Math.cos(startAngle);
              const startY =
                CIRCLE_CENTER_Y + ARC_RADIUS * Math.sin(startAngle);
              const endX = CIRCLE_CENTER_X + ARC_RADIUS * Math.cos(endAngle);
              const endY = CIRCLE_CENTER_Y + ARC_RADIUS * Math.sin(endAngle);

              // Large arc flag: 0 for arcs < 180°, 1 for arcs >= 180°
              // Each mode segment spans ~60° (180° / 3), so we use 0
              const largeArcFlag = 0;
              // Sweep flag: 0 for counter-clockwise, 1 for clockwise
              // Since we're going backwards (decreasing angles), we need sweep=0
              const sweepFlag = 0;

              const textPath = `M ${startX} ${startY} A ${ARC_RADIUS} ${ARC_RADIUS} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY}`;

              return svg`
                <path
                  id="textPath-${i}"
                  d="${textPath}"
                  fill="none"
                />
              `;
            })}
          </defs>

          <!-- Background arc (light gray, full width) -->
          ${svg`
            <path
              class="gauge-background"
              d="${ARC_PATH}"
              fill="none"
              stroke="var(--divider-color, #e0e0e0)"
              stroke-width="${STROKE_WIDTH}"
              stroke-linecap="butt"
              opacity="0.3"
            />
          `}

          <!-- Segments for each mode - only show the active one colored -->
          ${(() => {
            const activeIndex = THERMOSTAT_MODES.findIndex(
              (mode) => mode === this.currentValue,
            );
            if (activeIndex === -1) return svg``;

            const [dasharray, dashoffset] = this._strokeDashArc(
              activeIndex,
              activeIndex + 1,
            );

            return svg`
              <path
                class="gauge-segment active"
                d="${ARC_PATH}"
                fill="none"
                stroke="var(--primary-color, #3b82f6)"
                stroke-width="${STROKE_WIDTH}"
                stroke-linecap="butt"
                stroke-dasharray="${dasharray}"
                stroke-dashoffset="${dashoffset}"
                opacity="1"
                style="cursor: pointer; transition: opacity 0.2s, stroke 0.2s;"
              />
            `;
          })()}

          <!-- Clickable areas for each zone (invisible overlay) -->
          ${THERMOSTAT_MODES.map((mode, i) => {
            const [dasharray, dashoffset] = this._strokeDashArc(i, i + 1);

            return svg`
              <path
                d="${ARC_PATH}"
                fill="none"
                stroke="transparent"
                stroke-width="${STROKE_WIDTH + CLICK_AREA_PADDING}"
                stroke-linecap="butt"
                stroke-dasharray="${dasharray}"
                stroke-dashoffset="${dashoffset}"
                style="cursor: pointer;"
                @click=${(e: Event) => {
                  e.stopPropagation();
                  this._onSelect(i);
                }}
              />
            `;
          })}

          <!-- Curved text labels on the arc -->
          ${THERMOSTAT_MODES.map((mode, i) => {
            return svg`
              <text
                fill="var(--primary-text-color)"
                font-size="12"
                font-weight="600"
                style="cursor: pointer; user-select: none;"
                @click=${(e: Event) => {
                  e.stopPropagation();
                  this._onSelect(i);
                }}
              >
                <textPath
                  href="#textPath-${i}"
                  startOffset="50%"
                  text-anchor="middle"
                >
                  ${mode}
                </textPath>
              </text>
            `;
          })}
        </svg>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    .slider-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 20px 0;
    }

    svg {
      width: 100%;
      max-width: 280px;
      height: auto;
      aspect-ratio: 1;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    }
  `;
}

customElements.define("day-mode-circular-slider", DayModeCircularSlider);
