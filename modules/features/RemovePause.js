import BaseFeature from "./BaseFeature";

/**
 * Removes pause
 */
export class RemovePause extends BaseFeature {
  /** @override */
  settingName = "NO_PAUSE";

  /** @override */
  hookName = "ready";

  /** @override */
  fireFeature() {
    if (game.users.current.isGM && game.paused) {
      game.togglePause(false, true);
    }
  }
}
