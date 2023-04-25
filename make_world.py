import unreal
from pprint import pprint
from pathlib import Path
from typing import Tuple

# set this dir in project settings, filter python, add to additional paths
#
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


def build_options() -> unreal.FbxImportUI:
    options = unreal.FbxImportUI()
    options.set_editor_property( name='import_mesh', value=True)
    options.set_editor_property( name='import_textures', value=False)
    options.set_editor_property( name='import_materials', value=False)
    options.set_editor_property( name='import_as_skeletal', value=False)
    options.static_mesh_import_data.set_editor_property( name='import_uniform_scale', value=1.0)
    options.static_mesh_import_data.set_editor_property( name='combine_meshes', value=True)
    options.static_mesh_import_data.set_editor_property( name='auto_generate_collision', value=True )
    return options


def build_import_task(mesh_name: str,
                      filename: Path,
                      destination_path: str,
                      options: unreal.FbxImportUI ) -> unreal.AssetImportTask:
    task = unreal.AssetImportTask()
    task.set_editor_property( name='automated', value=True)
    task.set_editor_property( name='destination_name', value=mesh_name)
    task.set_editor_property( name='destination_path', value=destination_path)
    task.set_editor_property( name='filename', value=str(filename) )
    task.set_editor_property( name='replace_existing', value=True)
    task.set_editor_property( name='replace_existing_settings', value=True)
    task.set_editor_property( name='save', value=True)
    task.set_editor_property( name='options', value=options)
    return task


def import_static_meshes():
    mesh_data: dict[str, Path] = {
        "SM_Arm": Path("d:\\work\\TrebBlender\\Arm.0040_6.fbx"),
        "SM_Ramp": Path("d:\\work\\TrebBlender\\Ramp.fbx"),
        "SM_Weight": Path("d:\\work\\TrebBlender\\Weight.004_2.fbx"),
        "SM_Base": Path("d:\\work\\TrebBlender\\Base.004_3.fbx")
    }

    options: unreal.FbxImportUI = build_options()

    tasks: list[unreal.task] = [
        build_import_task(mesh_name=mesh_name, filename=path, destination_path="/Game/Meshes", options=options) for
        mesh_name, path in mesh_data.items()]

    unreal.AssetToolsHelpers.get_asset_tools().import_asset_tasks(tasks)

    # make the base use complex mesh for collision, so it does not collide with the weight

    mesh: unreal.StaticMesh = load_mesh(path="/Game/Meshes/SM_Base")
    body_setup: unreal.BodySetup = mesh.get_editor_property("body_setup")
    body_setup.set_editor_property(name="collision_trace_flag", value=unreal.CollisionTraceFlag.CTF_USE_COMPLEX_AS_SIMPLE )


def add_subobject(subsystem: unreal.SubobjectDataSubsystem,
                  blueprint: unreal.Blueprint,
                  new_class,
                  name: str ) -> Tuple[unreal.SubobjectDataHandle, unreal.Object]:

    root_data_handle: unreal.SubobjectDataHandle = subsystem.k2_gather_subobject_data_for_blueprint(context=blueprint)[0]

    sub_handle, fail_reason = subsystem.add_new_subobject(
        params=unreal.AddNewSubobjectParams(
            parent_handle=root_data_handle,
            new_class=new_class,
            blueprint_context=blueprint))
    if not fail_reason.is_empty():
        raise Exception("ERROR from sub_object_subsystem.add_new_subobject: {fail_reason}")

    subsystem.rename_subobject(handle=sub_handle, new_name=unreal.Text(name))
    # subsystem.attach_subobject(owner_handle=root_data_handle, child_to_add_handle=sub_handle)

    BFL = unreal.SubobjectDataBlueprintFunctionLibrary
    obj: object = BFL.get_object(BFL.get_data(sub_handle))
    return sub_handle, obj


def make_component_name(name: str) -> unreal.ConstrainComponentPropName:
    cc = unreal.ConstrainComponentPropName()
    cc.set_editor_property(name="component_name", value=name)
    return cc


def load_mesh(path: str) -> unreal.StaticMesh:
    EAL = unreal.EditorAssetLibrary
    asset: object = EAL.load_asset(path)
    if not isinstance(asset, unreal.StaticMesh):
        raise Exception("Failed to load StaticMesh from {path}")
    return asset


def make_blueprint(package_path: str, asset_name: str):

    PhysicsActor: unreal.Name = unreal.Name("PhysicsActor")
    BlockAll: unreal.Name = unreal.Name("BlockAll")

    factory = unreal.BlueprintFactory()
    # this works, the saved blueprint is derived from Actor
    factory.set_editor_property(name="parent_class", value=unreal.Actor)

    # make the blueprint
    asset_tools: unreal.AssetTools = unreal.AssetToolsHelpers.get_asset_tools()

    asset: object = asset_tools.create_asset(asset_name=asset_name, package_path=package_path, asset_class=None, factory=factory)
    if not isinstance(asset, unreal.Blueprint):
        raise Exception("Failed to create blueprint asset")
    blueprint: unreal.Blueprint = asset # noqa

    subsystem: unreal.SubobjectDataSubsystem = unreal.get_engine_subsystem(unreal.SubobjectDataSubsystem)

    # BASE
    base_handle, base = add_subobject(subsystem=subsystem, blueprint=blueprint, new_class=unreal.StaticMeshComponent, name="Base")
    mesh: unreal.StaticMesh = load_mesh(path="/Game/Meshes/SM_Base")
    assert isinstance(base, unreal.StaticMeshComponent)
    base.set_static_mesh(new_mesh=mesh)
    base.set_editor_property(name="mobility", value=unreal.ComponentMobility.STATIC)
    base.set_collision_profile_name(collision_profile_name=BlockAll)

    # RAMP
    sub_handle, ramp = add_subobject(subsystem=subsystem, blueprint=blueprint, new_class=unreal.StaticMeshComponent, name="Ramp")
    mesh: unreal.StaticMesh = load_mesh(path="/Game/Meshes/SM_Ramp")
    assert isinstance(ramp, unreal.StaticMeshComponent)
    ramp.set_static_mesh(new_mesh=mesh)
    ramp.set_collision_profile_name(collision_profile_name=BlockAll)
    ramp.set_editor_property(name="mobility", value=unreal.ComponentMobility.STATIC)
    ramp.set_editor_property(name="relative_location", value=unreal.Vector(0.0, 410.0, 40.0))
    subsystem.attach_subobject(owner_handle=base_handle, child_to_add_handle=sub_handle )

    # WEIGHT
    sub_handle, weight = add_subobject(subsystem=subsystem, blueprint=blueprint, new_class=unreal.StaticMeshComponent, name="Weight")
    assert isinstance(weight, unreal.StaticMeshComponent)
    mesh: unreal.StaticMesh = load_mesh(path="/Game/Meshes/SM_Weight")
    weight.set_static_mesh(new_mesh=mesh)
    weight.set_editor_property(name="mobility", value=unreal.ComponentMobility.MOVABLE)
    weight.set_editor_property(name="relative_location", value=unreal.Vector(10.0, -165.0, 640.0))
    weight.set_simulate_physics(simulate=True)
    weight.set_enable_gravity(gravity_enabled=True)
    weight.set_mass_override_in_kg(unreal.Name("NAME_None"), 4506)
    weight.set_collision_profile_name(collision_profile_name=PhysicsActor)
    subsystem.attach_subobject( base_handle, sub_handle )

    # ARM
    sub_handle, arm = add_subobject(subsystem=subsystem, blueprint=blueprint, new_class=unreal.StaticMeshComponent, name="Arm")
    mesh: unreal.StaticMesh = load_mesh(path="/Game/Meshes/SM_Arm")
    assert isinstance(arm, unreal.StaticMeshComponent)
    arm.set_static_mesh(new_mesh=mesh)
    arm.set_editor_property(name="mobility", value=unreal.ComponentMobility.MOVABLE)
    arm.set_editor_property(name="relative_location", value=unreal.Vector(20.000000, 57.132445, 694.646682))
    arm.set_editor_property(name="relative_rotation", value=unreal.Rotator(40.0, 0.0, 0.0))
    arm.set_mass_override_in_kg(unreal.Name("NAME_None"), 505)
    arm.set_enable_gravity(gravity_enabled=True)
    arm.set_simulate_physics(simulate=True)
    arm.set_collision_profile_name(collision_profile_name=PhysicsActor)
    subsystem.attach_subobject( owner_handle=base_handle, child_to_add_handle=sub_handle )

    # BALL
    sub_handle, ball = add_subobject(subsystem=subsystem, blueprint=blueprint, new_class=unreal.SphereComponent, name="Ball")
    # mesh: unreal.StaticMesh = EAL.load_asset("/Game/Meshes/SM_Arm")
    assert isinstance(ball, unreal.StaticMeshComponent)
    ball.set_editor_property(name="mobility", value=unreal.ComponentMobility.MOVABLE)
    ball.set_editor_property(name="relative_location", value=unreal.Vector(0.0, 190.0, 140.0))
    ball.set_mass_override_in_kg(unreal.Name("NAME_None"), 15)
    ball.set_simulate_physics(simulate=True)
    ball.set_enable_gravity(gravity_enabled=True)
    ball.set_collision_profile_name(collision_profile_name="PhysicsActor")
    ball.set_hidden_in_game(False)
    subsystem.attach_subobject( owner_handle=base_handle, child_to_add_handle=sub_handle )

    # component names
    # used because this
    #      arm_base.set_constrained_components(base, "Base", arm, "Arm")
    # does not work, makes the name "Base_GEN_VARIABLE"
    ccBase = make_component_name(name="Base")
    ccArm = make_component_name(name="Arm")
    ccWeight = make_component_name(name="Weight")
    ccBall = make_component_name(name="Ball")

    # ArmBaseConstraint
    sub_handle, arm_base = add_subobject(subsystem=subsystem, blueprint=blueprint, new_class=unreal.PhysicsConstraintComponent, name="ArmBaseConstraint")
    assert isinstance(arm_base, unreal.PhysicsConstraintComponent)
    arm_base.set_editor_property(name="relative_location", value=unreal.Vector(10.000000, 0.000000, 740.000000))
    arm_base.set_editor_property(name="component_name1", value=ccBase)
    arm_base.set_editor_property(name="component_name2", value=ccArm)
    arm_base.set_linear_x_limit(unreal.LinearConstraintMotion.LCM_LOCKED, 0)
    arm_base.set_linear_y_limit(unreal.LinearConstraintMotion.LCM_LOCKED, 0)
    arm_base.set_linear_z_limit(unreal.LinearConstraintMotion.LCM_LOCKED, 0)
    arm_base.set_angular_swing1_limit(unreal.AngularConstraintMotion.ACM_LOCKED, 0)
    arm_base.set_angular_swing2_limit(unreal.AngularConstraintMotion.ACM_LOCKED, 0)
    arm_base.set_angular_twist_limit(unreal.AngularConstraintMotion.ACM_FREE, 0)
    arm_base.set_disable_collision(True)
    subsystem.attach_subobject( base_handle, sub_handle )

    # ArmWeightConstraint
    sub_handle, arm_weight = add_subobject(subsystem=subsystem, blueprint=blueprint, new_class=unreal.PhysicsConstraintComponent, name="ArmWeightConstraint")
    assert isinstance(arm_weight, unreal.PhysicsConstraintComponent)
    arm_weight.set_editor_property(name="relative_location", value=unreal.Vector(15.000000, -168.000000, 883.000000))
    arm_weight.set_editor_property(name="component_name1", value=ccArm)
    arm_weight.set_editor_property(name="component_name2", value=ccWeight)
    arm_weight.set_linear_x_limit(unreal.LinearConstraintMotion.LCM_LOCKED, 0)
    arm_weight.set_linear_y_limit(unreal.LinearConstraintMotion.LCM_LOCKED, 0)
    arm_weight.set_linear_z_limit(unreal.LinearConstraintMotion.LCM_LOCKED, 0)
    arm_weight.set_angular_swing1_limit(unreal.AngularConstraintMotion.ACM_LOCKED, 0)
    arm_weight.set_angular_swing2_limit(unreal.AngularConstraintMotion.ACM_LOCKED, 0)
    arm_weight.set_angular_twist_limit(unreal.AngularConstraintMotion.ACM_FREE, 0)
    arm_weight.set_disable_collision(True)
    subsystem.attach_subobject( base_handle, sub_handle )

    # CableConstraint
    sub_handle, cable_constraint = add_subobject(subsystem=subsystem, blueprint=blueprint, new_class=unreal.PhysicsConstraintComponent, name="CableConstraint")
    assert isinstance(cable_constraint, unreal.PhysicsConstraintComponent)
    cable_constraint.set_editor_property(name="relative_location", value=unreal.Vector(14.000000, 634.000000, 210.000000))
    cable_constraint.set_editor_property(name="component_name1", value=ccArm)
    cable_constraint.set_editor_property(name="component_name2", value=ccBall)
    cable_constraint.set_linear_x_limit(unreal.LinearConstraintMotion.LCM_LOCKED, 0)
    cable_constraint.set_linear_y_limit(unreal.LinearConstraintMotion.LCM_LOCKED, 0)
    cable_constraint.set_linear_z_limit(unreal.LinearConstraintMotion.LCM_LOCKED, 0)
    cable_constraint.set_angular_swing1_limit(unreal.AngularConstraintMotion.ACM_FREE, 0)
    cable_constraint.set_angular_swing2_limit(unreal.AngularConstraintMotion.ACM_FREE, 0)
    cable_constraint.set_angular_twist_limit(unreal.AngularConstraintMotion.ACM_FREE, 0)
    cable_constraint.set_disable_collision(True)
    subsystem.attach_subobject( base_handle, sub_handle )


def spawn(package_path: str, asset_name: str):
    # spawn actor on map
    EAL = unreal.EditorAssetLibrary
    ELL = unreal.EditorLevelLibrary
    blueprint_class = EAL.load_blueprint_class( asset_path=package_path + "/" + asset_name )
    assert isinstance(blueprint_class, unreal.BlueprintGeneratedClass )
    location = unreal.Vector(0, 0, 0)
    rotation = (location - location).rotator()
    ELL.spawn_actor_from_class(actor_class=blueprint_class, location=location, rotation=rotation)


def spawn_player_start():
    # spawn actor on map
    ELL = unreal.EditorLevelLibrary
    location = unreal.Vector(2000, 0, 500)
    rotation = unreal.Rotator(0, 0, 180)
    ELL.spawn_actor_from_class( actor_class=unreal.PlayerStart, location=location, rotation=rotation)


def create_lights():
    ELL = unreal.EditorLevelLibrary
    location = unreal.Vector(2000, 0, 500)
    rotation = unreal.Rotator(0, 0, 180)

    skylight: unreal.Actor = ELL.spawn_actor_from_class( actor_class=unreal.SkyLight, location=location, rotation=rotation)
    atmos_light: unreal.Actor = ELL.spawn_actor_from_class( actor_class=unreal.DirectionalLight, location=location, rotation=rotation)
    atmos: unreal.Actor = ELL.spawn_actor_from_class( actor_class=unreal.SkyAtmosphere, location=location, rotation=rotation)
    cloud: unreal.Actor = ELL.spawn_actor_from_class( actor_class=unreal.VolumetricCloud, location=location, rotation=rotation)
    fog: unreal.Actor = ELL.spawn_actor_from_class( actor_class=unreal.ExponentialHeightFog, location=location, rotation=rotation)

    if isinstance(atmos_light, unreal.DirectionalLight):
        dlc: unreal.DirectionalLightComponent = atmos_light.get_editor_property("directional_light_component")
        dlc.set_intensity(new_intensity=400)


def create_everything():
    level_name = "/Game/Levels/NewLevel24"
    package_path = "/Game/Blueprints"
    asset_name = "BP_Trebuchet24"

    new_level(name=level_name)
    set_current_level(name=level_name)
    import_static_meshes()
    make_blueprint( package_path=package_path, asset_name=asset_name )
    spawn( package_path=package_path, asset_name=asset_name )
    spawn_player_start()
    create_lights()
