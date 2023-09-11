import { SETTINGS } from "../settings/settings.js";
import { CONSTANTS } from "../shared/constants.js";
import BaseFeature from "./BaseFeature.js";

/**
 * Applies a chat opacity
 */
export class ChatOpacity extends BaseFeature {
  /** @override */
  settingName = "CHAT_OPACITY";

  /** @override */
  hookName = "ready";

  /** @override */
  fireFeature() {
    document.body.classList.add("addChatOpacity");
    document.documentElement.style.setProperty(
      "--chat-opactity-value",
      game.settings.get(CONSTANTS.MODULE_NAME, SETTINGS.CHAT_OPACITY_VALUE)
    );

    // Handle old chat cards
    document
      .querySelectorAll("#chat-log li.chat-message")
      .forEach((e) => e.classList.add("opacity-transition"));

    // Handle newly created chat cards
    this.handleNewChatCards();
  }

  /**
   * Handle the opacity of a newly created chat cards
   */
  handleNewChatCards() {
    Hooks.on("renderChatMessage", async (message, html) => {
      html[0].classList.add("opacity-delay");

      const timer = game.settings.get(CONSTANTS.MODULE_NAME, SETTINGS.CHAT_OPACITY_TIMER) * 1000;
      await new Promise((r) => setTimeout(r, timer)).then(() => {
        html[0].classList.add("opacity-transition");
        html[0].classList.remove("opacity-delay");
      });
    });
  }
}
