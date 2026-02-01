import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { localize } from "../localize/localize";
import "./circular-slider";

interface DayModeCardConfig {
  name?: string;
  mode_jour_entity?: string;
  mode_thermostat_entity?: string;
}

class DayModeCard extends LitElement {
  @property({ attribute: false }) public hass!: any;
  @state() private _config!: DayModeCardConfig;

  public static getStubConfig(): DayModeCardConfig {
    return {
      name: "Modes",
      mode_jour_entity: "input_select.mode_jour",
      mode_thermostat_entity: "input_select.mode_thermostat",
    };
  }

  public setConfig(config: DayModeCardConfig): void {
    if (!config) {
      throw new Error("Configuration manquante");
    }
    this._config = {
      name: config.name ?? "Modes",
      mode_jour_entity: config.mode_jour_entity ?? "input_select.mode_jour",
      mode_thermostat_entity:
        config.mode_thermostat_entity ?? "input_select.mode_thermostat",
    };
  }

  private getEntityState(entityId?: string) {
    if (!entityId) return undefined;
    return this.hass?.states?.[entityId];
  }

  private onSelect(entityId: string, ev: Event) {
    const target = ev.target as HTMLSelectElement;
    const option = target?.value;
    if (!option) return;
    this.hass.callService("input_select", "select_option", {
      entity_id: entityId,
      option,
    });
  }

  private onCircularSliderSelect(entityId: string, option: string) {
    this.hass.callService("input_select", "select_option", {
      entity_id: entityId,
      option,
    });
  }

  private onOffButtonClick(entityId: string) {
    this.hass.callService("input_select", "select_option", {
      entity_id: entityId,
      option: "Eteint",
    });
  }

  protected render() {
    if (!this.hass || !this._config) return nothing;
    const jour = this.getEntityState(this._config.mode_jour_entity);
    const thermo = this.getEntityState(this._config.mode_thermostat_entity);

    const jourOptions: string[] = jour?.attributes?.options ?? [];

    const title = this._config.name ?? localize(this.hass, "card.title");

    return html`
      <ha-card header="${title}">
        <div class="container">
          <div class="thermo-section">
            ${thermo
              ? html`
                  <day-mode-circular-slider
                    .hass=${this.hass}
                    .entityId=${thermo.entity_id}
                    .currentValue=${thermo.state}
                    @option-selected=${(e: any) =>
                      this.onCircularSliderSelect(
                        thermo.entity_id,
                        e.detail.option,
                      )}
                  ></day-mode-circular-slider>
                  <div class="thermo-bottom">
                    <button
                      class="off-button ${thermo.state === "off"
                        ? "active"
                        : ""}"
                      @click=${() => this.onOffButtonClick(thermo.entity_id)}
                      title="${localize(this.hass, "card.off")}"
                    >
                      <ha-icon icon="mdi:power"></ha-icon>
                    </button>
                    <div class="jour-section">
                      <select
                        @change=${(e: Event) =>
                          this.onSelect(jour.entity_id, e)}
                      >
                        ${jourOptions.map(
                          (opt) =>
                            html`<option
                              value="${opt}"
                              ?selected=${opt === jour.state}
                            >
                              ${opt}
                            </option>`,
                        )}
                      </select>
                    </div>
                  </div>
                `
              : html`<div class="error">
                  ${localize(this.hass, "card.entity_not_found", {
                    entity: String(this._config.mode_thermostat_entity),
                  })}
                </div>`}
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    ha-card {
      padding: 12px;
    }

    .container {
      display: flex;
      justify-content: center;
    }

    .thermo-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0;
    }

    .label {
      font-weight: 600;
      margin-bottom: 12px;
    }

    select {
      padding: 8px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      min-width: 100px;
    }

    .error {
      color: var(--error-color);
    }

    .thermo-bottom {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
      margin-top: 16px;
      width: 100%;
    }

    .jour-section {
      display: flex;
      flex-direction: column;
      gap: 4px;
      align-items: center;
    }

    .jour-label {
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      opacity: 0.7;
    }

    .off-button {
      width: 40px;
      height: 40px;
      border: none;
      border-radius: 50%;
      background: var(--card-background-color);
      color: var(--disabled-text-color);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      flex-shrink: 0;
      padding: 0;
      margin: 0;
      border: 1px solid var(--divider-color, #ccc);
    }

    .off-button:hover:not(:disabled) {
      border-color: var(--primary-color, #3b82f6);
      opacity: 0.8;
      transform: scale(1.1);
    }

    .off-button:active:not(:disabled) {
      transform: scale(0.95);
    }

    .off-button.active {
      background: var(--primary-color, #3b82f6);
      color: var(--text-primary-color, white);
      border-color: var(--primary-color, #3b82f6);
    }
  `;
}

if (!customElements.get("day-mode-card")) {
  customElements.define("day-mode-card", DayModeCard);
}

export { DayModeCard };
