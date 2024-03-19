(window.webpackJsonp=window.webpackJsonp||[]).push([[61],{346:function(e,t,o){"use strict";o.r(t);var r=o(14),n=Object(r.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",[e._v(e._s(this.$page.title))]),e._v(" "),t("h2",{attrs:{id:"introduction"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#introduction"}},[e._v("#")]),e._v(" Introduction")]),e._v(" "),t("p",[e._v("A video like "),t("a",{attrs:{href:"https://www.youtube.com/watch?v=JOJP0CvpB8w&t=403s",target:"_blank",rel:"noopener noreferrer"}},[e._v("this"),t("OutboundLink")],1),e._v(" has a combination\nof:")]),e._v(" "),t("ul",[t("li",[e._v("voice narration")]),e._v(" "),t("li",[e._v("motion graphics")]),e._v(" "),t("li",[e._v("screen capture playbacks from Unreal")])]),e._v(" "),t("p",[e._v("It is created using Adobe After Effects.  The question is, can this be\ncreated using a python script and the Resolve python API.")]),e._v(" "),t("p",[e._v("The reason for wanting to do this is:")]),e._v(" "),t("ul",[t("li",[e._v("I want to document a complex technical area and this will involve going\nback and changing things as I learn and as the API in Unreal changes; it would\nbe good to avoid having to manually re-record videos, and instead be able\nto just regenerate them from scripts")])]),e._v(" "),t("h2",{attrs:{id:"required-functionality"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#required-functionality"}},[e._v("#")]),e._v(" Required Functionality")]),e._v(" "),t("p",[e._v("Need to be able to:")]),e._v(" "),t("p",[e._v("[GENERATE]")]),e._v(" "),t("ul",[t("li",[e._v("load Resolve and run a python script to\n"),t("ul",[t("li",[e._v("make a new project")]),e._v(" "),t("li",[e._v("create (1?) timeline")]),e._v(" "),t("li",[e._v("read text paragraphs from a file\n"),t("ul",[t("li",[e._v("convert each paragraph to a sound file")]),e._v(" "),t("li",[e._v("add each sound file to the timeline\n"),t("ul",[t("li",[e._v("at a stated position or just sequentially")])])])])]),e._v(" "),t("li",[e._v("read motion graphics descriptions from a file\n"),t("ul",[t("li",[e._v("or have python resolve API code")]),e._v(" "),t("li",[e._v("add the graphics to the timeline\n"),t("ul",[t("li",[e._v("anchored to  the relevant text")]),e._v(" "),t("li",[e._v("or some other time")])])])])]),e._v(" "),t("li",[e._v("read video clips captured from Unreal from a file\n"),t("ul",[t("li",[e._v("add the videos to the timeline\n"),t("ul",[t("li",[e._v("anchored to  the relevant text")]),e._v(" "),t("li",[e._v("or some other time")])])])])]),e._v(" "),t("li",[e._v("save  the project")])])])]),e._v(" "),t("p",[e._v("[RENDER]")]),e._v(" "),t("ul",[t("li",[e._v("render the project to a video suitable for uploading to youtube\n"),t("ul",[t("li",[e._v("either as a separate command line invocation")]),e._v(" "),t("li",[e._v("or in the same command line as [GENERATE]")])])])]),e._v(" "),t("p",[e._v("Questions:")]),e._v(" "),t("ul",[t("li",[e._v("would it be good to have different render output resolutions to produce quick drafts?")]),e._v(" "),t("li",[e._v("what software to convert text to speech?\n"),t("ul",[t("li",[t("p",[e._v("online google - https://cloud.google.com/text-to-speech/pricing")])]),e._v(" "),t("li",[t("p",[e._v("https://pypi.org/project/pyttsx3/\npy -3.8 -m pip install pyttsx3\npy -3.8 TestTTS.py")])]),e._v(" "),t("li",[t("p",[e._v("https://github.com/coqui-ai/TTS\npy -3.8 -m pip install TTS")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[e._v("WARNING: The script f2py.exe is installed in 'D:\\audio\\Python38\\Scripts' which is not on PATH.\n\npy -3.8 TestTTS2.py\n")])])])]),e._v(" "),t("li",[t("p",[e._v("https://pypi.org/project/gTTS/\npy -3.8 -m pip install gTTS\npy -3.8 TestTTS3.py")])]),e._v(" "),t("li",[t("p",[e._v("dotnet https://learn.microsoft.com/en-us/dotnet/api/system.speech.synthesis?view=netframework-4.8.1&redirectedfrom=MSDN")])]),e._v(" "),t("li",[t("p",[e._v("on azure https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-audio-content-creation\npy -3.8 -m pip install azure-cognitiveservices-speech\nset SPEECH_KEY=688c3eb9fecb413190363718d0c47708\nset SPEECH_REGION=eastUS\npy -3.8 TestTTS4.py")])])])])]),e._v(" "),t("h2",{attrs:{id:"tips"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#tips"}},[e._v("#")]),e._v(" Tips")]),e._v(" "),t("p",[e._v("In  Resolve  use Workspace->Console to open the scripting console")]),e._v(" "),t("h2",{attrs:{id:"references"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#references"}},[e._v("#")]),e._v(" References")]),e._v(" "),t("p",[t("a",{attrs:{href:"https://www.youtube.com/watch?v=2ZtkLXDpNhM&t=785s",target:"_blank",rel:"noopener noreferrer"}},[e._v("Resolve Automation"),t("OutboundLink")],1)]),e._v(" "),t("p",[t("a",{attrs:{href:"https://www.youtube.com/watch?v=5lyzNKqzYlY",target:"_blank",rel:"noopener noreferrer"}},[e._v("Resolve Basic Python Console"),t("OutboundLink")],1)]),e._v(" "),t("p",[t("a",{attrs:{href:"https://documents.blackmagicdesign.com/UserManuals/Fusion8_Scripting_Guide.pdf",target:"_blank",rel:"noopener noreferrer"}},[e._v("Fusion8 Manual"),t("OutboundLink")],1)]),e._v(" "),t("p",[t("a",{attrs:{href:"https://www.reddit.com/r/davinciresolve/comments/utu8ls/best_render_settings_for_uploading_the_youtube/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Render Settings for Youtube"),t("OutboundLink")],1)]),e._v(" "),t("p",[t("a",{attrs:{href:"https://www.reddit.com/r/videography/comments/xxprwo/best_settings_to_upload_to_youtube_vmaf_analysis/?context=3",target:"_blank",rel:"noopener noreferrer"}},[e._v("Youtube settings"),t("OutboundLink")],1)]),e._v(" "),t("p",[t("a",{attrs:{href:"https://www.reddit.com/r/davinciresolve/comments/y1sj97/best_bitrate_for_1080p_60fps_youtube_upload/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Bitrates"),t("OutboundLink")],1)]),e._v(" "),t("p",[t("a",{attrs:{href:"https://www.reddit.com/r/davinciresolve/comments/12i2ls5/is_there_a_way_to_add_youtube_chapters_inside/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Chapters"),t("OutboundLink")],1)]),e._v(" "),t("p",[t("a",{attrs:{href:"https://forum.blackmagicdesign.com/viewtopic.php?f=12&t=168568",target:"_blank",rel:"noopener noreferrer"}},[e._v("Resolve Python Loading Errors"),t("OutboundLink")],1)]),e._v(" "),t("p",[t("a",{attrs:{href:"https://www.youtube.com/watch?v=5GYqpuSXR40",target:"_blank",rel:"noopener noreferrer"}},[e._v("Winbush Sequencer"),t("OutboundLink")],1),e._v(" "),t("a",{attrs:{href:"https://forums.unrealengine.com/t/ue4-sequencer-python-cookbook/265097",target:"_blank",rel:"noopener noreferrer"}},[e._v("EpicSequencerPythonCookbook"),t("OutboundLink")],1),e._v(" "),t("a",{attrs:{href:"https://github.com/gtreshchev/RuntimeAudioImporter",target:"_blank",rel:"noopener noreferrer"}},[e._v("RuntimeAudioImporter open source audio plugin"),t("OutboundLink")],1)])])}),[],!1,null,null,null);t.default=n.exports}}]);