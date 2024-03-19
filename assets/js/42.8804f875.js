(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{327:function(e,t,i){"use strict";i.r(t);var a=i(14),s=Object(a.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",[e._v(e._s(this.$page.title))]),e._v(" "),t("h2",{attrs:{id:"introduction"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#introduction"}},[e._v("#")]),e._v(" Introduction")]),e._v(" "),t("p",[e._v("This describes some initial steps in using chaos physics in Unreal Engine 5.0.2.")]),e._v(" "),t("p",[e._v("The image\nbelow shows a working recreation of a medieval trebuchet built at "),t("a",{attrs:{href:"https://en.wikipedia.org/wiki/Warwick_Castle",target:"_blank",rel:"noopener noreferrer"}},[e._v("Warwick Castle"),t("OutboundLink")],1),e._v("\nin England.")]),e._v(" "),t("p",[t("img",{attrs:{src:"/images/chaos_001.jpg",alt:""}})]),e._v(" "),t("p",[e._v("Image is from "),t("a",{attrs:{href:"https://www.youtube.com/channel/UC89LF5ncbTZi9MukrMSN8eQ",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://www.youtube.com/channel/UC89LF5ncbTZi9MukrMSN8eQ"),t("OutboundLink")],1)]),e._v(" "),t("p",[e._v("This article describes the steps I took to create a working trebuchet model in Unreal Engine.")]),e._v(" "),t("h2",{attrs:{id:"blender-model"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#blender-model"}},[e._v("#")]),e._v(" Blender Model")]),e._v(" "),t("p",[e._v("The image below show an unshaded blender model of the trebuchet.")]),e._v(" "),t("p",[t("img",{attrs:{src:"/images/chaos_002.png",alt:""}})]),e._v(" "),t("p",[e._v("This model is constructed of these parts:")]),e._v(" "),t("ol",[t("li",[e._v("the base")]),e._v(" "),t("li",[e._v("the arm")]),e._v(" "),t("li",[e._v("the counterweight")]),e._v(" "),t("li",[e._v("the ramp")])]),e._v(" "),t("p",[e._v("Each of these was exported from Blender in FBX format using these options")]),e._v(" "),t("img",{staticClass:"center",attrs:{src:"/images/chaos_003.png"}}),e._v(" "),t("h3",{attrs:{id:"exporting-at-the-origin"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#exporting-at-the-origin"}},[e._v("#")]),e._v(" Exporting at the Origin")]),e._v(" "),t("p",[e._v("Before exporting it, each component was moved to the origin in Blender.  This makes it easier to\nwork with the meshes once they are imported into Unreal. It makes the local coordinate\nsystem meaningful.")]),e._v(" "),t("p",[e._v("Taking the arm component as an example,\nif it is centered on the world origin in Blender and then exported, in Unreal it looks\nlike this:")]),e._v(" "),t("p",[t("img",{attrs:{src:"/images/chaos_004.png",alt:""}})]),e._v(" "),t("p",[e._v("If it is not centered on the world origin in Blender, in Unreal it looks\nlike this:")]),e._v(" "),t("p",[t("img",{attrs:{src:"/images/chaos_005.png",alt:""}})]),e._v(" "),t("p",[e._v("The difference in the position of the arm's origin effects how it easy it is to manipulate\nonce the FBX file has been imported as a mesh and referenced by a Static Mesh component in blueprint.  As this image shows, when the\narm is positioned at the world origin in Blender, the\nUnreal transform gizmo (using world coordinates) is centered on the arm origin:")]),e._v(" "),t("p",[t("img",{attrs:{src:"/images/chaos_006.png",alt:""}})]),e._v(" "),t("p",[e._v("and when using local coordinates the Unreal transform gizmo is centered on the arm origin\nand aligned parallel with the arm to make it easy to position and rotate the arm.")]),e._v(" "),t("p",[t("img",{attrs:{src:"/images/chaos_008.png",alt:""}})]),e._v(" "),t("p",[e._v("If the arm is not centered on the world origin in Blender before it is exported, this is what\nit looks like in Unreal:")]),e._v(" "),t("p",[t("img",{attrs:{src:"/images/chaos_007.png",alt:""}})]),e._v(" "),t("p",[e._v("The Unreal transform gizmo is not positioned on the arm, making it harder to position, and\nthe local and world coordinate systems are the same, making it difficult to rotate without\nmanually changing the pivot point.")]),e._v(" "),t("h2",{attrs:{id:"using-chaos-physics"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#using-chaos-physics"}},[e._v("#")]),e._v(" Using Chaos Physics")]),e._v(" "),t("p",[e._v("To get to the position where we can start adding Physics Constraints, perform these steps to import the FBX files exported from Blender and create a blueprint trebuchet object:")]),e._v(" "),t("ul",[t("li",[e._v("launch Unreal Editor")]),e._v(" "),t("li",[e._v("create a new project with the Games, Blank, Blueprint options")]),e._v(" "),t("li",[e._v('make new folders under the "Content" folder called "Blueprints" and "Meshes"')]),e._v(" "),t("li",[e._v("open the Meshes folder and drop in "),t("a",{attrs:{href:"https://github.com/JohnJFarrow/public/blob/85b1e346a91328e5c8432ed0fe2684051b4b788a/Arm.fbx",target:"_blank",rel:"noopener noreferrer"}},[e._v("Arm.fbx"),t("OutboundLink")],1),e._v(", "),t("a",{attrs:{href:"https://github.com/JohnJFarrow/public/blob/85b1e346a91328e5c8432ed0fe2684051b4b788a/Weight.fbx",target:"_blank",rel:"noopener noreferrer"}},[e._v("Weight.fbx"),t("OutboundLink")],1),e._v(", "),t("a",{attrs:{href:"https://github.com/JohnJFarrow/public/blob/85b1e346a91328e5c8432ed0fe2684051b4b788a/Ramp.fbx",target:"_blank",rel:"noopener noreferrer"}},[e._v("Ramp.fbx"),t("OutboundLink")],1),e._v("\nand "),t("a",{attrs:{href:"https://github.com/JohnJFarrow/public/blob/85b1e346a91328e5c8432ed0fe2684051b4b788a/Base.fbx",target:"_blank",rel:"noopener noreferrer"}},[e._v("Base.fbx"),t("OutboundLink")],1)]),e._v(" "),t("li",[e._v("rename these meshes SM_Arm, SM_Weight, SM_Ramp, and SM_Base respectively")]),e._v(" "),t("li",[e._v("in the Blueprints directory create a new blueprint derived from the Actor parent class.  Rename this BP_Trebuchet")]),e._v(" "),t("li",[e._v("open  BP_Trebuchet in the blueprint editor")]),e._v(" "),t("li",[e._v("add a Static Mesh component\n"),t("ul",[t("li",[e._v('rename this "Base"')]),e._v(" "),t("li",[e._v('set its static mesh property to "SM_Base"')]),e._v(" "),t("li",[e._v('set its mobility property to "Static"; this will change Collision Presets to BlockAll')])])]),e._v(" "),t("li",[e._v('drag the Base component and drop it on the "DefaultSceneRoot" to make it the root component')]),e._v(" "),t("li",[e._v("add another Static Mesh component\n"),t("ul",[t("li",[e._v('rename this "Arm"')]),e._v(" "),t("li",[e._v('set its static mesh property to "SM_Arm"')]),e._v(" "),t("li",[e._v("set Simulate Physics to checked, this will change Collision Presets to PhysicsActor")]),e._v(" "),t("li",[e._v("set its mass to 505 kg which is calculated from its volume and the density of ash")]),e._v(" "),t("li",[e._v("set Enable Gravity to checked")]),e._v(" "),t("li",[e._v("position the arm to intersect the base axle like so:")])])])]),e._v(" "),t("p",[t("img",{attrs:{src:"/images/chaos_009.png",alt:""}})]),e._v(" "),t("h4",{attrs:{id:"things-fly-apart"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#things-fly-apart"}},[e._v("#")]),e._v(" Things fly apart")]),e._v(" "),t("p",[e._v("If you press the Simulate button now you will see something like this:")]),e._v(" "),t("img",{staticClass:"center",attrs:{src:"/images/chaos_010.gif"}}),e._v(" "),t("p",[e._v("What's happening here is that the base and the arm are colliding; in their start positions they are occupying the same\nspace where the arm intersects the base axle.  The chaos physics solver tries to push them apart violently.")]),e._v(" "),t("p",[e._v("This can be prevented by adding a Physics Constraint component to BP_Trebuchet.")]),e._v(" "),t("h3",{attrs:{id:"preventing-collisions-using-constraints"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#preventing-collisions-using-constraints"}},[e._v("#")]),e._v(" Preventing Collisions using Constraints")]),e._v(" "),t("p",[e._v("A Physics Constraint can apply linear and angular forces\nto objects, and constrain the interactions between objects.   It can also disable collisions between\nobjects, which is what we want to do, so we:")]),e._v(" "),t("ul",[t("li",[e._v("add a Physics Constraint component")]),e._v(" "),t("li",[e._v('rename it "ArmBaseStopCollision"')]),e._v(" "),t("li",[e._v('set Component Name 1 to "Base"')]),e._v(" "),t("li",[e._v('set Component Name 2 to "Arm"')]),e._v(" "),t("li",[e._v('under "Constraint Behaviour" set Disable Collision to checked')]),e._v(" "),t("li",[e._v("set all the linear and angular limits to Free so this constraint does not affect the motion of the arm, like this:")])]),e._v(" "),t("img",{staticClass:"center",attrs:{src:"/images/chaos_012.png"}}),e._v(" "),t("p",[e._v("Now if you press the Simulate button now you will see something like this:")]),e._v(" "),t("img",{staticClass:"center",attrs:{src:"/images/chaos_011.gif"}}),e._v(" "),t("p",[e._v("This is what we expect, the arm falls because gravity acts on it, and we have disabled collision with the base so the\narm falls right through the base.  (If you are using Unreal 5.0.2 you might need to close the blueprint editor window and reopen it to reset the simulation)")]),e._v(" "),t("h3",{attrs:{id:"preventing-collisions-using-channels"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#preventing-collisions-using-channels"}},[e._v("#")]),e._v(" Preventing Collisions using Channels")]),e._v(" "),t("p",[e._v("Another way of preventing the arm and the base from colliding is to use\na custom Object Channel. We can create a custom Object Channel which represents a type of object. We assign\nthis type to the base\ncomponent, and then configure the arm component not to collide with objects of this type.")]),e._v(" "),t("p",[e._v("From the menu choose "),t("code",[e._v("Edit | Project Settings...")]),e._v(" and\non the left hand side choose Collision, you will see this screen:")]),e._v(" "),t("p",[t("img",{attrs:{src:"/images/chaos_031.png",alt:""}})]),e._v(" "),t("p",[e._v('Click the "New Object Channel" button to create a new channel.  On the screen above\nyou can see we have already added a custom channel cells "CustomBaseChannel"')]),e._v(" "),t("p",[e._v("Edit the BP_Trebuchet blueprint and select the Base StaticMesh component.")]),e._v(" "),t("p",[e._v("Set the collision properties like this:")]),e._v(" "),t("p",[t("img",{attrs:{src:"/images/chaos_032.png",alt:""}})]),e._v(" "),t("p",[e._v('This tells Unreal that when resolving collisions the base should be considered to\nbe of type "CustomBaseChannel".')]),e._v(" "),t("p",[e._v("Next select the Arm component and configure the collision properties like this:")]),e._v(" "),t("p",[t("img",{attrs:{src:"/images/chaos_033.png",alt:""}})]),e._v(" "),t("p",[e._v('This tells Unreal that when the arm collides with something of the "CustomBaseChannel"\ntype, to ignore that collision.')]),e._v(" "),t("h3",{attrs:{id:"constraining-the-arm"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#constraining-the-arm"}},[e._v("#")]),e._v(" Constraining the Arm")]),e._v(" "),t("p",[e._v("We want the arm to pivot around the axle.  If we change all the Linear Limits to Locked, and\nchange Swing 1 Motion and Swing 2 Motion to locked, leaving Twist Motion as Free, the only\nway the arm can move is to pivot is around the X axis.")]),e._v(" "),t("p",[t("img",{attrs:{src:"/images/chaos_013.png",alt:""}})]),e._v(" "),t("p",[e._v('Looking at the tooltip for Twist Limit it sort of explains what Twist Motion does: "Symmetric angle of roll along the X-axis". This\ntells us the Twist Motion properties control the twist around '),t("strong",[e._v("the X-axis of the constraint, not the X-Axis of the\nconstrained components")]),e._v(".  You can see this by changing the yaw angle (rotation around the local X-axis) of the constraint - at 45 degrees\nthe arm just tips over slightly, at 90 degrees nothing happens at all.")]),e._v(" "),t("p",[e._v("Looking at the image below, we can see the constraint X-axis (the red one) is pointing parallel to the axle\nwhich is what we want.")]),e._v(" "),t("p",[t("img",{attrs:{src:"/images/chaos_014.png",alt:""}})]),e._v(" "),t("p",[e._v("If we press the Simulate button from this position the arm pivots around the position of the constraint like so:")]),e._v(" "),t("p",[t("img",{attrs:{src:"/images/chaos_014.gif",alt:""}})]),e._v(" "),t("p",[e._v("If we position the constraint where the axle is like this:")]),e._v(" "),t("p",[t("img",{attrs:{src:"/images/chaos_015.png",alt:""}})]),e._v(" "),t("p",[e._v("Then we get the arm swinging in the way we want:")]),e._v(" "),t("p",[t("img",{attrs:{src:"/images/chaos_016.gif",alt:""}})]),e._v(" "),t("h3",{attrs:{id:"adding-the-counterweight"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#adding-the-counterweight"}},[e._v("#")]),e._v(" Adding the Counterweight")]),e._v(" "),t("p",[e._v("Add another Static Mesh component:")]),e._v(" "),t("ul",[t("li",[e._v('rename this "Weight"')]),e._v(" "),t("li",[e._v('set its static mesh property to "SM_Weight"')]),e._v(" "),t("li",[e._v("set Simulate Physics to checked, this will change Collision Presets to PhysicsActor")]),e._v(" "),t("li",[e._v("set its mass to 4506 kg which is calculated from its volume and the density of stone")]),e._v(" "),t("li",[e._v("set Enable Gravity to checked")]),e._v(" "),t("li",[e._v("position the weight to intersect the arm like so:")])]),e._v(" "),t("p",[t("img",{attrs:{src:"/images/chaos_017.png",alt:""}})]),e._v(" "),t("p",[e._v("Add a Physics Constraint component to link the weight to the arm:")]),e._v(" "),t("ul",[t("li",[e._v('rename it "ArmWeightConstraint"')]),e._v(" "),t("li",[e._v('set Component Name 1 to "Arm"')]),e._v(" "),t("li",[e._v('set Component Name 2 to "Weight"')]),e._v(" "),t("li",[e._v('under "Constraint Behaviour" set Disable Collision to checked')]),e._v(" "),t("li",[e._v("move the constraint to where the weight is attached to the arm")])]),e._v(" "),t("p",[e._v("Add another Physics Constraint just to stop the weight colliding with the base:")]),e._v(" "),t("ul",[t("li",[e._v('rename it "BaseWeightConstraint"')]),e._v(" "),t("li",[e._v('set Component Name 1 to "Base"')]),e._v(" "),t("li",[e._v('set Component Name 2 to "Weight"')]),e._v(" "),t("li",[e._v('under "Constraint Behaviour" set Disable Collision to checked')]),e._v(" "),t("li",[e._v("set all the limits to Free so it does nothing but disable the collision:")])]),e._v(" "),t("p",[t("img",{attrs:{src:"/images/chaos_012.png",alt:""}})]),e._v(" "),t("h3",{attrs:{id:"preventing-collisions-using-collision-meshes"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#preventing-collisions-using-collision-meshes"}},[e._v("#")]),e._v(" Preventing Collisions using Collision Meshes")]),e._v(" "),t("p",[e._v("Even though we can see that the base and the weight do not collide the BaseWeightConstraint constraint\nis necessary because the base is using a simple collision volume.  Open the SM_Base mesh\nand click Show | Simple Collision, this shows that the base is using a collision volume which\nincludes the area where the weight swings:")]),e._v(" "),t("p",[t("img",{attrs:{src:"/images/chaos_019.png",alt:""}})]),e._v(" "),t("p",[e._v("An alternative to adding the BaseWeightConstraint constraint is to use the complex collision\nvolume for the base.  Click Show | Complex Collision to show the more complex and better\nfitting collision volume:")]),e._v(" "),t("p",[t("img",{attrs:{src:"/images/chaos_020.png",alt:""}})]),e._v(" "),t("p",[e._v('We can use this by changing the Collision Complexity property of the SM_Mesh to "Use Complex Collision as Simple"\nwhich will make Unreal use the complex collision volume in all cases.')]),e._v(" "),t("p",[e._v("Now when simulating the weight should pull the arm down like so:")]),e._v(" "),t("p",[t("img",{attrs:{src:"/images/chaos_018.gif",alt:""}})]),e._v(" "),t("h3",{attrs:{id:"adding-the-ramp"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#adding-the-ramp"}},[e._v("#")]),e._v(" Adding the Ramp")]),e._v(" "),t("p",[e._v("The ramp is a separate mesh which the projectile slides along when it is launched.  It is added\nby:")]),e._v(" "),t("ul",[t("li",[e._v("adding a new Static Mesh to BP_Trebuchet component")]),e._v(" "),t("li",[e._v('rename this "Ramp"')]),e._v(" "),t("li",[e._v('set its static mesh property to "SM_Ramp"')]),e._v(" "),t("li",[e._v('set its mobility property to "Static"; this will change Collision Presets to BlockAll')]),e._v(" "),t("li",[e._v("position it like this:")])]),e._v(" "),t("p",[t("img",{attrs:{src:"/images/chaos_021.png",alt:""}})]),e._v(" "),t("h3",{attrs:{id:"adding-the-projectile"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#adding-the-projectile"}},[e._v("#")]),e._v(" Adding the Projectile")]),e._v(" "),t("p",[e._v("The projectile is Sphere component.  In theory it could be a separate actor because there can be many\nprojectiles, and when they are thrown the move far away from the trebuchet, but for the purposes of learning chaos physics a component will suffice.")]),e._v(" "),t("p",[e._v("Add the projectile by:")]),e._v(" "),t("ul",[t("li",[e._v("adding a new Sphere component to BP_Trebuchet component")]),e._v(" "),t("li",[e._v('rename this "Ball"')]),e._v(" "),t("li",[e._v("set Simulate Physics to checked, this will change Collision Presets to PhysicsActor")]),e._v(" "),t("li",[e._v("set its mass to 15 kg")]),e._v(" "),t("li",[e._v("set Enable Gravity to checked")]),e._v(" "),t("li",[e._v("position it on the ramp like this:")])]),e._v(" "),t("p",[t("img",{attrs:{src:"/images/chaos_022.png",alt:""}})]),e._v(" "),t("p",[e._v("When the real trebuchet fires the arm is positioned close to the ground as shown in the\ntop picture, so rotate the arm to a similar position like this:")]),e._v(" "),t("p",[t("img",{attrs:{src:"/images/chaos_023.png",alt:""}})]),e._v(" "),t("p",[e._v("We will use a Physics Constraint to represent the connection between the arm and the ball:")]),e._v(" "),t("ul",[t("li",[e._v("add a Physics Constraint component")]),e._v(" "),t("li",[e._v('rename it "CableConstraint"')]),e._v(" "),t("li",[e._v('set Component Name 1 to "Arm"')]),e._v(" "),t("li",[e._v('set Component Name 2 to "Ball"')]),e._v(" "),t("li",[e._v('under "Constraint Behaviour" set Disable Collision to checked')]),e._v(" "),t("li",[e._v("set all the linear limits to Locked and all the angular limits to Free")]),e._v(" "),t("li",[e._v("position the constraint at the end of the arm like this:")])]),e._v(" "),t("p",[t("img",{attrs:{src:"/images/chaos_024.png",alt:""}})]),e._v(" "),t("p",[e._v("Now pressing Play in the editor should result in this motion:")]),e._v(" "),t("p",[t("img",{attrs:{src:"/images/chaos_025.gif",alt:""}})]),e._v(" "),t("h3",{attrs:{id:"releasing-the-projectile"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#releasing-the-projectile"}},[e._v("#")]),e._v(" Releasing the Projectile")]),e._v(" "),t("p",[e._v("The ball swings in the manner we want, but it remains connected to the arm.  We need to find a way to break\nthe constraint connecting the ball to the arm.  There are several ways to do this, we could for example:")]),e._v(" "),t("ul",[t("li",[e._v("break the constraint when the ball enters a certain area")]),e._v(" "),t("li",[e._v("break the constraint when the ball is travelling at a certain angle")]),e._v(" "),t("li",[e._v("break the constraint when the ball is travelling at a certain velocity")])]),e._v(" "),t("p",[e._v("We can visualize the velocity using a blueprint like this:")]),e._v(" "),t("ImageExpando",{attrs:{imagePath:e.$withBase("/images/chaos_026.png"),imageId:"BP1"}}),e._v(" "),t("p",[e._v("Assuming the trebuchet is aligned to fire down the X-axis, when the velocity in the X direction is greater than zero this blueprint will:")]),e._v(" "),t("ul",[t("li",[e._v("draw a vector representing the velocity of the ball, so a longer line represents a greater velocity")]),e._v(" "),t("li",[e._v("print the angle of the velocity at the end of each vector")])]),e._v(" "),t("p",[e._v("The output looks like this:")]),e._v(" "),t("p",[t("img",{attrs:{src:"/images/chaos_027.gif",alt:""}})]),e._v(" "),t("p",[e._v("This is the last frame:")]),e._v(" "),t("p",[t("img",{attrs:{src:"/images/chaos_028.png",alt:""}})]),e._v(" "),t("p",[e._v("If we arbitrarily decide to fire when the angle is about 45 degrees, we can calculate the angle of the projectile from the velocity, and break the constraint between the arm and the ball as soon as the angle is <= 45 degrees.")]),e._v(" "),t("p",[e._v("We update the blueprint by adding a variable to track if the constraint has been broken,\nand break the constraint the first time the angle is <= 45 degrees:")]),e._v(" "),t("ImageExpando",{attrs:{imagePath:e.$withBase("/images/chaos_029.png"),imageId:"BP2"}}),e._v(" "),t("p",[e._v("And we get this result:")]),e._v(" "),t("p",[t("img",{attrs:{src:"/images/chaos_030.gif",alt:""}})]),e._v(" "),t("h3",{attrs:{id:"references"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#references"}},[e._v("#")]),e._v(" References")]),e._v(" "),t("p",[t("a",{attrs:{href:"https://docs.unrealengine.com/5.0/en-US/add-a-custom-object-type-to-your-project-in-unreal-engine/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Custom Channels - https://docs.unrealengine.com"),t("OutboundLink")],1)])],1)}),[],!1,null,null,null);t.default=s.exports}}]);