import { registerSettings, SETTINGS } from "./settings.js";
import { CONSTANTS } from "./shared/constants.js";
import { logger } from "./shared/helpers.js";

/** Starting point of the module */
class ThemeGlass {
  /** Init all the proper components on init */
  static init() {
    logger("Initializing module");

    // Register settings
    registerSettings();
  }

  static blurInterface() {
    const shouldBlur = game.settings.get(CONSTANTS.MODULE_NAME, SETTINGS.ENABLE_BLUR);
    if (shouldBlur) {
      document.body.classList.add("shouldBlur");
    }
  }

  static collapseHotbar() {
    const collapseHotbar = game.settings.get(CONSTANTS.MODULE_NAME, SETTINGS.COLLAPSE_HOTBAR);
    if (collapseHotbar) {
      ui.hotbar.collapse();
    }
  }

  static removePause() {
    const removePause = game.settings.get(CONSTANTS.MODULE_NAME, SETTINGS.NO_PAUSE);
    if (removePause && game.users.current.isGM && game.paused) {
      game.togglePause(false, true);
    }
  }
}

// Wait for the init hook
Hooks.once("init", ThemeGlass.init);

// Fire the features
Hooks.once("ready", ThemeGlass.blurInterface);
Hooks.once("renderHotbar", ThemeGlass.collapseHotbar);
Hooks.once("ready", ThemeGlass.removePause);
