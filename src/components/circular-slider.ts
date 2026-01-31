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

// Angle range for the arc (sweeping counter-clockwise from bottom-right to bottom-left)
const START_ANGLE = 34.2; // Right point (170, 150)
const END_ANGLE = 144.2; // Left point (30, 150)
const TOTAL_ARC_DEGREES = 180; // 180° arc passing through top

export class DayModeCircularSlider extends LitElement {
  @property({ attribute: false }) public hass: any;
  @property({ type: String }) public entityId?: string;
  @property({ type: String }) public currentValue?: string;
  @query("svg") private _svg?: SVGSVGElement;

  private _valueToPercentage(index: number): number {
    // Divide the arc into equal segments for each mode
    // For 3 modes: segment 0 = 0-33.33%, segment 1 = 33.33-66.67%, segment 2 = 66.67-100%
    return index / THERMOSTAT_MODES.length;
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

    // Calculate angle for 180° arc (opening at bottom)
    const phi = Math.atan2(y, x);
    const rad2deg = (rad: number) => (rad / (2 * Math.PI)) * 360;
    let angle = rad2deg(phi);

    // Adjust angle for 180° arc with opening at bottom (left=-90°, right=90°, bottom=180° or -180°)
    // Map angle so that: left side = 0%, right side = 100%, bottom = center
    if (angle < -90) angle = 180 + angle; // bottom left quadrant
    if (angle > 90) angle = 180 - angle; // bottom right quadrant

    // Normalize to 0-180 range
    const normalized = Math.max(0, Math.min(180, 90 + angle));

    return normalized / 180;
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
              const startAngle =
                (START_ANGLE + percentage * TOTAL_ARC_DEGREES) *
                (Math.PI / 180);
              const endAngle =
                (START_ANGLE + nextPercentage * TOTAL_ARC_DEGREES) *
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
              const sweepFlag = 1;

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
      cursor: pointer;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    }
  `;
}

customElements.define("day-mode-circular-slider", DayModeCircularSlider);
