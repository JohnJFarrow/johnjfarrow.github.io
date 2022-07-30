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
# https://docs.unrealengine.com/5.0/en-US/setting-up-collisions-with-static-meshes-in-blueprints-and-python-in-unreal-engine/

def buildStaticMeshImportOptions():
    options = unreal.FbxImportUI()
    options.set_editor_property('import_mesh', True)
    options.set_editor_property('import_textures', False)
    options.set_editor_property('import_materials', False)
    options.set_editor_property('import_as_skeletal', False)
    options.static_mesh_import_data.set_editor_property('import_uniform_scale', 1.0)
    options.static_mesh_import_data.set_editor_property('combine_meshes', True)
    options.static_mesh_import_data.set_editor_property('generate_lightmap_u_vs', False)
    options.static_mesh_import_data.set_editor_property('auto_generate_collision', True )
    return options


def buildImportTask(mesh_name, filename, destination_path, options):
    task = unreal.AssetImportTask()
    task.set_editor_property('automated', True)
    task.set_editor_property('destination_name', mesh_name)
    task.set_editor_property('destination_path', destination_path)
    task.set_editor_property('filename', filename)
    task.set_editor_property('replace_existing', True)
    task.set_editor_property('replace_existing_settings', True)
    task.set_editor_property('save', True)
    task.set_editor_property('options', options)
    return task


def import_static_meshes():
    mesh_data = {
        "SM_Arm": "C:\\work\\TrebBlender\\Arm.0040_6.fbx",
        "SM_Ramp": "C:\\work\\TrebBlender\\Ramp.fbx",
        "SM_Weight": "C:\\work\\TrebBlender\\Weight.004_2.fbx",
        "SM_Base": "C:\\work\\TrebBlender\\Base.004_3.fbx"
    }

    options = buildStaticMeshImportOptions()

    tasks = []
    for (name, mesh_name) in mesh_data.items():
        task = buildImportTask(name, mesh_name, "/Game/Meshes", options)
        tasks.append(task)
    unreal.AssetToolsHelpers.get_asset_tools().import_asset_tasks(tasks)

    # make the base use complex mesh for collision, so it does not collide with the weight
    EAL = unreal.EditorAssetLibrary
    mesh = EAL.load_asset("/Game/Meshes/SM_Base")
    assert isinstance(mesh, unreal.StaticMesh)
    body_setup = mesh.get_editor_property("body_setup")
    body_setup.set_editor_property("collision_trace_flag", unreal.CollisionTraceFlag.CTF_USE_COMPLEX_AS_SIMPLE )

def add_subobject(subsystem, blueprint, new_class, name):

    root_data_handle = subsystem.k2_gather_subobject_data_for_blueprint(blueprint)[0]

    sub_handle, fail_reason = subsystem.add_new_subobject(
        unreal.AddNewSubobjectParams(
            parent_handle=root_data_handle,
            new_class=new_class,
            blueprint_context=blueprint))
    if not fail_reason.is_empty():
        print("fail_reason", fail_reason)
        print("ERROR from sub_object_subsystem.add_new_subobject: %s" % fail_reason)
        return None

    subsystem.rename_subobject(sub_handle, name)

    subsystem.attach_subobject(root_data_handle, sub_handle)

    BFL = unreal.SubobjectDataBlueprintFunctionLibrary
    obj = BFL.get_object(BFL.get_data(sub_handle))
    return sub_handle, obj


def make_component_name(name):
    cc = unreal.ConstrainComponentPropName()
    cc.set_editor_property("component_name", name)
    return cc


def make_blueprint(package_path, asset_name):
    EAL = unreal.EditorAssetLibrary

    factory = unreal.BlueprintFactory()
    # this works, the saved blueprint is derived from Actor
    factory.set_editor_property("parent_class", unreal.Actor)

    # make the blueprint
    asset_tools = unreal.AssetToolsHelpers.get_asset_tools()
    blueprint = asset_tools.create_asset(asset_name, package_path, None, factory)
    #
    subsystem = unreal.get_engine_subsystem(unreal.SubobjectDataSubsystem)

    # BASE
    base_handle, base = add_subobject(subsystem, blueprint, unreal.StaticMeshComponent, "Base")
    mesh = EAL.load_asset("/Game/Meshes/SM_Base")
    assert isinstance(base, unreal.StaticMeshComponent)
    assert isinstance(mesh, unreal.StaticMesh)
    base.set_static_mesh(mesh)
    base.set_editor_property("mobility", unreal.ComponentMobility.STATIC)
    base.set_collision_profile_name("BlockAll")

    # RAMP
    sub_handle, ramp = add_subobject(subsystem, blueprint, unreal.StaticMeshComponent, "Ramp")
    mesh = EAL.load_asset("/Game/Meshes/SM_Ramp")
    assert isinstance(ramp, unreal.StaticMeshComponent)
    assert isinstance(mesh, unreal.StaticMesh)
    ramp.set_static_mesh(mesh)
    ramp.set_collision_profile_name("BlockAll")
    ramp.set_editor_property("mobility", unreal.ComponentMobility.STATIC)
    ramp.set_editor_property("relative_location", unreal.Vector(0.0, 410.0, 40.0))
    subsystem.attach_subobject( base_handle, sub_handle )

    # WEIGHT
    sub_handle, weight = add_subobject(subsystem, blueprint, unreal.StaticMeshComponent, "Weight")
    assert isinstance(weight, unreal.StaticMeshComponent)
    assert isinstance(mesh, unreal.StaticMesh)
    mesh = EAL.load_asset("/Game/Meshes/SM_Weight")
    weight.set_static_mesh(mesh)
    weight.set_editor_property("mobility", unreal.ComponentMobility.MOVABLE)
    weight.set_editor_property("relative_location", unreal.Vector(10.0, -165.0, 640.0))
    weight.set_simulate_physics(True)
    weight.set_enable_gravity(True)
    weight.set_mass_override_in_kg(unreal.Name("NAME_None"), 4506)
    weight.set_collision_profile_name("PhysicsActor")
    subsystem.attach_subobject( base_handle, sub_handle )

    # ARM
    sub_handle, arm = add_subobject(subsystem, blueprint, unreal.StaticMeshComponent, "Arm")
    mesh = EAL.load_asset("/Game/Meshes/SM_Arm")
    assert isinstance(arm, unreal.StaticMeshComponent)
    assert isinstance(mesh, unreal.StaticMesh)
    arm.set_static_mesh(mesh)
    arm.set_editor_property("mobility", unreal.ComponentMobility.MOVABLE)
    arm.set_editor_property("relative_location", unreal.Vector(20.000000, 57.132445, 694.646682))
    arm.set_editor_property("relative_rotation", unreal.Rotator(40.0, 0.0, 0.0))
    arm.set_mass_override_in_kg(unreal.Name("NAME_None"), 505)
    arm.set_enable_gravity(True)
    arm.set_simulate_physics(True)
    arm.set_collision_profile_name("PhysicsActor")
    subsystem.attach_subobject( base_handle, sub_handle )

    # BALL
    sub_handle, ball = add_subobject(subsystem, blueprint, unreal.SphereComponent, "Ball")
    # mesh = EAL.load_asset("/Game/Meshes/SM_Arm")
    assert isinstance(arm, unreal.StaticMeshComponent)
    # assert isinstance(mesh, unreal.StaticMesh)
    # arm.set_static_mesh(mesh)
    ball.set_editor_property("mobility", unreal.ComponentMobility.MOVABLE)
    ball.set_editor_property("relative_location", unreal.Vector(0.0, 190.0, 140.0))
    ball.set_mass_override_in_kg(unreal.Name("NAME_None"), 15)
    ball.set_simulate_physics(True)
    ball.set_enable_gravity(True)
    ball.set_collision_profile_name("PhysicsActor")
    ball.set_hidden_in_game(False)
    subsystem.attach_subobject( base_handle, sub_handle )

    # component names
    # used because this
    #      arm_base.set_constrained_components(base, "Base", arm, "Arm")
    # does not work, makes the name "Base_GEN_VARIABLE"
    ccBase = make_component_name("Base")
    ccArm = make_component_name("Arm")
    ccWeight = make_component_name("Weight")
    ccBall = make_component_name("Ball")

    # ArmBaseConstraint
    sub_handle, arm_base = add_subobject(subsystem, blueprint, unreal.PhysicsConstraintComponent, "ArmBaseConstraint")
    assert isinstance(arm_base, unreal.PhysicsConstraintComponent)
    arm_base.set_editor_property("relative_location", unreal.Vector(10.000000, 0.000000, 740.000000))
    arm_base.set_editor_property("component_name1", ccBase)
    arm_base.set_editor_property("component_name2", ccArm)
    arm_base.set_linear_x_limit(unreal.LinearConstraintMotion.LCM_LOCKED, 0)
    arm_base.set_linear_y_limit(unreal.LinearConstraintMotion.LCM_LOCKED, 0)
    arm_base.set_linear_z_limit(unreal.LinearConstraintMotion.LCM_LOCKED, 0)
    arm_base.set_angular_swing1_limit(unreal.AngularConstraintMotion.ACM_LOCKED, 0)
    arm_base.set_angular_swing2_limit(unreal.AngularConstraintMotion.ACM_LOCKED, 0)
    arm_base.set_angular_twist_limit(unreal.AngularConstraintMotion.ACM_FREE, 0)
    arm_base.set_disable_collision(True)
    subsystem.attach_subobject( base_handle, sub_handle )

    # ArmWeightConstraint
    sub_handle, arm_weight = add_subobject(subsystem, blueprint, unreal.PhysicsConstraintComponent, "ArmWeightConstraint")
    assert isinstance(arm_weight, unreal.PhysicsConstraintComponent)
    arm_weight.set_editor_property("relative_location", unreal.Vector(15.000000, -168.000000, 883.000000))
    arm_weight.set_editor_property("component_name1", ccArm)
    arm_weight.set_editor_property("component_name2", ccWeight)
    arm_weight.set_linear_x_limit(unreal.LinearConstraintMotion.LCM_LOCKED, 0)
    arm_weight.set_linear_y_limit(unreal.LinearConstraintMotion.LCM_LOCKED, 0)
    arm_weight.set_linear_z_limit(unreal.LinearConstraintMotion.LCM_LOCKED, 0)
    arm_weight.set_angular_swing1_limit(unreal.AngularConstraintMotion.ACM_LOCKED, 0)
    arm_weight.set_angular_swing2_limit(unreal.AngularConstraintMotion.ACM_LOCKED, 0)
    arm_weight.set_angular_twist_limit(unreal.AngularConstraintMotion.ACM_FREE, 0)
    arm_weight.set_disable_collision(True)
    subsystem.attach_subobject( base_handle, sub_handle )

    # CableConstraint
    sub_handle, cable_constraint = add_subobject(subsystem, blueprint, unreal.PhysicsConstraintComponent, "CableConstraint")
    assert isinstance(cable_constraint, unreal.PhysicsConstraintComponent)
    cable_constraint.set_editor_property("relative_location", unreal.Vector(14.000000, 634.000000, 210.000000))
    cable_constraint.set_editor_property("component_name1", ccArm)
    cable_constraint.set_editor_property("component_name2", ccBall)
    cable_constraint.set_linear_x_limit(unreal.LinearConstraintMotion.LCM_LOCKED, 0)
    cable_constraint.set_linear_y_limit(unreal.LinearConstraintMotion.LCM_LOCKED, 0)
    cable_constraint.set_linear_z_limit(unreal.LinearConstraintMotion.LCM_LOCKED, 0)
    cable_constraint.set_angular_swing1_limit(unreal.AngularConstraintMotion.ACM_FREE, 0)
    cable_constraint.set_angular_swing2_limit(unreal.AngularConstraintMotion.ACM_FREE, 0)
    cable_constraint.set_angular_twist_limit(unreal.AngularConstraintMotion.ACM_FREE, 0)
    cable_constraint.set_disable_collision(True)
    subsystem.attach_subobject( base_handle, sub_handle )


def spawn(package_path, asset_name):
    # spawn actor on map
    EAL = unreal.EditorAssetLibrary
    ELL = unreal.EditorLevelLibrary
    blueprint_class = EAL.load_blueprint_class( package_path + "/" + asset_name )
    assert isinstance(blueprint_class, unreal.BlueprintGeneratedClass )
    location = unreal.Vector(0, 0, 0)
    rotation = (location - location).rotator()
    actor = ELL.spawn_actor_from_class(blueprint_class, location, rotation)


def spawn_player_start():
    # spawn actor on map
    EAL = unreal.EditorAssetLibrary
    ELL = unreal.EditorLevelLibrary
    location = unreal.Vector(2000, 0, 500)
    rotation = unreal.Rotator(0, 0, 180)
    actor = ELL.spawn_actor_from_class( unreal.PlayerStart, location, rotation)


def run():
    level_name = "/Game/Levels/NewLevel21"
    new_level(level_name)
    set_current_level(level_name)
    import_static_meshes()

    package_path = "/Game/Blueprints"
    asset_name = "BP_Trebuchet20"
    make_blueprint( package_path, asset_name )
    spawn( package_path, asset_name )
    # make player start look at actor ?

