import { CONSTANTS } from "./shared/constants.js";

/** Debounce calls before reloading page */
const debouncedReload = foundry.utils.debounce(() => window.location.reload(), 500);

/** Settings global names */
export const SETTINGS = {
  ENABLE_BLUR: "enable-blur",
  COLLAPSE_HOTBAR: "collapse-hotbar",
  NO_PAUSE: "no-pause",
  HIDE_LOGO: "hide-logo",
  REDUCE_SCENE_LIST: "reduce-scene-list"
};

/** Register settings */
export function registerSettings() {
  // Blur Setting (Enabled by default, except for Firefox)
  game.settings.register(CONSTANTS.MODULE_NAME, SETTINGS.ENABLE_BLUR, {
    name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.settings.${SETTINGS.ENABLE_BLUR}-name`),
    hint: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.settings.${SETTINGS.ENABLE_BLUR}-hint`),
    scope: "client",
    config: true,
    default: true,
    type: Boolean,
    onChange: () => debouncedReload()
  });

  // Collapse hotbar Setting
  game.settings.register(CONSTANTS.MODULE_NAME, SETTINGS.COLLAPSE_HOTBAR, {
    name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.settings.${SETTINGS.COLLAPSE_HOTBAR}-name`),
    hint: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.settings.${SETTINGS.COLLAPSE_HOTBAR}-hint`),
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
    onChange: () => debouncedReload()
  });

  // No pause Setting
  game.settings.register(CONSTANTS.MODULE_NAME, SETTINGS.NO_PAUSE, {
    name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.settings.${SETTINGS.NO_PAUSE}-name`),
    hint: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.settings.${SETTINGS.NO_PAUSE}-hint`),
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
    onChange: () => debouncedReload()
  });

  // Hide logo Setting
  game.settings.register(CONSTANTS.MODULE_NAME, SETTINGS.HIDE_LOGO, {
    name: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.settings.${SETTINGS.HIDE_LOGO}-name`),
    hint: game.i18n.localize(`${CONSTANTS.MODULE_NAME}.settings.${SETTINGS.HIDE_LOGO}-hint`),
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
    onChange: () => debouncedReload()
  });

  // Reduce scene list setting
  game.settings.register(CONSTANTS.MODULE_NAME, SETTINGS.REDUCE_SCENE_LIST, {
    name: game.i18n.localize(
      `${CONSTANTS.MODULE_NAME}.settings.${SETTINGS.REDUCE_SCENE_LIST}-name`
    ),
    hint: game.i18n.localize(
      `${CONSTANTS.MODULE_NAME}.settings.${SETTINGS.REDUCE_SCENE_LIST}-hint`
    ),
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
    onChange: () => debouncedReload()
  });
}
