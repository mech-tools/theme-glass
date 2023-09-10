import BaseFeature from "./BaseFeature";

/**
 * Applies blur effects
 */
export class BlurInterface extends BaseFeature {
  /** @override */
  settingName = "ENABLE_BLUR";

  /** @override */
  hookName = "ready";

  /** @override */
  fireFeature() {
    document.body.classList.add("shouldBlur");
  }
}
