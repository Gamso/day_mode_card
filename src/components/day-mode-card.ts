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
  @state() private _showScheduler = false;

  public static getStubConfig(): DayModeCardConfig {
    return {
      name: "Thermostat",
      mode_jour_entity: "input_select.mode_jour",
      mode_thermostat_entity: "input_select.mode_thermostat",
    };
  }

  public setConfig(config: DayModeCardConfig): void {
    if (!config) {
      throw new Error("Configuration manquante");
    }
    this._config = {
      name: config.name ?? "Thermostat",
      mode_jour_entity: config.mode_jour_entity ?? "input_select.mode_jour",
      mode_thermostat_entity:
        config.mode_thermostat_entity ?? "input_select.mode_thermostat",
    };
  }

  public getCardSize(): number {
    return 4;
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

  private _renderScheduler(
    dayMode: string,
    thermoMode: string,
    thermoOptions: string[],
  ) {
    // Exclude all thermoMode that are NOT the selected one
    const excludedThermoModes = thermoOptions.filter(
      (mode) => mode !== thermoMode,
    );

    const schedulerConfig = {
      type: "custom:scheduler-card",
      title: false,
      tags: dayMode,
      exclude_tags: excludedThermoModes,
      display_options: {
        primary_info: ["<i><b><font color=orange>{name}</style></b></i>"],
        secondary_info: [
          "<i><b>Prochain lancement</b></i>{relative-time}",
          "<i><b>Planification</b></i> {days}",
          "additional-tasks",
        ],
        icon: "entity",
      },
      sort_by: ["title"],
      discover_existing: false,
      show_header_toggle: false,
      time_step: 5,
    };

    return html`
      <div class="scheduler-view">
        <hui-card .hass=${this.hass} .config=${schedulerConfig}></hui-card>
      </div>
    `;
  }

  private _renderMain(thermo: any, jour: any, jourOptions: string[]) {
    return html`
      <div class="thermo-section">
        <day-mode-circular-slider
          .hass=${this.hass}
          .entityId=${thermo.entity_id}
          .currentValue=${thermo.state}
          @option-selected=${(e: any) =>
            this.onCircularSliderSelect(thermo.entity_id, e.detail.option)}
        ></day-mode-circular-slider>

        <div class="thermo-bottom">
          <button
            class="off-button ${["Eteint", "off"].includes(thermo.state)
              ? "active"
              : ""}"
            @click=${() => this.onOffButtonClick(thermo.entity_id)}
          >
            <ha-icon icon="mdi:power"></ha-icon>
          </button>

          <div class="jour-section">
            <select @change=${(e: Event) => this.onSelect(jour.entity_id, e)}>
              ${jourOptions.map(
                (opt) =>
                  html`<option value="${opt}" ?selected=${opt === jour.state}>
                    ${opt}
                  </option> `,
              )}
            </select>
          </div>
        </div>
      </div>
    `;
  }

  protected render() {
    if (!this.hass || !this._config) return nothing;

    const jour = this.getEntityState(this._config.mode_jour_entity);
    const thermo = this.getEntityState(this._config.mode_thermostat_entity);
    const title = this._config.name ?? localize(this.hass, "card.title");

    if (!thermo || !jour)
      return html`<div class="error">Entités introuvables</div>`;

    return html`
      <ha-card header="${title}">
        <div class="card-header-container">
          <ha-icon-button
            class="menu-toggle"
            @click=${() => {
              this._showScheduler = !this._showScheduler;
            }}
          >
            <ha-icon
              icon="${this._showScheduler
                ? "mdi:arrow-left"
                : "mdi:dots-vertical"}"
            ></ha-icon>
          </ha-icon-button>
        </div>

        <div class="container">
          ${this._showScheduler
            ? this._renderScheduler(
                jour.state,
                thermo.state,
                thermo.attributes?.options ?? [],
              )
            : this._renderMain(thermo, jour, jour.attributes?.options ?? [])}
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    ha-card {
      padding: 8px;
      position: relative;
      min-height: 240px;
      text-align: center;
    }

    .card-header-container {
      position: absolute;
      top: 8px;
      right: 8px;
    }

    .card-title {
      font-size: 18px;
      font-weight: 500;
      color: var(--primary-text-color);
    }

    .menu-toggle {
      color: var(--secondary-text-color);
      /* Set a fixed size for the button */
      --mdc-icon-button-size: 40px;

      /* Force icon centering inside the button */
      display: inline-flex;
      align-items: center;
      justify-content: center;

      /* Tweak alignment inside the absolute header */
      padding: 0;
      margin: 0;
    }

    /* Optional: if the icon still looks off by a pixel */
    .menu-toggle ha-icon {
      display: flex;
    }

    .container {
      display: flex;
      justify-content: center;
      width: 100%;
    }

    /* SLIDER VIEW */
    .thermo-section {
      position: relative;
      width: 100%;
      max-width: 240px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    day-mode-circular-slider {
      width: 100%;
    }

    .thermo-bottom {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 12px;
      z-index: 2;
    }

    /* SCHEDULER VIEW */
    .scheduler-view {
      width: 100%;
      animation: fadeIn 0.3s ease-out;
      text-align: left;
    }

    .scheduler-header {
      text-align: left;
      margin-bottom: 12px;
      font-size: 14px;
      color: var(--secondary-text-color);
    }

    hui-card {
      --ha-card-box-shadow: none;
      --ha-card-border-width: 0;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(5px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* UI ELEMENTS */
    select {
      padding: 8px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }

    .off-button {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color);
      color: var(--disabled-text-color);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .off-button.active {
      background: var(--primary-color, #3b82f6);
      color: white;
      border-color: var(--primary-color);
    }

    .error {
      color: var(--error-color);
      padding: 16px;
    }
  `;
}

if (!customElements.get("day-mode-card")) {
  customElements.define("day-mode-card", DayModeCard);
}

export { DayModeCard };
