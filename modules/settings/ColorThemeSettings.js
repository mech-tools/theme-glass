import { CONSTANTS } from "../shared/constants.js";
import { SETTINGS } from "./settings.js";

/**
 * Special setting to change components' colors
 */
export class ColorThemeSettings extends FormApplication {
  /**
   * Components i18n
   */
  COMPONENTS = {
    colorPrimary: game.i18n.localize(
      `${CONSTANTS.MODULE_NAME}.settings.${SETTINGS.COLOR_THEME_FORM}.color-primary`
    ),
    colorSecondary: game.i18n.localize(
      `${CONSTANTS.MODULE_NAME}.settings.${SETTINGS.COLOR_THEME_FORM}.color-secondary`
    ),
    colorText: game.i18n.localize(
      `${CONSTANTS.MODULE_NAME}.settings.${SETTINGS.COLOR_THEME_FORM}.color-text`
    ),
    colorTextHighlight: game.i18n.localize(
      `${CONSTANTS.MODULE_NAME}.settings.${SETTINGS.COLOR_THEME_FORM}.color-text-highlight`
    ),
    colorTextDim: game.i18n.localize(
      `${CONSTANTS.MODULE_NAME}.settings.${SETTINGS.COLOR_THEME_FORM}.color-text-dim`
    )
  };

  /**
   * Colors default values
   */
  static DEFAULTS = {
    colorPrimary: "#20222c",
    colorSecondary: "#d2232a",
    colorText: "#f0f0e0",
    colorTextHighlight: "#ffffff",
    colorTextDim: "#acacac"
  };

  /**
   * Register the settings
   */
  static register() {
    // Button displayed in the FVTT settings
    game.settings.registerMenu(CONSTANTS.MODULE_NAME, SETTINGS.COLOR_THEME_FORM, {
      label: game.i18n.localize(
        `${CONSTANTS.MODULE_NAME}.settings.${SETTINGS.COLOR_THEME_FORM}.menu`
      ),
      icon: "fa-solid fa-palette",
      type: ColorThemeSettings,
      restricted: true
    });

    // Hidden setting to store the values
    game.settings.register(CONSTANTS.MODULE_NAME, SETTINGS.COLOR_THEME_VALUES, {
      scope: "world",
      config: false,
      default: JSON.stringify(this.DEFAULTS),
      type: String,
      onChange: () => foundry.utils.debouncedReload()
    });
  }

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      ...super.defaultOptions,
      template: `${CONSTANTS.PATH}templates/color-theme-settings.hbs`,
      title: game.i18n.localize(
        `${CONSTANTS.MODULE_NAME}.settings.${SETTINGS.COLOR_THEME_FORM}.title`
      ),
      width: 550,
      id: `${CONSTANTS.MODULE_NAME}-${SETTINGS.COLOR_THEME_FORM}`
    });
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    const rawHtml = html[0];

    // Text input changed
    rawHtml.querySelectorAll("input.color").forEach((input) => {
      input.addEventListener("change", (event) => {
        event.target.nextElementSibling.value = event.target.value;
      });
    });

    // Color input changed
    rawHtml.querySelectorAll('input[type="color"]').forEach((input) => {
      input.addEventListener("change", (event) => {
        event.target.previousElementSibling.value = event.target.value;
      });
    });

    // Reset button
    rawHtml.querySelector("#reset").addEventListener("click", (event) => {
      event.preventDefault();
      this.resetDefaults();
    });
  }

  /** @override */
  getData() {
    let data = super.getData();
    data.components = this.COMPONENTS;

    const currentValues = game.settings.get(CONSTANTS.MODULE_NAME, SETTINGS.COLOR_THEME_VALUES);
    data.values = JSON.parse(currentValues);

    return data;
  }

  /** @override */
  _updateObject(ev, formData) {
    const data = expandObject(formData);
    game.settings.set(CONSTANTS.MODULE_NAME, SETTINGS.COLOR_THEME_VALUES, JSON.stringify(data));
  }

  /**
   * Reset default colors
   */
  resetDefaults() {
    game.settings.set(
      CONSTANTS.MODULE_NAME,
      SETTINGS.COLOR_THEME_VALUES,
      JSON.stringify(this.DEFAULTS)
    );
  }
}
