import BaseFeature from "./BaseFeature";

/**
 * Collapses macro hotbar
 */
export class CollapseHotbar extends BaseFeature {
  /** @override */
  settingName = "COLLAPSE_HOTBAR";

  /** @override */
  hookName = "renderHotbar";

  /** @override */
  fireFeature() {
    ui.hotbar.collapse();
  }
}
