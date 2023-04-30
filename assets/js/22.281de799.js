(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{302:function(e,t,a){"use strict";a.r(t);var n=a(14),s=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",[e._v(e._s(this.$page.title))]),e._v(" "),a("h2",{attrs:{id:"introduction"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#introduction"}},[e._v("#")]),e._v(" Introduction")]),e._v(" "),a("p",[e._v("This describes one approach to making GIF files from Unreal Engine.  This approach\nis used to make the GIF files on this site.")]),e._v(" "),a("h3",{attrs:{id:"tools"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tools"}},[e._v("#")]),e._v(" Tools")]),e._v(" "),a("p",[e._v("This approach uses Sequencer and ffmpeg.  Both Sequencer and ffmpeg have many, many\nfunctions and options, here we use the bare minimum required to create a GIF.")]),e._v(" "),a("p",[e._v("ffmpeg can be downloaded from "),a("a",{attrs:{href:"https://ffmpeg.org/download.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://ffmpeg.org/download.html"),a("OutboundLink")],1)]),e._v(" "),a("h2",{attrs:{id:"recording-from-unreal-engine"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#recording-from-unreal-engine"}},[e._v("#")]),e._v(" Recording from Unreal Engine")]),e._v(" "),a("h3",{attrs:{id:"adding-a-master-sequence"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#adding-a-master-sequence"}},[e._v("#")]),e._v(" Adding a Master Sequence")]),e._v(" "),a("p",[e._v("We will be using a master sequence, which is an object which controls a collection of shots.  For the purposes of this exercise we will have only one shot.")]),e._v(" "),a("p",[e._v('Assuming you are in the Unreal editor, click on the Cinematics button and select "Add Master Sequence"\nlike this:')]),e._v(" "),a("p",[a("img",{attrs:{src:"/images/gifs_001.png",alt:""}})]),e._v(" "),a("p",[e._v("This dialog appears:")]),e._v(" "),a("p",[a("img",{attrs:{src:"/images/gifs_002.png",alt:""}})]),e._v(" "),a("p",[e._v('Change the Number of Shots to 1 and click the "Create Master Sequence" button.')]),e._v(" "),a("p",[e._v("Adding the master sequence opens the Sequencer tab like so:")]),e._v(" "),a("p",[a("img",{attrs:{src:"/images/gifs_003.png",alt:""}})]),e._v(" "),a("p",[e._v("and adds a CineCameraActor object to the scene, visible in the Outliner window:")]),e._v(" "),a("p",[a("img",{attrs:{src:"/images/gifs_004.png",alt:""}})]),e._v(" "),a("p",[e._v("The lightning bolt next to the actor in the outliner window indicates the camera is spawnable and so only exists in the scene\nwhen sequencer is rendering.")]),e._v(" "),a("h3",{attrs:{id:"aiming-the-camera"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#aiming-the-camera"}},[e._v("#")]),e._v(" Aiming the Camera")]),e._v(" "),a("p",[e._v('One way of positioning the camera is to right click it in the outliner and select "Pilot CineCameraActor" and then change the view\nto point the camera at scene you want rendered in the GIF:')]),e._v(" "),a("p",[a("img",{attrs:{src:"/images/gifs_005.png",alt:""}})]),e._v(" "),a("p",[e._v('Once the camera is pointed where you want right click the camera again and select "Stop Piloting CineCameraActor".')]),e._v(" "),a("h3",{attrs:{id:"setting-the-gif-duration"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#setting-the-gif-duration"}},[e._v("#")]),e._v(" Setting the GIF Duration")]),e._v(" "),a("p",[e._v('If it helps you can change the timeline from frame to seconds by clicking on the "30 fps" button:')]),e._v(" "),a("p",[a("img",{attrs:{src:"/images/gifs_007.png",alt:""}})]),e._v(" "),a("p",[e._v("We need to do two things to change the length of the shot")]),e._v(" "),a("p",[e._v("(1) In the sequencer window click the red line and drag it to the left to shorten the length of the camera cut:")]),e._v(" "),a("p",[a("img",{attrs:{src:"/images/gifs_006.png",alt:""}})]),e._v(" "),a("p",[e._v("(2) Click the SequenceMaster button shown here:")]),e._v(" "),a("p",[a("img",{attrs:{src:"/images/gifs_008.png",alt:""}})]),e._v(" "),a("p",[e._v("and drag the rightmost red line to change the length of the shot:")]),e._v(" "),a("p",[a("img",{attrs:{src:"/images/gifs_009.png",alt:""}})]),e._v(" "),a("h3",{attrs:{id:"rendering-to-png-files"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rendering-to-png-files"}},[e._v("#")]),e._v(" Rendering to PNG files")]),e._v(" "),a("p",[e._v("We want to render each frame to a separate PNG file which will serve as the input to ffmpeg.")]),e._v(" "),a("p",[e._v("Click the render button shown here:")]),e._v(" "),a("p",[a("img",{attrs:{src:"/images/gifs_010.png",alt:""}})]),e._v(" "),a("p",[e._v("Change the render settings to the ones shown here:")]),e._v(" "),a("p",[a("img",{attrs:{src:"/images/gifs_011.png",alt:""}})]),e._v(" "),a("p",[e._v("Particularly we changed these values from their defaults:")]),e._v(" "),a("ul",[a("li",[e._v("Image Output Format to Image Sequence")]),e._v(" "),a("li",[e._v("Resolution to 1280 x 720")]),e._v(" "),a("li",[e._v('Filename Format to {world}_{frame}, changing the default "." to "_"')]),e._v(" "),a("li",[e._v("Overwrite Existing (In Advanced) to checked, otherwise each time you capture frames the file names will change")]),e._v(" "),a("li",[e._v("Delay Before Warm Up to 1.0s, otherwise the first frame can be blurred")])]),e._v(" "),a("p",[e._v('Press the Capture Movie button.  Once capture is complete a notification popup appears and you can press "Open Capture Folder"\nto open the directory where the PNG files were generated.')]),e._v(" "),a("h3",{attrs:{id:"creating-the-gif-using-ffmpeg"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#creating-the-gif-using-ffmpeg"}},[e._v("#")]),e._v(" Creating the GIF using ffmpeg")]),e._v(" "),a("p",[e._v("Assuming you have ffmpeg installed and on the path, there are two commands to run to create a GIF from\nthe set of image files created by Unreal.")]),e._v(" "),a("p",[e._v('The example Unreal level used here was called "MainMap" - this provides the basis for the file names\ncreated by the Capture Movie process - you will need to substitute your own map name in these commands.')]),e._v(" "),a("p",[e._v("These steps are:")]),e._v(" "),a("ul",[a("li",[e._v("open a command window")]),e._v(" "),a("li",[e._v("change to the directory containing the image files")]),e._v(" "),a("li",[e._v("run this command to create a palette from the colours used in the first PNG file."),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("ffmpeg -i MainMap_0001.png -vf palettegen palette.png -y\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br")])])]),e._v(" "),a("li",[e._v("run this command to create the GIF file"),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('ffmpeg -framerate 24 -i Mainmap_%4d.png -i palette.png -y -filter_complex "paletteuse[v];[v]scale=720:-1" output.gif \n')])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br")])])])]),e._v(" "),a("p",[e._v("The scale value changes the quality of the GIF, higher values mean better quality but a larger GIF file.  The framerate\nspecified should match the framerate used in the Render Movie Settings dialog.  The GIF below was recorded at 24fps and\ncreated by ffmpeg at 12fps so it appears to be in slow motion.")]),e._v(" "),a("p",[e._v('For example with "scale=720" the GIF below is 18.1 Mb:')]),e._v(" "),a("p",[a("img",{attrs:{src:"/images/gifs_025.gif",alt:""}})]),e._v(" "),a("p",[e._v('Whereas with "scale=360" it is only GIF below was reduced to 4.5 Mb:')]),e._v(" "),a("p",[a("img",{attrs:{src:"/images/gifs_024.gif",alt:""}})]),e._v(" "),a("p",[e._v('If you place these commands into a .bat file, you will need to change the "%" character to "%%" like so:')]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('ffmpeg -framerate 24 -i Mainmap_%4d.png -i palette.png -y -filter_complex "paletteuse[v];[v]scale=720:-1" output.gif \n')])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br")])]),a("p",[e._v("becomes")]),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('ffmpeg -framerate 24 -i Mainmap_%%4d.png -i palette.png -y -filter_complex "paletteuse[v];[v]scale=720:-1" output.gif \n')])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br")])]),a("h3",{attrs:{id:"references"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#references"}},[e._v("#")]),e._v(" References")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://www.youtube.com/watch?v=5jHhIah8H7U",target:"_blank",rel:"noopener noreferrer"}},[e._v("Sequencer Tutorial https://www.youtube.com/watch?v=5jHhIah8H7U"),a("OutboundLink")],1)]),e._v(" "),a("p",[a("a",{attrs:{href:"https://forums.unrealengine.com/t/using-the-sequencer-bad-first-frame-every-camera-change/447602/2",target:"_blank",rel:"noopener noreferrer"}},[e._v("Sequencer Bad First Frame https://forums.unrealengine.com"),a("OutboundLink")],1)])])}),[],!1,null,null,null);t.default=s.exports}}]);