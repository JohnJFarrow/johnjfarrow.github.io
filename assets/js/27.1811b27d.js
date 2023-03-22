(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{307:function(t,a,s){"use strict";s.r(a);var n=s(14),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",[t._v(t._s(this.$page.title))]),t._v(" "),s("h2",{attrs:{id:"introduction"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#introduction"}},[t._v("#")]),t._v(" Introduction")]),t._v(" "),s("p",[t._v("This post is about creating a new Blueprint node in c++ to rotate an Actor object around\na pivot point.")]),t._v(" "),s("p",[t._v("The image below shows a mesh (called SM_Arm) that was imported into Unreal from\na FBX file generated in Blender.")]),t._v(" "),s("p",[s("img",{attrs:{src:"/images/rotn_001.png",alt:""}})]),t._v(" "),s("p",[t._v("The gizmo on the left is at the position of a socket.  The red, green and blue lines near the middle\nindicate the origin of the mesh, which is where the origin was in the Blender model.")]),t._v(" "),s("p",[t._v("We create a new blueprint actor, add a Static Mesh component, and\nset the mesh to SM_Arm.  If we place this actor in the world,\nselect it in the outliner, and press E to rotate it, the rotation gizmo (which\nindicates the pivot point around which it will rotate) is\npositioned on the origin of the SM_Arm mesh:")]),t._v(" "),s("p",[s("img",{attrs:{src:"/images/rotn_002.png",alt:""}})]),t._v(" "),s("h2",{attrs:{id:"manual-rotation"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#manual-rotation"}},[t._v("#")]),t._v(" Manual Rotation")]),t._v(" "),s("p",[t._v("If we want to manually rotate around the socket position, we can use ALT-middle-mouse-click\nto temporarily move the pivot point like so:")]),t._v(" "),s("p",[s("img",{attrs:{src:"/images/rotn_003.png",alt:""}})]),t._v(" "),s("p",[t._v("Once we have applied a rotation the pivot point will return to the original position.")]),t._v(" "),s("h2",{attrs:{id:"blueprint-rotation"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#blueprint-rotation"}},[t._v("#")]),t._v(" Blueprint Rotation")]),t._v(" "),s("h3",{attrs:{id:"header-file"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#header-file"}},[t._v("#")]),t._v(" Header File")]),t._v(" "),s("p",[t._v("No existing single blueprint node supports rotating an actor around a specified pivot point, so as an\nexercise I decided to write one.")]),t._v(" "),s("p",[t._v("A blueprint node can be implemented as a static function on a c++ class which is derived from\nthe UBlueprintFunctionLibrary class.  To create such a node use the "),s("code",[t._v("Tools | New C++ Class")]),t._v(' menu option and create a class\nderived from UBlueprintFunctionLibrary.  In this example the new class is called "UtilityFunctionLibrary".')]),t._v(" "),s("p",[t._v("Unreal will create the header and implementation files.  The header looks like this:")]),t._v(" "),s("div",{staticClass:"language-cpp line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[s("span",{pre:!0,attrs:{class:"token macro property"}},[s("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),s("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("pragma")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token expression"}},[t._v("once")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token macro property"}},[s("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),s("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("include")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"CoreMinimal.h"')])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token macro property"}},[s("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),s("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("include")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Kismet/BlueprintFunctionLibrary.h"')])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token macro property"}},[s("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),s("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("include")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"UtilityFunctionLibrary.generated.h"')])]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("UCLASS")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MYPROJECT8_API")]),t._v(" UUtilityFunctionLibrary "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" UBlueprintFunctionLibrary\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("GENERATED_BODY")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br")])]),s("p",[t._v("There are no methods on the new class.  We can add one like so:")]),t._v(" "),s("div",{staticClass:"language-cpp line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[s("span",{pre:!0,attrs:{class:"token macro property"}},[s("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),s("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("pragma")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token expression"}},[t._v("once")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token macro property"}},[s("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),s("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("include")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"CoreMinimal.h"')])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token macro property"}},[s("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),s("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("include")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Kismet/BlueprintFunctionLibrary.h"')])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token macro property"}},[s("span",{pre:!0,attrs:{class:"token directive-hash"}},[t._v("#")]),s("span",{pre:!0,attrs:{class:"token directive keyword"}},[t._v("include")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"UtilityFunctionLibrary.generated.h"')])]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("UCLASS")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MYPROJECT8_API")]),t._v(" UUtilityFunctionLibrary "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" UBlueprintFunctionLibrary\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("GENERATED_BODY")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n\t"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("UFUNCTION")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("BlueprintCallable"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Category "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Utility"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("RotateActorAroundPivot")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v(" \n\t\tAActor"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" Actor"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" FVector"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v(" PivotLocation"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" FRotator"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&")]),t._v(" DeltaRotation "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\t\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br"),s("span",{staticClass:"line-number"},[t._v("15")]),s("br"),s("span",{staticClass:"line-number"},[t._v("16")]),s("br")])]),s("p",[t._v("The new function RotateActorAroundPivot takes as parameters the actor object we want to rotate, the pivot point\nwe want to rotate it around, and the size of the rotation.")]),t._v(" "),s("h3",{attrs:{id:"ufunction-declaration"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#ufunction-declaration"}},[t._v("#")]),t._v(" UFUNCTION Declaration")]),t._v(" "),s("p",[t._v("There are a couple of improvements we can make to the declaration of the RotateActorAroundPivot function, which currently\nlooks like this:")]),t._v(" "),s("p",[s("img",{attrs:{src:"/images/rotn_004.png",alt:""}})]),t._v(" "),s("ul",[s("li",[t._v('we can make the Actor parameter default to "self", which is the actor which this blueprint is a part of, by adding '),s("code",[t._v('meta = (DefaultToSelf = "Actor")')]),t._v("\nto the UFUNCTION declaration")]),t._v(" "),s("li",[t._v("we can make the node easier to use by making the parameters optional (so they will be replaced by default values), by making them values, not references.")])]),t._v(" "),s("p",[t._v("The updated declaration looks this this:")]),t._v(" "),s("div",{staticClass:"language-cpp line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("UFUNCTION")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("BlueprintCallable"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Category "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Utility"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" meta "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("DefaultToSelf "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Actor"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("RotateActorAroundPivot")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n\tAActor"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" Actor"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" FVector PivotLocation"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" FRotator DeltaRotation"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br")])]),s("p",[t._v("and the node now looks like this:")]),t._v(" "),s("p",[s("img",{attrs:{src:"/images/rotn_005.png",alt:""}})]),t._v(" "),s("h3",{attrs:{id:"implementation"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#implementation"}},[t._v("#")]),t._v(" Implementation")]),t._v(" "),s("p",[t._v("The implementation of the node contains the maths operations needed to rotate the actor around the pivot point:")]),t._v(" "),s("div",{staticClass:"language-cpp line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-cpp"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("UUtilityFunctionLibrary")]),s("span",{pre:!0,attrs:{class:"token double-colon punctuation"}},[t._v("::")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("RotateActorAroundPivot")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n\tAActor"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("*")]),t._v(" Actor"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" FVector PivotLocation"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" FRotator DeltaRotation"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("Actor"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\tActor"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("AddActorWorldRotation")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("DeltaRotation"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\tFVector NewActorLocation "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Actor"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("GetActorLocation")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\tNewActorLocation "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-=")]),t._v(" PivotLocation"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\tNewActorLocation "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" \n\t   "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("FRotationMatrix")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("DeltaRotation"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("TransformPosition")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("NewActorLocation"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\tNewActorLocation "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+=")]),t._v(" PivotLocation"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\tNewActorLocation "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-=")]),t._v(" Actor"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("GetActorLocation")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\tActor"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("->")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("AddActorWorldOffset")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("NewActorLocation"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br"),s("span",{staticClass:"line-number"},[t._v("5")]),s("br"),s("span",{staticClass:"line-number"},[t._v("6")]),s("br"),s("span",{staticClass:"line-number"},[t._v("7")]),s("br"),s("span",{staticClass:"line-number"},[t._v("8")]),s("br"),s("span",{staticClass:"line-number"},[t._v("9")]),s("br"),s("span",{staticClass:"line-number"},[t._v("10")]),s("br"),s("span",{staticClass:"line-number"},[t._v("11")]),s("br"),s("span",{staticClass:"line-number"},[t._v("12")]),s("br"),s("span",{staticClass:"line-number"},[t._v("13")]),s("br"),s("span",{staticClass:"line-number"},[t._v("14")]),s("br"),s("span",{staticClass:"line-number"},[t._v("15")]),s("br")])]),s("p",[t._v("This code is very substantially based on the code the editor uses to implement manual rotation.")]),t._v(" "),s("h3",{attrs:{id:"usage"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#usage"}},[t._v("#")]),t._v(" Usage")]),t._v(" "),s("p",[t._v("This blueprint shows an example usage:")]),t._v(" "),s("ImageExpando",{attrs:{imagePath:t.$withBase("/images/rotn_006.png"),imageId:"BP2"}}),t._v(" "),s("p",[t._v("Every tick it:")]),t._v(" "),s("ul",[s("li",[t._v("multiplies the tick duration by a factor (the Rotation Step variable) to calculate a rotation amount")]),t._v(" "),s("li",[t._v("finds the location of the named socket on the Static Mesh component of the actor")]),t._v(" "),s("li",[t._v("and rotates the actor around the position of that socket.")])]),t._v(" "),s("p",[t._v("(This does not need sockets to work, the pivot location could come from anywhere.)")]),t._v(" "),s("p",[t._v("If the socket name is left blank, so the socket location is (0,0,0), the mesh rotates around its origin like so:")]),t._v(" "),s("p",[s("img",{attrs:{src:"/images/rotn_020.gif",alt:""}})]),t._v(" "),s("p",[t._v("Whereas if a socket is chosen which is on the narrow end of the arm mesh, the rotation is like this:")]),t._v(" "),s("p",[s("img",{attrs:{src:"/images/rotn_021.gif",alt:""}})])],1)}),[],!1,null,null,null);a.default=e.exports}}]);