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

    Hooks.once(this.hookName, this.handle.bind(this));
  }

  /**
   * Handle the firing of the feature
   */
  handle() {
    // Check setting
    this.setting =
      this.byPassSetting ?? game.settings.get(CONSTANTS.MODULE_NAME, SETTINGS[this.settingName]);

    if (!this.setting) return;

    // Fire feature
    this.fireFeature();
  }

  /**
   * Feature will be fired if setting is truthy or bypassed
   */
  fireFeature() {}
}
