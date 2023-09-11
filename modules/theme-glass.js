import {
  BlurInterface,
  BlurWarningMessage,
  ChatOpacity,
  CollapseHotbar,
  HideLogo,
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
      new BlurWarningMessage(),
      new BlurInterface(),
      new ChatOpacity(),
      new CollapseHotbar(),
      new RemovePause(),
      new HideLogo(),
      new ReduceScenesHeight()
    ].forEach((f) => f.onHook());
  }
})();
