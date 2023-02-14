(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{296:function(t,e,n){"use strict";n.r(e);var a=n(14),i=Object(a.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",[t._v(t._s(this.$page.title))]),t._v(" "),n("p",[t._v("Updated for Unreal Engine 5.1.1")]),t._v(" "),n("p",[t._v("This is a brief guide to downloading and building UE5 using git command line tools\nand Visual Studio 2022.  Updated for Unreal Engine 5.1.1 and Visual Studio 2022 17.4.4\n")]),t._v(" "),n("h2",{attrs:{id:"github-account"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#github-account"}},[t._v("#")]),t._v(" Github Account")]),t._v(" "),n("p",[t._v("If you don't have a github account, go to "),n("a",{attrs:{href:"https://github.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("github.com"),n("OutboundLink")],1),t._v(" and create one.")]),t._v(" "),n("h2",{attrs:{id:"epic-games-account"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#epic-games-account"}},[t._v("#")]),t._v(" Epic Games Account")]),t._v(" "),n("p",[t._v("If you don't have an Epic Games account, go to "),n("a",{attrs:{href:"https://www.epicgames.com/id/register",target:"_blank",rel:"noopener noreferrer"}},[t._v("epicgames.com/register"),n("OutboundLink")],1),t._v(" and create one.")]),t._v(" "),n("h2",{attrs:{id:"connecting-the-epic-games-account-to-the-github-account"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#connecting-the-epic-games-account-to-the-github-account"}},[t._v("#")]),t._v(" Connecting the Epic Games account to the Github account")]),t._v(" "),n("p",[t._v("You need to connect your Epic Games account to your github account so you can get access to Epic's\ngithub repositories.")]),t._v(" "),n("p",[t._v("To do this:")]),t._v(" "),n("ul",[n("li",[t._v("sign into your Epic Games account at "),n("a",{attrs:{href:"https://epicgames.com",target:"_blank",rel:"noopener noreferrer"}},[t._v("epicgames.com"),n("OutboundLink")],1)]),t._v(" "),n("li",[t._v('click on your username near the top right corner of the page and select "Account" from the dropdown menu')]),t._v(" "),n("li",[t._v('click on "Connections" in the list of options on the left side of the page')]),t._v(" "),n("li",[t._v('select "Accounts" from the tab bar with the "Apps" and "Accounts" options')]),t._v(" "),n("li",[t._v('under the github icon click the "Connect" button.  This will guide you through a series of steps to connect\nyour Epic Games and github accounts')])]),t._v(" "),n("h2",{attrs:{id:"installing-git"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#installing-git"}},[t._v("#")]),t._v(" Installing git")]),t._v(" "),n("p",[t._v("If you do not already have the git commandline tools installed, install them from "),n("a",{attrs:{href:"https://git-scm.com/downloads",target:"_blank",rel:"noopener noreferrer"}},[t._v("git-scm.com/downloads"),n("OutboundLink")],1),t._v(".")]),t._v(" "),n("h2",{attrs:{id:"installing-visual-studio-2022"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#installing-visual-studio-2022"}},[t._v("#")]),t._v(" Installing Visual Studio 2022")]),t._v(" "),n("p",[t._v("If you do not already have Visual Studio 2022 installed, install it from "),n("a",{attrs:{href:"https://visualstudio.microsoft.com/vs/",target:"_blank",rel:"noopener noreferrer"}},[t._v("visualstudio.microsoft.com"),n("OutboundLink")],1),t._v(".")]),t._v(" "),n("p",[t._v("Install at least these options:")]),t._v(" "),n("p",[n("img",{attrs:{src:"/images/vsinstall_1.png",alt:""}})]),t._v(" "),n("p",[t._v("and")]),t._v(" "),n("p",[n("img",{attrs:{src:"/images/vsinstall_010.png",alt:""}})]),t._v(" "),n("p",[t._v("and")]),t._v(" "),n("p",[n("img",{attrs:{src:"/images/vsinstall_2.png",alt:""}})]),t._v(" "),n("p",[t._v('For the "Game Development with C++" workload, these are the options I use:')]),t._v(" "),n("p",[n("img",{attrs:{src:"/images/vsinstall_011.png",alt:""}})]),t._v(" "),n("h2",{attrs:{id:"configuring-visual-studio-2022"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#configuring-visual-studio-2022"}},[t._v("#")]),t._v(" Configuring Visual Studio 2022")]),t._v(" "),n("p",[t._v("Some useful options you might like to set are:")]),t._v(" "),n("h3",{attrs:{id:"disabling-the-error-list"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#disabling-the-error-list"}},[t._v("#")]),t._v(" Disabling the Error List")]),t._v(" "),n("p",[t._v("The error list is a sort of summary generated from the build output.  It contains "),n("em",[t._v("less")]),t._v(" information\nthan appears in the output window, and more information is always better, so just use the\noutput window.")]),t._v(" "),n("p",[t._v("In "),n("code",[t._v("Tools | Options | Projects and Solutions | General")]),t._v(" you can turn off the first option shown\nhere:")]),t._v(" "),n("p",[n("img",{attrs:{src:"/images/vsinstall_008.png",alt:""}})]),t._v(" "),n("p",[t._v('If you do use the error list make sure you are only seeing errors from the build, not from other\nsources like intellisense by checking the dropdown shown below is set up "Build Only":')]),t._v(" "),n("p",[n("img",{attrs:{src:"/images/vsinstall_009.png",alt:""}})]),t._v(" "),n("h3",{attrs:{id:"disabling-hot-reload"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#disabling-hot-reload"}},[t._v("#")]),t._v(" Disabling Hot Reload")]),t._v(" "),n("p",[t._v("In Tools|Options|Debugging|.NET/C++ Hot Reload disable all the Hot Reload options:")]),t._v(" "),n("p",[n("img",{attrs:{src:"/images/vsinstall_3.png",alt:""}})]),t._v(" "),n("h3",{attrs:{id:"set-solution-configurations-dropdown-width"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#set-solution-configurations-dropdown-width"}},[t._v("#")]),t._v(" Set Solution Configurations dropdown width")]),t._v(" "),n("p",[t._v("Change the width of the Solution Configurations dropdown to handle the longer names used by\nUE:")]),t._v(" "),n("ul",[n("li",[t._v('right-click on the toolbar shown below, select "Customize"\n'),n("img",{attrs:{src:"/images/vsinstall_4.png",alt:""}})]),t._v(" "),n("li",[t._v('change to the "Commands" tab')]),t._v(" "),n("li",[t._v('select "Toolbar" in the top radio button group')]),t._v(" "),n("li",[t._v('change the toolbar value from "Build" to "Standard" like so:')])]),t._v(" "),n("p",[n("img",{attrs:{src:"/images/vsinstall_5.png",alt:""}})]),t._v(" "),n("ul",[n("li",[t._v('in the preview panel select "System Configurations"')]),t._v(" "),n("li",[t._v('click the "Modify Selection" button')]),t._v(" "),n("li",[t._v("change the width to 130")]),t._v(" "),n("li",[t._v('press "OK" and "Close".')])]),t._v(" "),n("p",[t._v("The toolbar will now have changed to:")]),t._v(" "),n("p",[n("img",{attrs:{src:"/images/vsinstall_6.png",alt:""}})]),t._v(" "),n("h3",{attrs:{id:"turn-on-indexing"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#turn-on-indexing"}},[t._v("#")]),t._v(" Turn on Indexing")]),t._v(" "),n("p",[t._v("To make sure indexed searching is enabled, go to Tools > Options > Environment > Preview Features and verify that “Enable indexing for faster find experience” is checked.")]),t._v(" "),n("p",[t._v("See "),n("a",{attrs:{href:"https://devblogs.microsoft.com/visualstudio/code-search-in-visual-studio-is-about-to-get-much-faster/",target:"_blank",rel:"noopener noreferrer"}},[t._v("devblogs.microsoft.com"),n("OutboundLink")],1),t._v(".")]),t._v(" "),n("h2",{attrs:{id:"downloading-building"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#downloading-building"}},[t._v("#")]),t._v(" Downloading & Building")]),t._v(" "),n("h3",{attrs:{id:"downloading-the-source"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#downloading-the-source"}},[t._v("#")]),t._v(" Downloading the source")]),t._v(" "),n("p",[t._v("Make a new directory such as c:\\work, and change into it.")]),t._v(" "),n("p",[t._v("Clone the Unreal Engine source repository:")]),t._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("git clone https://github.com/EpicGames/UnrealEngine.git UnrealSource\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br")])]),n("p",[t._v("where "),n("code",[t._v("UnrealSource")]),t._v(" is the name of a new directory to which the source will be downloaded.")]),t._v(" "),n("p",[t._v("This takes a while, and uses 25 GB of space")]),t._v(" "),n("h3",{attrs:{id:"installing-the-unrealvs-plugin-for-visual-studio"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#installing-the-unrealvs-plugin-for-visual-studio"}},[t._v("#")]),t._v(" Installing the UnrealVS plugin for Visual Studio")]),t._v(" "),n("p",[t._v("UnrealVS is a Visual Studio plugin from Epic.  It is included in the UE source code.\nExit Visual Studio if needed and install the file\n[UnrealEngineSource]\\Engine\\Extras\\UnrealVS\\VS2022\\UnrealVS.vsix by double clicking it.")]),t._v(" "),n("h3",{attrs:{id:"choosing-a-branch"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#choosing-a-branch"}},[t._v("#")]),t._v(" Choosing a branch")]),t._v(" "),n("p",[t._v("This page "),n("a",{attrs:{href:"https://github.com/EpicGames/UnrealEngine/branches",target:"_blank",rel:"noopener noreferrer"}},[t._v("github.com/EpicGames/UnrealEngine/branches"),n("OutboundLink")],1),t._v(" lists significant branches including:")]),t._v(" "),n("ul",[n("li",[t._v("release - the latest released version of UE")]),t._v(" "),n("li",[t._v("ue5-main - most up to date - this is being continuously updated and won't necessarily build or run on any given day.")])]),t._v(" "),n("p",[t._v("Decide on a branch and change into the new source directory created by the git clone command.")]),t._v(" "),n("p",[t._v("Run "),n("code",[t._v("git checkout [branch-name]")]),t._v(" for whichever branch you chose to build.")]),t._v(" "),n("h3",{attrs:{id:"building"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#building"}},[t._v("#")]),t._v(" Building")]),t._v(" "),n("p",[t._v("This is a summary of information from [https://github.com/EpicGames/UnrealEngine/tree/master].")]),t._v(" "),n("p",[t._v("Change to the directory in which you downloaded the UE source code and\nrun this command to download and install prerequisites required to build UE - it might take a while:")]),t._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("Setup.bat\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br")])]),n("p",[t._v("then run")]),t._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("GenerateProjectFiles.bat -2022\n")])]),t._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[t._v("1")]),n("br")])]),n("h3",{attrs:{id:"opening-the-solution"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#opening-the-solution"}},[t._v("#")]),t._v(" Opening the Solution")]),t._v(" "),n("p",[t._v("The above commands will create the file UE5.sln in the current directory, open it\nin Visual Studio and:")]),t._v(" "),n("ul",[n("li",[t._v('change the Solution Configuration dropdown to "Development Editor"')]),t._v(" "),n("li",[t._v('change the Solution Platform to "Win64"')]),t._v(" "),n("li",[t._v('right click the UE5 project in the solution explorer and choose "Build".')])]),t._v(" "),n("p",[n("img",{attrs:{src:"/images/vsinstall_7.png",alt:""}})]),t._v(" "),n("p",[t._v("This will take some time to complete.  On a Ryzen 5950x 16 core machine using\nan M.2 SSD it took 37 minutes.")]),t._v(" "),n("h3",{attrs:{id:"running-unreal"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#running-unreal"}},[t._v("#")]),t._v(" Running Unreal")]),t._v(" "),n("p",[t._v('In the solution explorer right-click "UE5" under the "Engine" entry at the top\nand select "Set as Startup Project".')]),t._v(" "),n("p",[t._v("Press F5 to run UE")]),t._v(" "),n("h3",{attrs:{id:"earlier-versions"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#earlier-versions"}},[t._v("#")]),t._v(" Earlier versions")]),t._v(" "),n("p",[t._v("These instructions will work for Unreal 4.27 and Visual Studio 2022.  Make sure you\nclone the git repository then checkout the 4.27 branch "),n("em",[t._v("before")]),t._v(" you run\nSetup.bat or GenerateProjectFiles.bat.")]),t._v(" "),n("p",[t._v("The solution file created will be called UE4.sln not UE5.sln.")])])}),[],!1,null,null,null);e.default=i.exports}}]);