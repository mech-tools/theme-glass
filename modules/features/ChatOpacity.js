import { SETTINGS } from "../settings/settings.js";
import { CONSTANTS } from "../shared/constants.js";
import BaseFeature from "./BaseFeature.js";

/**
 * Applies a chat opacity
 */
export class ChatOpacity extends BaseFeature {
  /** @override */
  byPassSetting = true;

  /** @override */
  settingName = "CHAT_OPACITY_VALUE";

  /** @override */
  hookName = "ready";

  /** @override */
  once = true;

  /** @override */
  fireFeature() {
    const chatOpacityValue = game.settings.get(CONSTANTS.MODULE_NAME, SETTINGS.CHAT_OPACITY_VALUE);

    // Quit if no opacity
    if (chatOpacityValue === 1) return;

    // Set up DOM with basic values
    document.body.classList.add("addChatOpacity");
    document.documentElement.style.setProperty("--chat-opactity-value", chatOpacityValue);

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
    const timer = game.settings.get(CONSTANTS.MODULE_NAME, SETTINGS.CHAT_OPACITY_TIMER) * 1000;

    Hooks.on("renderChatMessage", async (message, html) => {
      const rawHtml = html[0];

      rawHtml.classList.add("opacity-delay");

      await new Promise((r) => setTimeout(r, timer)).then(() => {
        rawHtml.classList.add("opacity-transition");
        rawHtml.classList.remove("opacity-delay");
      });
    });
  }
}
