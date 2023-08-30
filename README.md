![](https://img.shields.io/badge/Foundry-v11-informational)
![Latest Release Download Count](https://img.shields.io/github/downloads/DarKDinDoN/theme-glass/latest/module.zip)

![](./screenshot-1.jpg)

# Theme: Glass

A system agnostic (almost) theme for FoundryVTT.

Theme: Glass is a **very transparent** theme. This theme was, first and foremost, created for the "Theater of the Mind" kind of scenes.  
With a less intrusive interface, highlight the background image of any scene and enhance your players' immersion with your superb illustrations.

Since it's very transparent, this theme is probably not suitable for newcomers. Once you've learned the basics of the vanilla interface, this shouldn't be a problem anymore.

### ⚠️ HELP! FoundryVTT is laggy

Theme: Glass makes extensive use of blurring effects. For this reason, certain scenes that are too complex (walls, lights, etc.) can become laggy. During the development phase, the Firefox browser was found to have a very poor handling of blur effects.  
If this happens, you can disable blur effects while maintaining a transparent interface in the module settings.

![](./screenshot-2.jpg)

## Q&A

### Does it have to be so transparent?

Yes, that's the plan. It allows to emphasize the background image of a scene and increase immersion.  
If, through feedbacks, I realize that the theme is too transparent for the majority of people, I may revise it.

### FoundryVTT is laggy, why is that?

Probably because of the blur effects. Some browsers have a very poor handling of such effects.  
If it becomes an issue, you can disable the blur effects in the settings of the module.

### Is it system agnostic?

It was created with this in mind, but some systems use their own theme. For these systems, the module is not compatible.

### And what about modules?

Depending on the work load, I can make certain modules compatible with this theme.

| Module name                                                                                 | Compatibility | Comment                                |
| ------------------------------------------------------------------------------------------- | ------------- | -------------------------------------- |
| [Dice Tray](https://gitlab.com/asacolips-projects/foundry-mods/foundry-vtt-dice-calculator) | ✅            | OK, but hover colors are still vanilla |
| [GM Screen](https://github.com/ElfFriend-DnD/foundryvtt-gmScreen)                           | ✅            | OK                                     |
| [Simple Calendar](https://github.com/vigoren/foundryvtt-simple-calendar)                    | ✅            | Only opacity                           |
| [SmallTime](https://github.com/unsoluble/smalltime)                                         | ✅            | Only opacity                           |

### Why are some windows not transparent?

Some parts of the FoundryVTT interface are very dependent on the system used (character sheets, items sheet, chat cards, etc.).  
Since Theme: Glass is system agnostic, it is not really an option to skin those. But most of the visible interface should be transparent for player accounts.
