import unreal
from pprint import pprint

# set this dir in project settings, filter python, add to additional paths
# from importlib import reload
# import make_world as MW

# reload(MW)
# MW.make_blueprint("/Game/Blueprints", "TestNN" )

def check_loaded():
    print("make_world loaded ok")


def new_level(name):
    ELL = unreal.EditorLevelLibrary()
    ELL.new_level(name)


def set_current_level(name):
    ELL = unreal.EditorLevelLibrary()
    ELL.set_current_level_by_name(name)


# https://sdm.scad.edu/faculty/mkesson/tech312/wip/best/winter2020/jafet_acevedo/personal/index.html

def buildImportTask(mesh_name, filename, destination_path ):
    task = unreal.AssetImportTask()
    task.set_editor_property('automated', True)
    task.set_editor_property('destination_name', mesh_name )
    task.set_editor_property('destination_path', destination_path)
    task.set_editor_property('filename', filename)
    task.set_editor_property('replace_existing', True)
    return task


def import_static_meshes():
    mesh_data = {
        "SM_Arm": "C:\\work\\TrebBlender\\Arm.0040_6.fbx",
        "SM_Ramp": "C:\\work\\TrebBlender\\Ramp.fbx",
        "SM_Weight": "C:\\work\\TrebBlender\\Weight.004_2.fbx",
        "SM_Base": "C:\\work\\TrebBlender\\Base.004_3.fbx"
        }

    tasks = []
    for (name, mesh_name) in mesh_data.items():
        task = buildImportTask(name, mesh_name, "/Game/Meshes")
        tasks.append(task)
    unreal.AssetToolsHelpers.get_asset_tools().import_asset_tasks(tasks)


def all_subclasses(cls):

    if cls == type:
        raise ValueError("Invalid class - 'type' is not a class")

    subclasses = set()

    stack = []
    try:
        stack.extend(cls.__subclasses__())
    except (TypeError, AttributeError) as ex:
        raise ValueError("Invalid class" + repr(cls)) from ex

    while stack:
        sub = stack.pop()
        subclasses.add(sub)
        try:
            stack.extend(sub.__subclasses__())
        except (TypeError, AttributeError):
           continue

    return list(subclasses)


def make_blueprint(package_path, asset_name):

    BFL = unreal.SubobjectDataBlueprintFunctionLibrary

    factory = unreal.BlueprintFactory()
    # this works, the saved blueprint is derived from Actor
    factory.set_editor_property("parent_class", unreal.Actor)

    factory = unreal.BlueprintFactory()
    factory.set_editor_property("parent_class", unreal.Actor)
    # make the blueprint
    asset_tools = unreal.AssetToolsHelpers.get_asset_tools()
    blueprint = asset_tools.create_asset(asset_name, package_path, None, factory)
    #
    subsystem = unreal.get_engine_subsystem(unreal.SubobjectDataSubsystem)
    # get the root data handle
    root_data_handle = subsystem.k2_gather_subobject_data_for_blueprint(blueprint)[0]

    # add sub object ARM
    sub_handle, fail_reason = subsystem.add_new_subobject(
        unreal.AddNewSubobjectParams(
            parent_handle=root_data_handle,
            new_class=unreal.StaticMeshComponent,
            blueprint_context=blueprint))
    if not fail_reason.is_empty():
        print("fail_reason", fail_reason)
        print("ERROR from sub_object_subsystem.add_new_subobject: %s" % fail_reason )
        return
    renamed = subsystem.rename_subobject( sub_handle, "Arm")
    print("renamed", renamed)

    arm = BFL.get_object(BFL.get_data(sub_handle))
    assert isinstance(arm, unreal.StaticMeshComponent)
    # Arm->SetStaticMesh(ArmMeshAsset.Object);
    arm.set_editor_property("mobility", unreal.ComponentMobility.MOVABLE )
    arm.set_editor_property("relative_location", unreal.Vector(20.000000, 57.132445, 694.646682))
    arm.set_editor_property("relative_rotation", unreal.Rotator(0.000000, 0.000000, 40.000000))
    arm.set_mass_override_in_kg(unreal.Name("NAME_None"), 505)
    arm.set_enable_gravity(True)
    arm.set_collision_profile_name("PhysicsActor")


    attached = subsystem.attach_subobject(root_data_handle, sub_handle )


def run():
    level_name = "/Game/Levels/NewLevel"

    #new_level(level_name)
    #set_current_level(level_name)
    import_static_meshes()
    make_blueprint("/Game/Blueprints", "BP_Trebuchet" )