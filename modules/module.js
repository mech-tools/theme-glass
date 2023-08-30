import { registerSettings, SETTINGS } from "./settings.js";
import { CONSTANTS } from "./shared/constants.js";
import { logger } from "./shared/helpers.js";

/** Starting point of the module */
class ThemeGlass {
  /** Init all the proper components on init */
  static init() {
    logger("Initializing module");

    // Register settings
    registerSettings();
  }

  /* Sends a message the first time a user logged-in to warn about the blur effects */
  static blurWarningMessage() {
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

  /* Applies blur effects */
  static blurInterface() {
    const shouldBlur = game.settings.get(CONSTANTS.MODULE_NAME, SETTINGS.ENABLE_BLUR);
    if (shouldBlur) {
      document.body.classList.add("shouldBlur");
    }
  }

  /* Applies a chat opacity */
  static async chatOpacity() {
    const chatOpacity = game.settings.get(CONSTANTS.MODULE_NAME, SETTINGS.CHAT_OPACITY);
    if (chatOpacity) {
      document.body.classList.add("addChatOpacity");

      // Add opacity to all existing chat cards
      document
        .querySelectorAll("#chat-log li.chat-message")
        .forEach((e) => e.classList.add("opacity-transition"));

      // Animation for all new chat cards
      Hooks.on("renderChatMessage", async (message, html) => {
        html[0].classList.add("opacity-delay");

        await new Promise((r) => setTimeout(r, 10000)).then(() => {
          html[0].classList.add("opacity-transition");
          html[0].classList.remove("opacity-delay");
        });
      });
    }
  }

  /* Collapses macro hotbar */
  static collapseHotbar() {
    const collapseHotbar = game.settings.get(CONSTANTS.MODULE_NAME, SETTINGS.COLLAPSE_HOTBAR);
    if (collapseHotbar) {
      ui.hotbar.collapse();
    }
  }

  /* Removes pause */
  static removePause() {
    const removePause = game.settings.get(CONSTANTS.MODULE_NAME, SETTINGS.NO_PAUSE);
    if (removePause && game.users.current.isGM && game.paused) {
      game.togglePause(false, true);
    }
  }

  /* Hides the fvtt logo */
  static hideLogo() {
    const hideLogo = game.settings.get(CONSTANTS.MODULE_NAME, SETTINGS.HIDE_LOGO);
    if (hideLogo) {
      document.body.classList.add("hideLogo");
    }
  }

  /* Reduces scenes height */
  static reduceScenes() {
    const reduceScenes = game.settings.get(CONSTANTS.MODULE_NAME, SETTINGS.REDUCE_SCENE_LIST);
    if (reduceScenes) {
      document.body.classList.add("changeScenesHeight");
    }
  }
}

/* Wait for the init hook */
Hooks.once("init", ThemeGlass.init);

/* Fire the features */
Hooks.once("ready", ThemeGlass.blurWarningMessage);
Hooks.once("ready", ThemeGlass.chatOpacity);
Hooks.once("ready", ThemeGlass.blurInterface);
Hooks.once("renderHotbar", ThemeGlass.collapseHotbar);
Hooks.once("ready", ThemeGlass.removePause);
Hooks.once("ready", ThemeGlass.hideLogo);
Hooks.once("ready", ThemeGlass.reduceScenes);
