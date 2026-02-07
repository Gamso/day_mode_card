import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";
import { localize } from "../localize/localize";

interface DayModeCardConfig {
  name?: string;
  mode_jour_entity?: string;
  mode_thermostat_entity?: string;
  show_title?: boolean;
}

class DayModeCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: any;
  @state() private _config!: DayModeCardConfig;

  public setConfig(config: DayModeCardConfig): void {
    this._config = config;
  }

  private _onNameChanged(ev: Event) {
    if (!this._config || !this.hass) return;
    const target = ev.target as any;
    const newValue = target.value;
    if (this._config.name === newValue) return;

    const newConfig = { ...this._config, name: newValue };
    this._config = newConfig;
    this._dispatchConfigChanged(newConfig);
  }

  private _onEntityChanged(
    ev: CustomEvent,
    fieldName: keyof DayModeCardConfig,
  ) {
    if (!this._config || !this.hass) return;
    const newValue = ev.detail.value;
    if ((this._config as any)[fieldName] === newValue) return;

    const newConfig = { ...this._config, [fieldName]: newValue };
    this._config = newConfig;
    this._dispatchConfigChanged(newConfig);
  }

  private _onShowTitleChanged(ev: Event) {
    if (!this._config || !this.hass) return;
    const target = ev.target as any;
    const newValue = target.checked;
    if (this._config.show_title === newValue) return;

    const newConfig = { ...this._config, show_title: newValue };
    this._config = newConfig;
    this._dispatchConfigChanged(newConfig);
  }

  private _dispatchConfigChanged(newConfig: DayModeCardConfig) {
    const event = new CustomEvent("config-changed", {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  protected render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    return html`
      <div class="card-config">
        <ha-textfield
          label="${localize(this.hass, "editor.name")}"
          .value=${this._config.name || ""}
          @input=${this._onNameChanged}
        ></ha-textfield>

        <ha-entity-picker
          label="${localize(this.hass, "editor.mode_jour_entity")}"
          .hass=${this.hass}
          .value=${this._config.mode_jour_entity || ""}
          @value-changed=${(e: CustomEvent) =>
            this._onEntityChanged(e, "mode_jour_entity")}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-entity-picker
          label="${localize(this.hass, "editor.mode_thermostat_entity")}"
          .hass=${this.hass}
          .value=${this._config.mode_thermostat_entity || ""}
          @value-changed=${(e: CustomEvent) =>
            this._onEntityChanged(e, "mode_thermostat_entity")}
          allow-custom-entity
        ></ha-entity-picker>

        <ha-formfield label="${localize(this.hass, "editor.show_title")}">
          <ha-switch
            .checked=${this._config.show_title !== false}
            @change=${this._onShowTitleChanged}
          ></ha-switch>
        </ha-formfield>
      </div>
    `;
  }

  static styles = css`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px 0;
    }

    ha-textfield,
    ha-entity-picker {
      width: 100%;
    }

    ha-formfield {
      display: flex;
      align-items: center;
      padding: 8px 0;
    }
  `;
}

if (!customElements.get("day-mode-card-editor")) {
  customElements.define("day-mode-card-editor", DayModeCardEditor);
}

export { DayModeCardEditor };
