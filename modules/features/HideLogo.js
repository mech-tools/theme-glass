import BaseFeature from "./BaseFeature.js";

/**
 * Hides the fvtt logo
 */
export class HideLogo extends BaseFeature {
  /** @override */
  settingName = "HIDE_LOGO";

  /** @override */
  hookName = "ready";

  /** @override */
  fireFeature() {
    document.body.classList.add("hideLogo");
  }
}
