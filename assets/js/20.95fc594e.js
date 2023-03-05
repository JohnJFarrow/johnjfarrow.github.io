(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{302:function(e,t,n){"use strict";n.r(t);var o=n(14),r=Object(o.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("p",[e._v("Capturing a viewport including UMG UI elements:")]),e._v(" "),n("p",[e._v("try using\nhttps://dev.epicgames.com/community/learning/tutorials/YD46/unreal-engine-how-to-write-ndisplay-viewports-to-disk-using-media-capture\nor basing code off that")]),e._v(" "),n("p",[e._v("nDisplay Media Output has a param for number of texture buffers\nused to transfer texture from GPU to system memory, uses\n(think) a round robin")]),e._v(" "),n("p",[e._v("LogMediaIOCore: Error: File media capture only supports tightly packed rows. Expected stride: 7232. Received stride: 7424. It might also mean that output resolution is too small.")]),e._v(" "),n("p",[e._v("Works with specified output file size.")]),e._v(" "),n("p",[e._v("Needs a\nMedia Capture object\nand a File Media Output object\n-- how do they work?")]),e._v(" "),n("p",[e._v("Does it capture UI? NO!!!")]),e._v(" "),n("p",[e._v("Texture Share: https://docs.unrealengine.com/5.0/en-US/texture-share-in-unreal-engine/")]),e._v(" "),n("p",[e._v("In the document of FScreenshotRequest 80, there is a parameter to control whether to show UI.")]),e._v(" "),n("p",[e._v("Usng USceneCaptureComponent2d from c++\nhttps://forums.unrealengine.com/t/using-uscenecapturecomponent2d-to-create-a-snapshot-at-runtime/391155")]),e._v(" "),n("p",[e._v("this claims to do it but with low resolution problems\nhttps://forums.unrealengine.com/t/poor-scene-capture-quality-in-umg-widget/269694\nand remember to set the Material Domain to UI, use the Emmisive and lenght A-B to cancel out the bakground (to give the output opacity)")]),e._v(" "),n("p",[e._v("Does NDI code capture  the UI?")]),e._v(" "),n("p",[e._v("Owl capture thing is a component, attach to cinecamera component\nspecify a render target\nset size and options")]),e._v(" "),n("ul",[n("li",[e._v("renders camera viewport to render target")]),e._v(" "),n("li",[e._v("texture size responds to changing film back in parent cinecam component")]),e._v(" "),n("li",[e._v("need to specify widget to render as hud")])]),e._v(" "),n("p",[e._v("Composure:")]),e._v(" "),n("ol",[n("li",[e._v("performance loss")]),e._v(" "),n("li",[e._v("it replaces the Cinecam with a Scene Capture 2D under the hood so you don't benefit from the Cinecam rendering pipeline.\nThis is a new method we had to write from scratch but we got guidance from one of the VP team at Epic.\nIt uses the Cinecam pipeline so you benefit from the performance optimisation, DLSS and all Cinecam post-processing etc.\nWith DLSS on you can get +100FPS output 😃")])]),e._v(" "),n("p",[e._v("This is Owl output to srt\nhttps://knowledge.offworld.live/en/unreal-engine-live-streaming-toolkit/how-to-live-stream-srt-from-unreal-engine-to-obs-studio")]),e._v(" "),n("p",[e._v("https://forums.unrealengine.com/t/render-target-using-cine-camera/98072/11")]),e._v(" "),n("ul",[n("li",[e._v('using composure to capture a cinecamera\nUFUNCTION(BlueprintCallable, Category = "Composure")\nstatic void CopyCameraSettingsToSceneCapture(UCameraComponent* SrcCamera, USceneCaptureComponent2D* DstCaptureComponent);\nIt is also exposed to Blueprints, so it can be used from Blueprint scripts.')])]),e._v(" "),n("p",[e._v("https://github.com/TimmHess/UnrealImageCapture\nIn this repository I want to condense my findings on how to implement a component to capture images to disk from an arbitrary UE4 (which fortunately apply likewise to UE5) scene from scratch lowering the bar for UE novices. This will include:")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[e._v("Rendering images at high FPS without blocking the UE rendering thread\nRendering segmentation (or other graphics buffers) at the same time\n")])])]),n("p",[e._v("https://github.com/microsoft/AirSim")]),e._v(" "),n("p",[e._v("example c++ code\nhttps://ikrima.dev/ue4guide/graphics-development/how-to/explicit-render-to-rendertarget/")]),e._v(" "),n("p",[e._v("Rendering Outside Normal Render Path# Also take a look at SceneCaptureRenderer: which creates a separate renderer to do captures")]),e._v(" "),n("p",[e._v("CopyCameraSettingsToSceneCapture()")]),e._v(" "),n("p",[e._v('CHAT\nYes, you can capture the HUD (Heads Up Display) in a SceneCapture2D component in Unreal Engine.\nBy default, the HUD is not included in the SceneCapture2D component, as it is rendered separately and overlaid on top of the scene. However, you can enable the HUD to be captured by setting the "Composite Mode" property of the SceneCapture2D component to "SceneColorHDRSceneDepth" or "SceneColorHDRSceneDepthNoStencil".\nWhen the "Composite Mode" property is set to one of these options, the SceneCapture2D component will capture the HUD along with the rest of the scene. The "SceneDepth" component captures the depth information of the scene, which is necessary for correctly rendering the HUD on top of the scene.\nNote that when the HUD is included in the capture, it will appear as part of the captured image, rather than overlaid on top of it. If you want to separate the HUD from the captured image, you can render the HUD to a separate texture and composite it with the captured scene in post-processing.')]),e._v(" "),n("p",[e._v('I apologize for the confusion. You are correct that the "Composite Mode" property of the SceneCapture2D component is read-only and cannot be set directly.')]),e._v(" "),n("p",[e._v("To capture the HUD in the SceneCapture2D component, you need to use a render target. Here are the steps to do so:")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[e._v('Create a new render target asset by right-clicking in the Content Browser and selecting "Material & Textures" -> "Render Target".\n\nSet the size and format of the render target to match the resolution and format of the SceneCapture2D component.\n\nAssign the render target to the "Texture Target" property of the SceneCapture2D component.\n\nIn your HUD blueprint, create a new widget component and add your HUD widgets to it.\n\nSet the "Render Target" property of the widget component to the render target you created in step 1.\n\nIn the HUD blueprint, call the "Draw Widget" function to draw the HUD widgets to the render target.\n\nWhen you capture the scene using the SceneCapture2D component, the HUD will be included in the capture as part of the render target texture.\n')])])]),n("p",[e._v("I hope this helps! Let me know if you have any further questions.")])])}),[],!1,null,null,null);t.default=r.exports}}]);