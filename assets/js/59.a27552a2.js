(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{343:function(e,a,t){"use strict";t.r(a);var n=t(14),i=Object(n.a)({},(function(){var e=this,a=e._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",[e._v(e._s(this.$page.title))]),e._v(" "),a("h2",{attrs:{id:"introduction"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#introduction"}},[e._v("#")]),e._v(" Introduction")]),e._v(" "),a("p",[e._v("The aim of this is to examine the source code from the Lyra example provided by Epic Games\nand to try and identify and document practices and approaches for using c++.")]),e._v(" "),a("p",[e._v("Here we look at use of Gameplay Tags and the Gameplay Ability System (GAS), and\ntry and trace the use of gameplay tags from pressing a button\nto getting a response in the UI and in gameplay.")]),e._v(" "),a("h3",{attrs:{id:"overview-of-how-lyra-uses-the-gameplay-ability-system"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#overview-of-how-lyra-uses-the-gameplay-ability-system"}},[e._v("#")]),e._v(" Overview of How Lyra uses the Gameplay Ability System")]),e._v(" "),a("p",[e._v("Lyra's design supports multiple game\nmodes (such as the Arena and ShooterGame) and different phases within each game mode (such as\nwarmup, play, post-game).  This adds some complexity to Lyra's use of the Gameplay Ability System.")]),e._v(" "),a("p",[e._v("This intent here is that gameplay abilities, gameplay effects, and gameplay attributes are grouped into sets, and that these\nsets can be associated with different game modes, different phases of the game, and\ndifferent items of equipment.  A player might gain a specific ability (i.e. have a gameplay ability become\navailable to his Actor object) by stepping into a room\nor picking up weapon, and lose that ability once he leaves the room or\nputs down the weapon.")]),e._v(" "),a("p",[e._v("This approach adds complexity because the gameplay abilities cannot just be added to the classes of player and non-player\ncharacters; they must be created and maintained separately so that they can be dynamically added and removed as game modes,\nlocations and equipped items changes, and dynamically applied to pawns as they spawn and are deleted.")]),e._v(" "),a("p",[e._v("In Lyra gameplay abilities have a lifespan which is longer than the player pawn object.\nThe gameplay abilities are owned (via the LyraAbilitySystemComponent)\nby the LyraPlayerState object.  This has a longer lifespan than the pawn object and is used to\nhold gameplay abilities and apply them to the player pawn object whenever the player pawn object respawns.")]),e._v(" "),a("p",[e._v("When the play pawn does not exist (e.g. the play might just have died, or the game might not have started)\nthe gameplay abilities are owned by the player state like so:")]),e._v(" "),a("p",[a("img",{attrs:{src:"/images/lyra_02_020.png",alt:""}})]),e._v(" "),a("p",[e._v("Once the player pawn is created, the player state and the player pawn share a reference\nto the same LyraAbilitySystemComponent like so:")]),e._v(" "),a("p",[a("img",{attrs:{src:"/images/lyra_02_021.png",alt:""}})]),e._v(" "),a("p",[e._v("In the Lyra source code there is support for the player pawn object owning\nits own abilities (see the "),a("code",[e._v("ALyraCharacterWithAbilities")]),e._v(" class) but this is not used.")]),e._v(" "),a("p",[e._v("This grouping of abilities, effects and attributes requires additional code outside the normal\nGAS, but does have benefits:")]),e._v(" "),a("ul",[a("li",[e._v("it makes it easier to add new game modes with new abilities using a plugins architecture")]),e._v(" "),a("li",[e._v("separate game modes can be worked on by different developers at the same time")]),e._v(" "),a("li",[e._v("only the subset of abilities, effects, and attributes relevant to the current game mode or\nphase or location need to be in memory; so the game uses less memory and loads faster")]),e._v(" "),a("li",[e._v("game abilities do not reference and are not referenced by input actions so they are not loaded\ninto memory when not required")])]),e._v(" "),a("h3",{attrs:{id:"reference"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#reference"}},[e._v("#")]),e._v(" Reference")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://docs.unrealengine.com/5.0/en-US/gameplay-tags-in-unreal-engine/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Epic: Gameplay Tags"),a("OutboundLink")],1),a("br"),e._v(" "),a("a",{attrs:{href:"https://docs.unrealengine.com/5.0/en-US/using-gameplay-abilities-in-unreal-engine/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Epic: Using Gas"),a("OutboundLink")],1),a("br"),e._v(" "),a("a",{attrs:{href:"https://docs.unrealengine.com/5.0/en-US/gameplay-attributes-and-gameplay-effects-for-the-gameplay-ability-system-in-unreal-engine/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Epic: GAS Attributes and Effects"),a("OutboundLink")],1),a("br"),e._v(" "),a("a",{attrs:{href:"https://docs.unrealengine.com/5.0/en-US/BlueprintAPI/Ability/Async/WaitGameplayEventtoActor/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Epic: GAS"),a("OutboundLink")],1),a("br"),e._v(" "),a("a",{attrs:{href:"https://dev.epicgames.com/community/learning/tutorials/aqrD/unreal-engine-enhanced-input-binding-with-gameplay-tags-c",target:"_blank",rel:"noopener noreferrer"}},[e._v("Epic: Games Input"),a("OutboundLink")],1)])])}),[],!1,null,null,null);a.default=i.exports}}]);