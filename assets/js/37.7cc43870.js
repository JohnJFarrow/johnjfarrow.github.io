(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{323:function(a,e,t){"use strict";t.r(e);var s=t(14),n=Object(s.a)({},(function(){var a=this,e=a._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[e("h1",[a._v(a._s(this.$page.title))]),a._v(" "),e("h2",{attrs:{id:"about-gameplay-tags"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#about-gameplay-tags"}},[a._v("#")]),a._v(" About Gameplay Tags")]),a._v(" "),e("p",[a._v('Gameplay tags are strings like "Player.Weapon.Shotgun" represented by a '),e("code",[a._v("FGameplayTag")]),a._v(" type:")]),a._v(" "),e("ul",[e("li",[a._v('they are a hierarchy of any number of parts separated by "."')]),a._v(" "),e("li",[e("code",[a._v("FGameplayTag")]),a._v(" has support for comparison and matching against individual tags and collections of tags")]),a._v(" "),e("li",[a._v("gameplay tags are stored in the collection class "),e("code",[a._v("FGameplayTagContainer")]),a._v(" which has support for searching, matching and filtering tags")]),a._v(" "),e("li",[a._v('higher parts of the hierarchy implicitly exist - meaning if you create a tag such as "Player.Weapon.Shotgun"\nthen the tags "Player.Weapon" and "Player" are also created')]),a._v(" "),e("li",[a._v("all tags exist in one game-specific global dictionary.  This facilitates mapping them to\nnumeric types for fast comparison.")])]),a._v(" "),e("p",[a._v("Gameplay tags can be created by:")]),a._v(" "),e("ul",[e("li",[a._v('creating and editing .ini files in the "GameplayTags" folder.')]),a._v(" "),e("li",[a._v("manually adding or removing them in the Project Settings menu (which will add them to the chosen .ini file)")]),a._v(" "),e("li",[a._v("building Data Table Assets")]),a._v(" "),e("li",[a._v("adding them from c++ by calling "),e("code",[a._v("UGameplayTagsManager::Get().AddNativeGameplayTag()")]),a._v('.  The code comments for this say\n"This can only be called during engine initialization, the table needs to be locked down before replication"')])]),a._v(" "),e("p",[a._v("One important thing to note is that gameplay tags exist as a global pool accessible everywhere in the project.")]),a._v(" "),e("h4",{attrs:{id:"viewing-tags-in-project-settings"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#viewing-tags-in-project-settings"}},[a._v("#")]),a._v(" Viewing Tags in Project Settings:")]),a._v(" "),e("p",[a._v("The project settings window shows all the tags in the project, including tags read from .ini files,\ntags read from data tables (likes the DT_AnimEffectTags shown), and tags created in c++:")]),a._v(" "),e("p",[e("img",{attrs:{src:"/images/lyra_012.png",alt:""}})]),a._v(" "),e("p",[a._v("If you mouse over a tag in the project settings you can\nsee its source:")]),a._v(" "),e("p",[e("img",{attrs:{src:"/images/lyra_02_005.png",alt:""}})]),a._v(" "),e("p",[a._v("By clicking the drop-down arrow next to a gameplay tag you can see where it is used:")]),a._v(" "),e("p",[e("img",{attrs:{src:"/images/lyra_015.png",alt:""}})]),a._v(" "),e("p",[a._v('Ticking the "Show Native Packages" checkbox will show if there are references from c++ code, but not the actual code.')]),a._v(" "),e("h4",{attrs:{id:"tags-from-c"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#tags-from-c"}},[a._v("#")]),a._v(" Tags from c++")]),a._v(" "),e("p",[a._v("Lyra adds about 30 gameplay tags in the "),e("code",[a._v("FLyraGameplayTags::AddAllTags()")]),a._v(" method like so:")]),a._v(" "),e("div",{staticClass:"language-cpp line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-cpp"}},[e("code",[e("span",{pre:!0,attrs:{class:"token function"}},[a._v("AddTag")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("Ability_ActivateFail_IsDead"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" \n    "),e("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Ability.ActivateFail.IsDead"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Ability failed to activate because its owner is dead."')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("AddTag")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("Ability_ActivateFail_Cooldown"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" \n\t"),e("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Ability.ActivateFail.Cooldown"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Ability failed to activate because it is on cool down."')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[a._v("AddTag")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("Ability_ActivateFail_Cost"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" \n\t"),e("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Ability.ActivateFail.Cost"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Ability failed to activate because it did not pass the cost checks."')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])]),a._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[a._v("1")]),e("br"),e("span",{staticClass:"line-number"},[a._v("2")]),e("br"),e("span",{staticClass:"line-number"},[a._v("3")]),e("br"),e("span",{staticClass:"line-number"},[a._v("4")]),e("br"),e("span",{staticClass:"line-number"},[a._v("5")]),e("br"),e("span",{staticClass:"line-number"},[a._v("6")]),e("br")])]),e("h4",{attrs:{id:"tags-from-ini-files"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#tags-from-ini-files"}},[a._v("#")]),a._v(" Tags from .ini files")]),a._v(" "),e("p",[a._v("The .ini files listed here create gameplay tags like this:")]),a._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v('[/Script/GameplayTags.GameplayTagsList]\nGameplayTagList=(Tag="Ability.ActivateFail.MagazineFull",DevComment="")\nGameplayTagList=(Tag="Ability.ActivateFail.NoSpareAmmo",DevComment="")\nGameplayTagList=(Tag="Event.Movement.ADS",DevComment="")\nGameplayTagList=(Tag="Event.Movement.Dash",DevComment="")\n...\n')])]),a._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[a._v("1")]),e("br"),e("span",{staticClass:"line-number"},[a._v("2")]),e("br"),e("span",{staticClass:"line-number"},[a._v("3")]),e("br"),e("span",{staticClass:"line-number"},[a._v("4")]),e("br"),e("span",{staticClass:"line-number"},[a._v("5")]),e("br"),e("span",{staticClass:"line-number"},[a._v("6")]),e("br")])]),e("p",[a._v("These .ini files are used by Lyra.")]),a._v(" "),e("ul",[e("li",[a._v("Plugins\\Gamesubtitles\\Config\\Tags\\PluginTags.ini -- 2 gameplay tags")]),a._v(" "),e("li",[a._v("Plugins\\GameFeatures\\TopDownArena\\Config\\Tags\\TopDownArenaTags.ini -- 8 gameplay tags")]),a._v(" "),e("li",[a._v("Plugins\\GameFeatures\\ShooterCore\\Config\\Tags\\ShooterCoreTags.ini -- 60 gameplay tags")])]),a._v(" "),e("h4",{attrs:{id:"tags-from-data-tables"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#tags-from-data-tables"}},[a._v("#")]),a._v(" Tags from Data Tables")]),a._v(" "),e("p",[a._v('In the project settings the property "Gameplay Tag Table List" is a list of data tables\nsuch as /Game/ContextEffects/DT_AnimEffectTags and /Game/ContextEffects/DT_SurfaceTypes.  These\nare data tables with the GameplayTagTableRow type and have this structure:')]),a._v(" "),e("p",[e("img",{attrs:{src:"/images/lyra_02_006.png",alt:""}})]),a._v(" "),e("p",[a._v('Gameplay tag data tables can be maintained or generated by tools outside of Unreal.  For example\na file "fishing.csv" which has these contents:')]),a._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("RowName,Tag\nStartToFish,AnimEffect.Fish.Start\nFinishFishing,AnimEffect.Fish.End\n")])]),a._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[a._v("1")]),e("br"),e("span",{staticClass:"line-number"},[a._v("2")]),e("br"),e("span",{staticClass:"line-number"},[a._v("3")]),e("br")])]),e("p",[a._v("can be imported into Unreal to create gameplay tags by clicking the Import button in the content browser.  When the file changes\nthe Reimport button in the data table editor can be used to update Unreal with the changes.")]),a._v(" "),e("h2",{attrs:{id:"reference"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#reference"}},[a._v("#")]),a._v(" Reference")]),a._v(" "),e("p",[e("a",{attrs:{href:"https://docs.unrealengine.com/5.0/en-US/gameplay-tags-in-unreal-engine/",target:"_blank",rel:"noopener noreferrer"}},[a._v("Epic: Gameplay Tags"),e("OutboundLink")],1),e("br"),a._v(" "),e("a",{attrs:{href:"https://docs.unrealengine.com/5.0/en-US/using-gameplay-abilities-in-unreal-engine/",target:"_blank",rel:"noopener noreferrer"}},[a._v("Epic: Using Gas"),e("OutboundLink")],1),e("br"),a._v(" "),e("a",{attrs:{href:"https://docs.unrealengine.com/5.0/en-US/gameplay-attributes-and-gameplay-effects-for-the-gameplay-ability-system-in-unreal-engine/",target:"_blank",rel:"noopener noreferrer"}},[a._v("Epic: GAS Attributes and Effects"),e("OutboundLink")],1),e("br"),a._v(" "),e("a",{attrs:{href:"https://docs.unrealengine.com/5.0/en-US/BlueprintAPI/Ability/Async/WaitGameplayEventtoActor/",target:"_blank",rel:"noopener noreferrer"}},[a._v("Epic: GAS"),e("OutboundLink")],1),e("br"),a._v(" "),e("a",{attrs:{href:"https://dev.epicgames.com/community/learning/tutorials/aqrD/unreal-engine-enhanced-input-binding-with-gameplay-tags-c",target:"_blank",rel:"noopener noreferrer"}},[a._v("Epic: Games Input"),e("OutboundLink")],1)])])}),[],!1,null,null,null);e.default=n.exports}}]);