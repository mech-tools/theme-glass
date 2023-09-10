import BaseFeature from "./BaseFeature";

/**
 * Reduces scenes height
 */
export class ReduceScenesHeight extends BaseFeature {
  /** @override */
  settingName = "REDUCE_SCENE_LIST";

  /** @override */
  hookName = "ready";

  /** @override */
  fireFeature() {
    document.body.classList.add("changeScenesHeight");
  }
}
