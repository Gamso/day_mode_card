import { LitElement, html, css, svg } from "lit";
import { property, query } from "lit/decorators.js";

// Hardcoded thermostat modes (excluding "Eteint" which is handled by button)
const THERMOSTAT_MODES = ["Chauffage", "Climatisation", "Ventilation"];

// Arc configuration - similar to xiaomi (180° arc with opening at bottom)
const ARC_RADIUS = 85;
const ARC_PATH = "M 30 150 A 85 85 0 1 1 170 150"; // 180° arc, opening at bottom
const ARC_LENGTH = 85 * 2 * Math.PI * (180 / 360); // Circumference for 180°

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
    if (THERMOSTAT_MODES.length <= 1) return 0;
    return index / (THERMOSTAT_MODES.length - 1);
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
          <!-- Background arc -->
          ${svg`
            <path
              class="gauge-background"
              d="${ARC_PATH}"
              fill="none"
              stroke="var(--divider-color, #e0e0e0)"
              stroke-width="12"
              stroke-linecap="round"
              opacity="0.3"
            />
          `}

          <!-- Segments for each mode -->
          ${THERMOSTAT_MODES.map((mode, i) => {
            const [dasharray, dashoffset] = this._strokeDashArc(i, i + 1);
            const isActive = mode === this.currentValue;

            return svg`
              <path
                class="gauge-segment ${isActive ? "active" : ""}"
                d="${ARC_PATH}"
                fill="none"
                stroke="${
                  isActive
                    ? "var(--primary-color, #3b82f6)"
                    : "var(--divider-color, #e0e0e0)"
                }"
                stroke-width="12"
                stroke-linecap="round"
                stroke-dasharray="${dasharray}"
                stroke-dashoffset="${dashoffset}"
                opacity="${isActive ? 1 : 0.3}"
                style="cursor: pointer; transition: opacity 0.2s, stroke 0.2s;"
                @click=${(e: Event) => {
                  e.stopPropagation();
                  this._onSelect(i);
                }}
              />
            `;
          })}

          <!-- Dots (pastilles) at each mode position -->
          ${THERMOSTAT_MODES.map((mode, i) => {
            const percentage = this._valueToPercentage(i);
            // Place points along the arc from START_ANGLE (right, Chauffage) to END_ANGLE (left, Ventilation)
            // The arc passes through the top (270°)
            const angle =
              (START_ANGLE + percentage * TOTAL_ARC_DEGREES) * (Math.PI / 180);

            const dotX = CIRCLE_CENTER_X + ARC_RADIUS * Math.cos(angle);
            const dotY = CIRCLE_CENTER_Y + ARC_RADIUS * Math.sin(angle);

            const isActive = mode === this.currentValue;

            return svg`
              <circle
                cx="${dotX}"
                cy="${dotY}"
                r="6"
                fill="${isActive ? "var(--primary-color, #3b82f6)" : "white"}"
                stroke="var(--primary-color, #3b82f6)"
                stroke-width="2"
                style="cursor: pointer;"
                @click=${(e: Event) => {
                  e.stopPropagation();
                  this._onSelect(i);
                }}
              />
            `;
          })}

          <!-- Labels inside arc -->
          ${THERMOSTAT_MODES.map((mode, i) => {
            const percentage = this._valueToPercentage(i);
            const angle =
              (START_ANGLE + percentage * TOTAL_ARC_DEGREES) * (Math.PI / 180);

            // Label position inside the arc (closer to center)
            const labelRadius = ARC_RADIUS - 30;
            const labelX = CIRCLE_CENTER_X + labelRadius * Math.cos(angle);
            const labelY = CIRCLE_CENTER_Y + labelRadius * Math.sin(angle);

            const isActive = mode === this.currentValue;

            return svg`
              <text
                x="${labelX}"
                y="${labelY}"
                text-anchor="middle"
                dominant-baseline="middle"
                fill="${
                  isActive
                    ? "var(--primary-color, #3b82f6)"
                    : "var(--primary-text-color)"
                }"
                font-size="${isActive ? "14" : "12"}"
                font-weight="${isActive ? "700" : "500"}"
                style="cursor: pointer; user-select: none;"
                @click=${(e: Event) => {
                  e.stopPropagation();
                  this._onSelect(i);
                }}
              >
                ${mode}
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

    .gauge-background {
      fill: none;
      stroke: var(--divider-color, #e0e0e0);
      stroke-width: 12;
      stroke-linecap: round;
      opacity: 0.3;
    }

    .gauge-segment {
      fill: none;
      stroke-width: 12;
      stroke-linecap: round;
      transition:
        opacity 0.2s,
        stroke 0.2s;
    }

    .gauge-segment.active {
      opacity: 1;
    }
  `;
}

customElements.define("day-mode-circular-slider", DayModeCircularSlider);
