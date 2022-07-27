import unreal


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


def make_blueprint(asset_name, package_path):
    factory = unreal.BlueprintFactory()
    factory.set_editor_property("parent_class", unreal.Actor)

    asset_tools = unreal.AssetToolsHelpers.get_asset_tools()
    blueprint = asset_tools.create_asset(asset_name, package_path, None, factory)
    print(blueprint)


def run():
    level_name = "/Game/Levels/NewLevel"

    #new_level(level_name)
    #set_current_level(level_name)
    #import_static_meshes()
    make_blueprint("BP_Trebuchet", "/Game/Blueprints")




