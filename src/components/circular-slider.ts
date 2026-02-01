import { LitElement, html, css, svg } from "lit";
import { property, query } from "lit/decorators.js";

/* =======================
   CONFIGURATION
======================= */

const THERMOSTAT_MODES = ["Chauffage", "Climatisation", "Ventilation"];

const STROKE_WIDTH = 25;
const CLICK_AREA_PADDING = 10;

// 180° arc (opening at the bottom)
const ARC_PATH = "M 30 150 A 85 85 0 1 1 170 150";

// Angles used for click calculations
const START_ANGLE = 34.2;
const TOTAL_ARC_DEGREES = 180;
const ARC_END_ANGLE = START_ANGLE - TOTAL_ARC_DEGREES;
const ARC_END_ANGLE_POSITIVE = ARC_END_ANGLE + 360;

/* =======================
   COMPONENT
======================= */

export class DayModeCircularSlider extends LitElement {
  @property({ attribute: false }) public hass!: any;
  @property() public entityId!: string;
  @property() public currentValue!: string;
  @property({ type: Number }) private selectedIndex = -1;
  @query("svg") private _svg?: SVGSVGElement;

  /* =======================
     UTILS
  ======================= */

  private _valueToPercentage(index: number): number {
    // Divide by total length to get equal segments (1/3 each)
    // Keep left-to-right mapping (0 -> 1)
    return index / THERMOSTAT_MODES.length;
  }

  // Build dasharray for a total length of 1 (via pathLength="1")
  private _strokeDashArc(fromIndex: number, toIndex: number): [string, string] {
    const start = this._valueToPercentage(fromIndex); // e.g. 0.33
    const end = this._valueToPercentage(toIndex); // e.g. 0.66

    const length = end - start; // Segment length (e.g. 0.33)

    // Dasharray: "segment_length  large_gap"
    // Dashoffset: "-start_point" (negative shifts the stroke to the right)
    return [`${length} 10`, `-${start}`];
  }

  private _getPercentageFromEvent(e: MouseEvent): number {
    if (!this._svg) return -1;

    const rect = this._svg.getBoundingClientRect();
    const x = (2 * (e.clientX - rect.left - rect.width / 2)) / rect.width;
    const y = (2 * (e.clientY - rect.top - rect.height / 2)) / rect.height;

    const angle = (Math.atan2(y, x) * 180) / Math.PI;

    if (angle >= ARC_END_ANGLE && angle <= START_ANGLE) {
      return (START_ANGLE - angle) / TOTAL_ARC_DEGREES;
    }

    if (angle >= ARC_END_ANGLE_POSITIVE) {
      return (START_ANGLE + (360 - angle)) / TOTAL_ARC_DEGREES;
    }

    return -1;
  }

  private _onSvgClick(e: MouseEvent) {
    const p = this._getPercentageFromEvent(e);
    if (p < 0) return;

    // Removed the "length - 1 - ..." inversion
    // Map percentage (0 to 1) directly to index (0, 1, 2)
    const index = Math.floor(p * THERMOSTAT_MODES.length);

    const selectedIdx = Math.max(
      0,
      Math.min(index, THERMOSTAT_MODES.length - 1),
    );

    this.dispatchEvent(
      new CustomEvent("option-selected", {
        detail: { option: THERMOSTAT_MODES[selectedIdx] },
        bubbles: true,
        composed: true,
      }),
    );
  }

  /* =======================
     RENDER
  ======================= */

  protected render() {
    // Sync selectedIndex with currentValue
    // If currentValue is "Eteint" or "off", clear selection (selectedIndex = -1)
    let currentIndex = -1;
    if (this.currentValue && !["Eteint", "off"].includes(this.currentValue)) {
      currentIndex = THERMOSTAT_MODES.indexOf(this.currentValue);
    }
    if (currentIndex !== -1) {
      this.selectedIndex = currentIndex;
    } else {
      this.selectedIndex = -1;
    }

    return html`
      <div class="slider-container">
        <svg viewBox="0 0 200 200" @click=${this._onSvgClick}>
          <defs>
            <path id="arcPath" d="${ARC_PATH}" pathLength="1" />
          </defs>

          ${svg`
            <path
              d="${ARC_PATH}"
              fill="none"
              stroke="var(--divider-color, #e0e0e0)"
              stroke-width="${STROKE_WIDTH}"
              opacity="0.3"
              pathLength="1" 
            />
          `} ${this.selectedIndex !== -1
            ? (() => {
                const [dasharray, dashoffset] = this._strokeDashArc(
                  this.selectedIndex,
                  this.selectedIndex + 1,
                );

                return svg`
                  <path
                    d="${ARC_PATH}"
                    fill="none"
                    stroke="var(--primary-color, #3b82f6)"
                    stroke-width="${STROKE_WIDTH}"
                    stroke-dasharray="${dasharray}"
                    stroke-dashoffset="${dashoffset}"
                    stroke-linecap="butt"
                    pathLength="1"
                  />
                `;
              })()
            : null}
          ${THERMOSTAT_MODES.map((_, i) => {
            const [dasharray, dashoffset] = this._strokeDashArc(i, i + 1);

            return svg`
              <path
                d="${ARC_PATH}"
                fill="none"
                stroke="transparent"
                stroke-width="${STROKE_WIDTH + CLICK_AREA_PADDING}"
                stroke-dasharray="${dasharray}"
                stroke-dashoffset="${dashoffset}"
                pathLength="1"
                style="cursor: pointer;"
                @click=${(e: Event) => {
                  e.stopPropagation();
                  this.dispatchEvent(
                    new CustomEvent("option-selected", {
                      detail: { option: THERMOSTAT_MODES[i] },
                      bubbles: true,
                      composed: true,
                    }),
                  );
                }}
              />
            `;
          })}
          ${THERMOSTAT_MODES.map((mode, i) => {
            // Compute the center position of the segment (not just i + 0.5)
            const segmentStart = this._valueToPercentage(i);
            const segmentEnd = this._valueToPercentage(i + 1);
            const segmentCenter = (segmentStart + segmentEnd) / 2;
            const startOffset = segmentCenter * 100;

            return svg`
              <text
                font-size="12"
                font-weight="600"
                fill="var(--primary-text-color)"
                text-anchor="middle"
                dominant-baseline="middle"
                style="cursor: pointer; user-select: none;"
                @click=${(e: Event) => {
                  e.stopPropagation();
                  this.dispatchEvent(
                    new CustomEvent("option-selected", {
                      detail: { option: mode },
                      bubbles: true,
                      composed: true,
                    }),
                  );
                }}
              >
                <textPath href="#arcPath" startOffset="${startOffset}%" text-anchor="middle">
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
      justify-content: center;
      padding: 20px 0;
    }

    svg {
      width: 100%;
      max-width: 280px;
      aspect-ratio: 1;
    }
  `;
}

customElements.define("day-mode-circular-slider", DayModeCircularSlider);
