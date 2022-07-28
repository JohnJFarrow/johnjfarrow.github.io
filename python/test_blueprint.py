import unreal

# set this dir in project settings, filter python, add to additional paths
# from importlib import reload
# import test_blueprint as MW

# reload(MW)
# MW.make_blueprint_small("Name" )

import unreal

def make_blueprint_small(asset_name):

    package_path = "/Game/Blueprints"
    factory = unreal.BlueprintFactory()
    factory.set_editor_property("parent_class", unreal.Actor)
    # make the blueprint
    asset_tools = unreal.AssetToolsHelpers.get_asset_tools()
    blueprint = asset_tools.create_asset(asset_name, package_path, None, factory)

    # get the root data handle
    subsystem = unreal.get_engine_subsystem(unreal.SubobjectDataSubsystem)
    root_data_handle = subsystem.k2_gather_subobject_data_for_blueprint(blueprint)[0]

    # add 3 static mesh components
    for i in range(3):
        # add sub object
        sub_handle, fail_reason = subsystem.add_new_subobject(
            unreal.AddNewSubobjectParams(
                parent_handle=root_data_handle,
                new_class=unreal.StaticMeshComponent,
                blueprint_context=blueprint))

        if not fail_reason.is_empty():
            print("fail_reason", fail_reason)
            print("ERROR from sub_object_subsystem.add_new_subobject: %s" % fail_reason )
            return

        attached = subsystem.attach_subobject( root_data_handle, sub_handle )
        print("attached %s" % attached )

# Add a component with Blueprint script in the editor
# Add a component to a Blueprint class from Python
