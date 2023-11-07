import { SETTINGS } from "../settings/settings.js";
import { CONSTANTS } from "../shared/constants.js";
import BaseFeature from "./BaseFeature.js";

/**
 * Applies a chat opacity
 */
export class WindowContentOpacity extends BaseFeature {
  /** @override */
  settingName = "WINDOW_CONTENT_OPACITY";

  /** @override */
  hookName = "ready";

  /** @override */
  once = true;

  /** @override */
  fireFeature() {
    const windowContentOpacityValue = game.settings.get(
      CONSTANTS.MODULE_NAME,
      SETTINGS.WINDOW_CONTENT_OPACITY
    );

    // Quit if no opacity
    if (windowContentOpacityValue === 1) return;

    document.body.classList.add("addWindowContentOpacity");
    document.documentElement.style.setProperty(
      "--window-content-opactity-value",
      windowContentOpacityValue
    );
  }
}
