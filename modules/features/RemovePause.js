import BaseFeature from "./BaseFeature.js";

/**
 * Removes pause
 */
export class RemovePause extends BaseFeature {
  /** @override */
  settingName = "NO_PAUSE";

  /** @override */
  hookName = "ready";

  /** @override */
  once = true;

  /** @override */
  fireFeature() {
    if (game.users.current.isGM && game.paused) {
      game.togglePause(false, true);
    }
  }
}
