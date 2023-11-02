import {
  BlurInterface,
  BlurWarningMessage,
  ChangeColorTheme,
  ChatOpacity,
  CollapseHotbar,
  HideInterface,
  ReduceScenesHeight,
  RemovePause
} from "./features/index.js";
import { registerSettings } from "./settings/settings.js";
import { logger } from "./shared/helpers.js";

/**
 * Starting point of the module
 */
new (class ThemeGlass {
  /**
   * Init all the proper components on init
   */
  constructor() {
    // Init module
    this.init();

    // Load features
    this.loadFeatures();
  }

  /**
   * Init module and settings
   */
  init() {
    Hooks.once("init", () => {
      logger("Initializing module");

      // Register settings
      registerSettings();
    });
  }

  /**
   * Load and fire all features
   */
  loadFeatures() {
    [
      new BlurInterface(),
      new BlurWarningMessage(),
      new ChangeColorTheme(),
      new ChatOpacity(),
      new CollapseHotbar(),
      new HideInterface(),
      new ReduceScenesHeight(),
      new RemovePause()
    ].forEach((f) => f.onHook());
  }
})();
