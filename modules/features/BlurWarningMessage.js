import { CONSTANTS } from "../shared/constants.js";
import BaseFeature from "./BaseFeature.js";

/**
 * Create a warning message for blurred content
 */
export class BlurWarningMessage extends BaseFeature {
  /** @override */
  byPassSetting = true;

  /** @override */
  hookName = "ready";

  /** @override */
  fireFeature() {
    // Listener
    document.body.addEventListener("click", async (event) => {
      if (
        event.target.classList.contains("glass-theme-blur-message") ||
        event.target.parentNode.classList.contains("glass-theme-blur-message")
      ) {
        new SettingsConfig().render(true);
        await new Promise((r) => setTimeout(r, 100)).then(() =>
          ui.activeWindow.activateTab(CONSTANTS.MODULE_NAME)
        );
      }
    });

    // Chat message
    if (!game.user.getFlag(CONSTANTS.MODULE_NAME, "blurWarningMessageShown")) {
      const content = [
        `
          <div>
            <h3>Theme: Glass</h3>
            <p>${game.i18n.localize(`${CONSTANTS.MODULE_NAME}.blurWarningMessage`)}</p>
            <p>
              <button type="button" class="glass-theme-blur-message" data-key="theme-glass.enable-blur">
                <i class="fas fa-cogs"></i> ${game.i18n.localize("SETTINGS.Configure")}
              </button>
            </p>
          </div>
        `
      ];

      const chatData = content.map((c) => {
        return {
          whisper: [game.user.id],
          speaker: { alias: "Theme: Glass" },
          flags: { core: { canPopout: true } },
          content: c
        };
      });

      ChatMessage.implementation.createDocuments(chatData);

      game.user.setFlag(CONSTANTS.MODULE_NAME, "blurWarningMessageShown", true);
    }
  }
}
