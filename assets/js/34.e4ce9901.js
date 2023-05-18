(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{316:function(e,t,s){"use strict";s.r(t);var n=s(14),a=Object(n.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",[e._v(e._s(this.$page.title))]),e._v(" "),s("h2",{attrs:{id:"introduction"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#introduction"}},[e._v("#")]),e._v(" Introduction")]),e._v(" "),s("p",[e._v("This post documents how a UObject functions in Unreal Engine\nand how the classes generated by the Unreal Header Tool (UHT) work.")]),e._v(" "),s("p",[e._v("If we create a new game project and add a c++ class which derives from ActorComponent\nwe get this:")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("UCLASS( ClassGroup=(Custom), meta=(BlueprintSpawnableComponent) )\nclass UOBJECTS_API UMyActorComponent : public UActorComponent\n{\n\tGENERATED_BODY()\n\npublic:\t\n\t// Sets default values for this component's properties\n\tUMyActorComponent();\n\nprotected:\n\t// Called when the game starts\n\tvirtual void BeginPlay() override;\n\npublic:\t\n\t// Called every frame\n\tvirtual void TickComponent(float DeltaTime, ELevelTick TickType, \n\t\tFActorComponentTickFunction* ThisTickFunction) override;\n};\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br"),s("span",{staticClass:"line-number"},[e._v("6")]),s("br"),s("span",{staticClass:"line-number"},[e._v("7")]),s("br"),s("span",{staticClass:"line-number"},[e._v("8")]),s("br"),s("span",{staticClass:"line-number"},[e._v("9")]),s("br"),s("span",{staticClass:"line-number"},[e._v("10")]),s("br"),s("span",{staticClass:"line-number"},[e._v("11")]),s("br"),s("span",{staticClass:"line-number"},[e._v("12")]),s("br"),s("span",{staticClass:"line-number"},[e._v("13")]),s("br"),s("span",{staticClass:"line-number"},[e._v("14")]),s("br"),s("span",{staticClass:"line-number"},[e._v("15")]),s("br"),s("span",{staticClass:"line-number"},[e._v("16")]),s("br"),s("span",{staticClass:"line-number"},[e._v("17")]),s("br"),s("span",{staticClass:"line-number"},[e._v("18")]),s("br")])]),s("p",[e._v("The UCLASS and GENERATED_BODY() macros are used by the Unreal header tool to generate additional code which\nsupports reflection, serialization etc. and most importantly supports using the class\nin the Unreal Editor.  It also support using the class from python, which we will\ndo below in the interest of making the examples shorter.")]),e._v(" "),s("p",[e._v("We add a member variable and use the UPROPERTY macro like so:")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("UPROPERTY(EditAnywhere, BlueprintReadWrite)\nint32 Age = 20;\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br")])]),s("p",[e._v("Now we can access the Age property in two ways, directly, or using the SetEditorProperty method:")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("// c++\nUMyActorComponent* Component = NewObject<UMyActorComponent>();\nComponent->Age = 13;\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br")])]),s("p",[e._v("or")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('# python \ncomponent = unreal.MyActorComponent();\ncomponent.age = 13;\ncomponent.set_editor_property("Age",13);\n')])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br")])]),s("p",[e._v("Using set_editor_property is the preferred way because it interacts with the\nproperty system, sending on-property-changed events and flagging the object has dirty and needing saving.")]),e._v(" "),s("h2",{attrs:{id:"class-default-objects-cdos"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#class-default-objects-cdos"}},[e._v("#")]),e._v(" Class Default Objects (CDOs)")]),e._v(" "),s("p",[e._v("A class default object is an instance of a class which is created and owned by Unreal\nand which holds the default values for the classes properties.  The class default object\nis generated when the engine starts and is sometimes recreated, for example\nif the class is a blueprint, it is recreated whenever the blueprint is recompiled.")]),e._v(" "),s("p",[e._v("The fact that the class default object is generated as part of engine initialization is important.  It means\nthat, in your object's constructor, you should not access the Engine, which might not be completely initialized, or\nthe World, which might not exist, or other object which also might not have been\ninitialized yet.  These kind of accesses are better left to other post-initialization\nstages such as BeginPlay().")]),e._v(" "),s("p",[e._v("For a non-blueprint class the values stored in the properties of  the class default object\nare set by the constructor of that class.  For a blueprint class the values\nstored in the properties of the class default object are read from the blueprint .uasset file.")]),e._v(" "),s("p",[e._v("The class default object can be used when creating\na new object - after calling the object constructor\nthe values from the class default object can be copied directly into the new object.")]),e._v(" "),s("p",[e._v("The class default object is accessed in various ways.")]),e._v(" "),s("p",[e._v("In c++ you can do this:")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("UMyActorComponent* CDO = GetMutableDefault<UMyActorComponent>();\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br")])]),s("p",[e._v("or")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("UMyActorComponent* CDO = \n     Cast<UMyActorComponent>( UMyActorComponent::StaticClass()->GetDefaultObject() );\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br")])]),s("p",[e._v("or")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("UMyActorComponent* CDO = \n    UMyActorComponent::StaticClass()->GetDefaultObject<UMyActorComponent>();\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br")])]),s("p",[e._v("and in python you can do this:")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("component = unreal.MyActorComponent();\ncdo = component.get_default_object()\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br")])]),s("p",[e._v("or")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("cdo = unreal.MyActorComponent.get_default_object()\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br")])]),s("h2",{attrs:{id:"static-classes"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#static-classes"}},[e._v("#")]),e._v(" Static Classes")]),e._v(" "),s("p",[e._v("When the Unreal header tool processes UMyActorComponent.h it generates\ncode for a UClass structure specific to  the  UMyActorComponent class.")]),e._v(" "),s("p",[e._v("This instance of UClass contains data used in the\nreflection system including data about each function\nand property of the class.")]),e._v(" "),s("p",[e._v("The static class is accessed in c++ like this:")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("UClass* MyClass = UMyActorComponent::StaticClass();\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br")])]),s("p",[e._v("and in python:")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("my_class = unreal.MyActorComponent.static_class()\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br")])]),s("p",[e._v("The static class can be used to retrieve reflection information,\nfor example the class name:")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("print(unreal.MyActorComponent().static_class().get_full_name())\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br")])]),s("blockquote",[s("p",[e._v("Class /Script/UObjects.MyActorComponent")])]),e._v(" "),s("h2",{attrs:{id:"generated-classes"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#generated-classes"}},[e._v("#")]),e._v(" Generated Classes")]),e._v(" "),s("p",[e._v("This section applies only to blueprints.")]),e._v(" "),s("p",[e._v('If we create a new blueprint derived from the Actor class, and then add a MyActorComponent component\nto it, the "age" property of that component will have the default value of 20 which we set\nin the MyActorComponent constructor in c++ and which is now in the MyActorComponent class default object.')]),e._v(" "),s("p",[e._v('If we open the new blueprint in the Unreal editor and change the value of "age" to\n25 and save the blueprint, 25 is now that default value of age which will be used\nwhen any instance of the blueprint is created (for example by dropping it on the world map).')]),e._v(" "),s("p",[e._v("In python we can load the blueprint asset like this:")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('bp =  unreal.EditorAssetSubsystem().load_asset("/Game/Blueprints/NewBlueprint")\n')])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br")])]),s("p",[e._v("The variable "),s("code",[e._v("bp")]),e._v(" now holds an object of type unreal.Blueprint - note that\nthe blueprint has a different type than the object is will create; the blueprint is an unreal.Blueprint, not\nan unreal.Actor which is the type of thing which the blueprint can create.")]),e._v(" "),s("p",[e._v("Like the MyActorComponent class, a bluepint has a static class:")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('static = unreal.EditorAssetSubsystem().load_asset("/Game/Blueprints/NewBlueprint").static_class()\n')])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br")])]),s("p",[e._v("and a class default object")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('cdo = unreal.EditorAssetSubsystem()\n   .load_asset("/Game/Blueprints/NewBlueprint").get_default_object()\n')])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br")])]),s("p",[e._v("Note that "),s("code",[e._v("unreal.EditorAssetSubsystem().load_asset")]),e._v(" returns a reference to the loaded\nasset.  If the asset is already in memory it will immediately return its address, not load it again, so there is only one instance of that loaded asset returned, so this works:")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('asset1 = unreal.EditorAssetSubsystem().load_asset("/Game/Blueprints/NewBlueprint")\nasset2 = unreal.EditorAssetSubsystem().load_asset("/Game/Blueprints/NewBlueprint")\nassert( asset1 is asset2 )\n')])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br")])]),s("p",[e._v("Blueprints also have an associated generated class.  This can be retrieved like so:")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('gen = unreal.EditorAssetSubsystem()\n   .load_asset("/Game/Blueprints/NewBlueprint").generated_class()\n')])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br")])]),s("p",[e._v("The generated class is of type BlueprintGeneratedClass. Alternatively the BlueprintGeneratedClass can be loaded directly like this:")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('gen = unreal.EditorAssetSubsystem()\n   .load_blueprint_class("/Game/Blueprints/NewBlueprint.NewBlueprint")\n')])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br")])]),s("p",[e._v("You can do things with the\nBlueprintGeneratedClass such as spawn an actor into the level like this:")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('gen = unreal.EditorAssetSubsystem()\n   .load_blueprint_class("/Game/Blueprints/NewBlueprint.NewBlueprint")\nassert isinstance(gen, unreal.BlueprintGeneratedClass )\nlocation = unreal.Vector(0, 0, 0)\nrotation = unreal.Rotator()\nunreal.EditorLevelLibrary\n   .spawn_actor_from_class(actor_class=gen, location=location, rotation=rotation)\n')])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br"),s("span",{staticClass:"line-number"},[e._v("6")]),s("br"),s("span",{staticClass:"line-number"},[e._v("7")]),s("br")])]),s("h2",{attrs:{id:"default-values-of-blueprint-components"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#default-values-of-blueprint-components"}},[e._v("#")]),e._v(" Default values of Blueprint Components")]),e._v(" "),s("p",[e._v("From a blueprint you can find its components and then find their class default objects, to get default values\nand reflection information about each component which makes up the blueprint.")]),e._v(" "),s("p",[e._v('For example we created a new blueprint "/Game/Blueprint/NewBlueprint" which contains\nour MyActorComponent component. Now we can load the blueprint and find the MyActorComponent component like so:')]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('subsystem = unreal.get_engine_subsystem(unreal.SubobjectDataSubsystem)\nblueprint = unreal.EditorAssetSubsystem().load_asset("/Game/Blueprints/NewBlueprint")\nlibrary = unreal.SubobjectDataBlueprintFunctionLibrary()\n\n# go from subobject handles -> subobjects -> component objects\n\ncomponents = [ comp for comp in \n\t\t\t\t[ library.get_object(subobject) for subobject in \n\t\t\t\t\t[ subsystem.k2_find_subobject_data_from_handle(handle) for handle in \n\t\t\t\t\t\tsubsystem.k2_gather_subobject_data_for_blueprint(context=blueprint) ] \n\t\t\t\t\t]\n\t\t\t\tif comp.get_class().get_name() == "MyActorComponent"\n\t\t\t]\n\n# we only have one component of type "MyActorComponent"\nassert( len(components) == 1 )\n\ncomponent = components[0]\n')])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br"),s("span",{staticClass:"line-number"},[e._v("6")]),s("br"),s("span",{staticClass:"line-number"},[e._v("7")]),s("br"),s("span",{staticClass:"line-number"},[e._v("8")]),s("br"),s("span",{staticClass:"line-number"},[e._v("9")]),s("br"),s("span",{staticClass:"line-number"},[e._v("10")]),s("br"),s("span",{staticClass:"line-number"},[e._v("11")]),s("br"),s("span",{staticClass:"line-number"},[e._v("12")]),s("br"),s("span",{staticClass:"line-number"},[e._v("13")]),s("br"),s("span",{staticClass:"line-number"},[e._v("14")]),s("br"),s("span",{staticClass:"line-number"},[e._v("15")]),s("br"),s("span",{staticClass:"line-number"},[e._v("16")]),s("br"),s("span",{staticClass:"line-number"},[e._v("17")]),s("br"),s("span",{staticClass:"line-number"},[e._v("18")]),s("br")])]),s("p",[e._v("From this component we  can access two different class default objects: (1) for the original MyActorComponent class\nand (2) for the blueprint component itself.  We can retrieve both of these like so:")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v('# get the default value on the MyActorComponent class\nprint(component.get_default_object().get_editor_property("age"))\n> 20\n# get the default value on the NewBlueprint blueprint\nprint(component.get_editor_property("age"))\n> 25\n')])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br"),s("span",{staticClass:"line-number"},[e._v("6")]),s("br")])]),s("h2",{attrs:{id:"references"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#references"}},[e._v("#")]),e._v(" References")]),e._v(" "),s("p",[s("a",{attrs:{href:"https://docs.unrealengine.com/5.1/en-US/objects-in-unreal-engine/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Epic Objects in Unreal Engine"),s("OutboundLink")],1),s("br"),e._v(" "),s("a",{attrs:{href:"https://1danielcoelho.github.io/unreal-engine-basics-base-classes/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Base classes"),s("OutboundLink")],1),s("br"),e._v(" "),s("a",{attrs:{href:"https://www.pythonforbeginners.com/lists/nested-list-comprehensions-in-python",target:"_blank",rel:"noopener noreferrer"}},[e._v("Python nested comprehensions"),s("OutboundLink")],1)])])}),[],!1,null,null,null);t.default=a.exports}}]);