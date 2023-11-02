import { SETTINGS } from "../settings/settings.js";
import { CONSTANTS } from "../shared/constants.js";
import BaseFeature from "./BaseFeature.js";

/**
 * Create a warning message for blurred content
 */
export class ChangeColorTheme extends BaseFeature {
  /** @override */
  byPassSetting = true;

  /** @override */
  hookName = "ready";

  /** @override */
  once = true;

  /** @override */
  fireFeature() {
    // Get the appropriate setting
    const currentValues = JSON.parse(
      game.settings.get(CONSTANTS.MODULE_NAME, SETTINGS.COLOR_THEME_VALUES)
    );

    // Activate the feature for each component based on the user role
    for (const [component, color] of Object.entries(currentValues)) {
      const kebabCaseComponent = component.replace(
        /[A-Z]+(?![a-z])|[A-Z]/g,
        ($, ofs) => (ofs ? "-" : "") + $.toLowerCase()
      );

      // Transform hex to rgb
      const rgbColor = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);

      // Set appropriate values
      document.documentElement.style.setProperty(
        `--${kebabCaseComponent}`,
        `
        ${parseInt(rgbColor[1], 16)},
        ${parseInt(rgbColor[2], 16)},
        ${parseInt(rgbColor[3], 16)}
        `
      );
    }
  }
}
