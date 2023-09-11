import { SETTINGS } from "../settings/settings.js";
import { CONSTANTS } from "../shared/constants.js";

/**
 * Abstract feature
 */
export default class BaseFeature {
  /**
   * @param {string} hookName hook to fire
   */
  hookName = "";

  /**
   * @param {string} once hook recurrence
   */
  once = false;

  /**
   * @param {null|boolean} byPassSetting if the setting check should be bypass
   */
  byPassSetting = null;

  /**
   * @param {string} settingName the setting to check before firing the feature
   */
  settingName = "";

  /**
   * On hook firing
   */
  onHook() {
    // Hook definition must be provide by the class
    if (!this.hookName) {
      throw new Error("Missing hook definition");
    }

    Hooks.on(this.hookName, this.handle.bind(this), { once: this.once });
  }

  /**
   * Handle the firing of the feature
   * @param {...any} args args passed by the hook
   */
  handle(...args) {
    // Check setting
    this.setting =
      this.byPassSetting ?? game.settings.get(CONSTANTS.MODULE_NAME, SETTINGS[this.settingName]);

    if (!this.setting) return;

    // Fire feature
    this.fireFeature(...args);
  }

  /**
   * Feature will be fired if setting is truthy or bypassed
   * @param {...any} args args passed by the hook
   */
  fireFeature(...args) {}
}
