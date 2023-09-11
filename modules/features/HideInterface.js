import { SETTINGS } from "../settings/settings.js";
import { CONSTANTS } from "../shared/constants.js";
import BaseFeature from "./BaseFeature.js";

/**
 * Create a warning message for blurred content
 */
export class HideInterface extends BaseFeature {
  /** @override */
  byPassSetting = true;

  /** @override */
  hookName = "ready";

  /** @override */
  once = true;

  /** @override */
  fireFeature() {
    // Get the appropriate setting and check it is not null
    const currentValues = JSON.parse(
      game.settings.get(CONSTANTS.MODULE_NAME, SETTINGS.HIDE_INTERFACE_VALUES)
    );
    if (!currentValues) return;

    // Get the current user role
    const currentRole = game.user.isGM ? "gm" : "player";

    // Activate the feature for each component based on the user role
    for (const [component, visiblity] of Object.entries(currentValues)) {
      if (!visiblity[currentRole]) {
        document.body.classList.add(
          `hide${component.charAt(0).toUpperCase() + component.slice(1)}`
        );
      }
    }
  }
}
