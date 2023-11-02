import { CONSTANTS } from "../shared/constants.js";
import { SETTINGS } from "./settings.js";

/**
 * Special setting to hide various interface components
 */
export class HideInterfaceSettings extends FormApplication {
  /**
   * Components i18n
   */
  COMPONENTS = {
    logo: game.i18n.localize(
      `${CONSTANTS.MODULE_NAME}.settings.${SETTINGS.HIDE_INTERFACE_FORM}.logo`
    ),
    navigation: game.i18n.localize(
      `${CONSTANTS.MODULE_NAME}.settings.${SETTINGS.HIDE_INTERFACE_FORM}.navigation`
    ),
    controls: game.i18n.localize("CONTROLS.NavLabel"),
    players: game.i18n.localize("PLAYERS.Title"),
    hotbar: game.i18n.localize("DOCUMENT.Macros"),
    chat: game.i18n.localize("THESIDEBAR.ChatLogTitle"),
    combat: game.i18n.localize("THESIDEBAR.CombatTrackerTitle"),
    scenes: game.i18n.localize("THESIDEBAR.ScenesTitle"),
    actors: game.i18n.localize("THESIDEBAR.ActorDirectoryTitle"),
    items: game.i18n.localize("THESIDEBAR.ItemDirectoryTitle"),
    journal: game.i18n.localize("THESIDEBAR.JournalEntryTitle"),
    tables: game.i18n.localize("THESIDEBAR.RollableTablesTitle"),
    cards: game.i18n.localize("THESIDEBAR.CardStacksTitle"),
    playlists: game.i18n.localize("THESIDEBAR.PlaylistsTitle"),
    compendium: game.i18n.localize("THESIDEBAR.CompendiumPacksTitle"),
    settings: game.i18n.localize("THESIDEBAR.SettingsTitle")
  };

  /**
   * Components default values
   */
  static DEFAULTS = {
    logo: { player: true, gm: true },
    navigation: { player: true, gm: true },
    controls: { player: true, gm: true },
    players: { player: true, gm: true },
    hotbar: { player: true, gm: true },
    chat: { player: true, gm: true },
    combat: { player: true, gm: true },
    scenes: { player: true, gm: true },
    actors: { player: true, gm: true },
    items: { player: true, gm: true },
    journal: { player: true, gm: true },
    tables: { player: true, gm: true },
    cards: { player: true, gm: true },
    playlists: { player: true, gm: true },
    compendium: { player: true, gm: true },
    settings: { player: true, gm: true }
  };

  /**
   * Register the settings
   */
  static register() {
    // Button displayed in the FVTT settings
    game.settings.registerMenu(CONSTANTS.MODULE_NAME, SETTINGS.HIDE_INTERFACE_FORM, {
      label: game.i18n.localize(
        `${CONSTANTS.MODULE_NAME}.settings.${SETTINGS.HIDE_INTERFACE_FORM}.menu`
      ),
      icon: "fas fa-eye",
      type: HideInterfaceSettings,
      restricted: true
    });

    // Hidden setting to store the values
    game.settings.register(CONSTANTS.MODULE_NAME, SETTINGS.HIDE_INTERFACE_VALUES, {
      scope: "world",
      config: false,
      default: JSON.stringify(this.DEFAULTS),
      type: String,
      onChange: () => foundry.utils.debouncedReload()
    });
  }

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      ...super.defaultOptions,
      template: `${CONSTANTS.PATH}templates/hide-interface-settings.hbs`,
      title: game.i18n.localize(
        `${CONSTANTS.MODULE_NAME}.settings.${SETTINGS.HIDE_INTERFACE_FORM}.title`
      ),
      width: 400,
      id: `${CONSTANTS.MODULE_NAME}-${SETTINGS.HIDE_INTERFACE_FORM}`
    });
  }

  /** @override */
  getData() {
    let data = super.getData();
    data.components = this.COMPONENTS;

    const currentValues = game.settings.get(CONSTANTS.MODULE_NAME, SETTINGS.HIDE_INTERFACE_VALUES);
    data.values = JSON.parse(currentValues);

    return data;
  }

  /** @override */
  _updateObject(ev, formData) {
    const data = expandObject(formData);
    game.settings.set(CONSTANTS.MODULE_NAME, SETTINGS.HIDE_INTERFACE_VALUES, JSON.stringify(data));
  }
}
