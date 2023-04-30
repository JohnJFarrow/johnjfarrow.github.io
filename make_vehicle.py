import sys
import os
import urllib.request
import traceback
import unreal
import tempfile
from pprint import pprint
from pathlib import Path
from typing import Tuple, cast, Optional, Type, TypeVar
import collections
from collections.abc import Sequence, MutableSequence
from collections import OrderedDict


from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from _typeshed import OptExcInfo
    
from types import TracebackType

# set this dir (D:\work\github.io\vuepress\.vuepress\public) in project settings, filter python, add to additional paths
#
# from importlib import reload
# import make_vehicle as MW
# reload(MW)
# MW.create_everything()

class AssetPath:
    asset_name:str 
    folder:str
    exists:bool = False
    
    def asset_path(self) -> str:
        # make the complete path
        return self.folder + "/" + self.asset_name; 

    def blueprint_class_name(self) -> str:
        # make /Game/Blueprints/FrontWheel1.FrontWheel1_C    
        return self.folder + "/" + self.asset_name + "." + self.asset_name + "_C"


def check_loaded():
    path: str = __file__
    unreal.log( f"{path} loaded ok")

def asset_exists(
    package_path: str,
    name: str ) -> bool:
    EAL = unreal.EditorAssetLibrary()
    return EAL.does_asset_exist( package_path + "/" + name)

def asset_exists1( asset_path: str ) -> bool:
    EAL = unreal.EditorAssetLibrary()
    return EAL.does_asset_exist( asset_path )

def make_unique_asset_name(
    package_path: str,
    name: str ) -> str:

    AT = unreal.AssetToolsHelpers.get_asset_tools()
    suffix:str = ""

    package_name, asset_name = AT.create_unique_asset_name(package_path + "/" + name, suffix )
    # package_name is the full path  "/Game/Levels/NewLevel57"
    # asset_name is just the end bit "NewLevel57"
    return asset_name

def make_unique_asset_name1( asset_path: str ) -> str:

    AT = unreal.AssetToolsHelpers.get_asset_tools()
    suffix:str = ""

    package_name, asset_name = AT.create_unique_asset_name(  base_package_name=asset_path, suffix=suffix )
    # package_name is the full path  "/Game/Levels/NewLevel57"
    # asset_name is just the end bit "NewLevel57"
    return asset_name

def make_unique_asset_name_old(
    package_path: str,
    name: str ) -> str:
    # given a new level or blueprint name, if it already exists
    # allocate a new name by adding a counter 
    EAL = unreal.EditorAssetLibrary()

    if not EAL.does_asset_exist( package_path + "/" + name):
        return name

    # start adding number to name
    num: int = 1
    while True:
        modified_name: str = name + str(num)
        if not EAL.does_asset_exist(package_path + "/" + modified_name):
            return modified_name

        num = num + 1

def make_new_level(
    package_path:str, 
    name: str ) -> str:
    # make a new level with given name, if it already exists
    # allocate a new name
    inname:str = name
    LES = unreal.LevelEditorSubsystem()
    name = make_unique_asset_name(package_path = package_path, name=name )
    unreal.log(f"package path {package_path} inname {inname} unique name {name}")
    LES.new_level( package_path + "/" + name)
    return name
 

def set_current_level(name):
    ELL = unreal.EditorLevelLibrary()
    ELL.set_current_level_by_name(name)


def build_fbx_import_options() -> unreal.FbxImportUI:
    options = unreal.FbxImportUI()
    options.set_editor_property( name='import_mesh', value=True)
    options.set_editor_property( name='import_textures', value=False)
    options.set_editor_property( name='import_materials', value=False)
    options.set_editor_property( name='import_as_skeletal', value=False)
    options.static_mesh_import_data.set_editor_property( name='import_uniform_scale', value=1.0)
    options.static_mesh_import_data.set_editor_property( name='combine_meshes', value=True)
    options.static_mesh_import_data.set_editor_property( name='auto_generate_collision', value=True )
    return options

def build_fbx_skeletal_import_options() -> unreal.FbxImportUI:
    options = unreal.FbxImportUI()
    options.reset_to_default()
    options.import_materials = False
    options.create_physics_asset = True
    options.import_as_skeletal = True
    options.mesh_type_to_import = unreal.FBXImportType.FBXIT_SKELETAL_MESH
    
    options.static_mesh_import_data.combine_meshes = True
    options.static_mesh_import_data.convert_scene = True    
    return options


def build_import_task(mesh_name: str,
                      filename: Path,
                      destination_path: str,
                      options: unreal.FbxImportUI ) -> unreal.AssetImportTask:
    task = unreal.AssetImportTask()
    task.set_editor_property( name='automated', value=False)
    task.set_editor_property( name='destination_name', value=mesh_name)
    task.set_editor_property( name='destination_path', value=destination_path)
    task.set_editor_property( name='filename', value=str(filename) )
    task.set_editor_property( name='replace_existing', value=True)
    task.set_editor_property( name='replace_existing_settings', value=True)
    task.set_editor_property( name='save', value=True)
    task.set_editor_property( name='options', value=options)
    return task

def build_fbx_skeletal_import_task(mesh_name: str,
                      filename: Path,
                      destination_path: str,
                      options: unreal.FbxImportUI ) -> unreal.AssetImportTask:
    task = unreal.AssetImportTask()
    task.automated = True
    task.destination_name = mesh_name
    task.destination_path = destination_path
    task.filename = str(filename)
    task.replace_existing = True
    task.replace_existing_settings = True
    task.save = True
    task.options = options
    return task



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
        raise Exception(f"ERROR from sub_object_subsystem.add_new_subobject: {fail_reason}")

    subsystem.rename_subobject(handle=sub_handle, new_name=unreal.Text(name))

    BFL = unreal.SubobjectDataBlueprintFunctionLibrary()
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

def spawn(package_path: str, asset_name: str):
    # spawn actor on map
    EAL = unreal.EditorAssetLibrary
    ELL = unreal.EditorLevelLibrary
    blueprint_class = EAL.load_blueprint_class( asset_path=package_path + "/" + asset_name )
    assert isinstance(blueprint_class, unreal.BlueprintGeneratedClass )
    location = unreal.Vector(0, 0, 0)
    rotation = (location - location).rotator() #type:ignore
    ELL.spawn_actor_from_class(actor_class=blueprint_class, location=location, rotation=rotation)


def spawn_player_start():
    # spawn actor on map
    ELL = unreal.EditorLevelLibrary
    location = unreal.Vector(2000, 0, 500)
    rotation = unreal.Rotator(0, 0, 180)
    ELL.spawn_actor_from_class( actor_class=cast(unreal.Class,unreal.PlayerStart), location=location, rotation=rotation)


def check_plugins_loaded():
    # need 
    #  "Python Editor Script Plugin"
    #  "Editor Scripting Utilities"
    #  "Chaos Vehicle Plugin"
    pass 

def resolve_asset_name(
    asset_path: str,
    overwrite: bool,
    make_unique_name: bool
    ) -> AssetPath:

    ap:AssetPath = AssetPath()
    ap.exists = asset_exists1( asset_path=asset_path )

    parts: tuple[str,str,str] = asset_path.rpartition("/")
    ap.folder=parts[0]

    if ( not ap.exists or overwrite ) and not make_unique_name:
        ap.asset_name=parts[2]
    else:
        if make_unique_name:
            ap.asset_name = make_unique_asset_name1( asset_path=asset_path )
            ap.exists = False
        else:
            raise ValueError( f"Cannot overwrite existing blueprint {asset_path}")

    return ap    

def create_wheel_blueprint(
    asset_path: str,
    overwrite: bool = False,
    make_unique_name: bool = True,
    axle_type: unreal.AxleType = unreal.AxleType.REAR,
    wheel_radius: float = 30,
    affected_by_handbrake: bool = False,
    affected_by_engine: bool = False,
    affected_by_steering: bool = False,
    max_steer_angle: float = 40, 
    wheel_width:float = 20,
    verbose: bool = True ) -> str:

    EAS: unreal.EditorAssetSubsystem = unreal.EditorAssetSubsystem()
    EAL: unreal.EditorAssetLibrary = unreal.EditorAssetLibrary()
    asset_tools: unreal.AssetTools = unreal.AssetToolsHelpers.get_asset_tools()

    asset: object = None
    ap:AssetPath = resolve_asset_name( asset_path=asset_path, overwrite=overwrite, make_unique_name=make_unique_name )
    
    if ap.exists:
        if verbose:
            unreal.log(f"updating wheel blueprint {ap.asset_path()}")
        asset = EAS.load_asset( asset_path=ap.asset_path() )
    else:
        if verbose:
            unreal.log(f"creating wheel blueprint {ap.asset_path()}")
            
        factory: unreal.BlueprintFactory = unreal.BlueprintFactory()
        factory.set_editor_property(name="parent_class", value=unreal.ChaosVehicleWheel )
        
        asset = asset_tools.create_asset(
                        asset_name=ap.asset_name, 
                        package_path=ap.folder, 
                        asset_class=None, 
                        factory=factory )

    if not isinstance(asset, unreal.Blueprint):
        raise Exception("Failed to create blueprint asset")

    class_name:str = ap.blueprint_class_name()
    blueprint_class = unreal.load_object( outer=None, name=class_name )
    
    if verbose:
        unreal.log(f"setting values for blueprint class {class_name}")

    wheel = unreal.get_default_object(blueprint_class)

    wheel.set_editor_property(name="affected_by_brake", value=True)
    wheel.set_editor_property(name="affected_by_handbrake", value=affected_by_handbrake)
    wheel.set_editor_property(name="affected_by_engine", value=affected_by_engine)
    wheel.set_editor_property(name="affected_by_steering", value=affected_by_steering)
    wheel.set_editor_property(name="max_steer_angle", value=max_steer_angle)
    wheel.set_editor_property(name="axle_type", value=axle_type)
    wheel.set_editor_property(name="wheel_radius", value=wheel_radius)
    wheel.set_editor_property(name="wheel_width", value=wheel_width)
    
    EAL.save_asset( asset_to_save=ap.asset_path(), only_if_is_dirty=False )

    return ap.asset_path()
    
def save_curve_data_to_temp_csv_file(
    points: OrderedDict[ float,float ]
) -> str:

    file_name = os.path.join(tempfile.mkdtemp(), 'curve.csv')

    with open( file=file_name, mode="w" ) as f:
        for t in points:
            x:float = t
            y:float = points[t]
            f.write( f"{x},{y}\n")
   
    return file_name

def download(
    url: str
) -> str:

    # download a file to a temp file and return the new name
    if not url.startswith("http"):
        return url

    basename = url.split('/')[-1]
    temp_file_name = os.path.join(tempfile.mkdtemp(), basename )
    
    urllib.request.urlretrieve( url, temp_file_name)
   
    return temp_file_name

def create_engine_torque_curve(
    asset_path: str,
    overwrite: bool = False,
    verbose: bool = True,
    make_unique_name: bool = False
    ) -> tuple[str, float, float]:

    ap:AssetPath = resolve_asset_name( asset_path=asset_path, overwrite=overwrite, make_unique_name=make_unique_name )
    
    curve: object = None
    
    print("create_engine_torque_curve asset_name", ap.asset_name, "exists", ap.exists )
    
    # seems there is no way to update a CurveFloat object in python, so save the data
    # to a csv file and import it into the curve
    # copied from the SportsCar example to check cars behave the same
    points: OrderedDict[ float,float ] = OrderedDict( {
        ( 1000.0, 0.5 ),
        ( 1800.0, 0.9 ),
        ( 3500.0, 1.0 ),
        ( 6000.0, 0.8 ),
        ( 7000.0, 0.0 )
    }  )
    
    max_torque: float = 750
    max_rpm: float = 7000
    
    curve_file = save_curve_data_to_temp_csv_file( points )
        
    if verbose:
        if ap.exists:
            unreal.log(f"updating engine torque curve {ap.asset_path()}")
        else:
            unreal.log(f"creating engine torque curve {ap.asset_path()}")

    # whether it exists or not we run the same import code 
        
    asset_tools: unreal.AssetTools = unreal.AssetToolsHelpers.get_asset_tools()
    
    task = unreal.AssetImportTask()
    task.automated = True 
    task.destination_name = ap.asset_name
    task.destination_path = ap.folder
    task.filename = curve_file
    task.replace_existing = True
    task.save = True

    settings: unreal.CSVImportSettings = unreal.CSVImportSettings()
    settings.import_type = unreal.CSVImportType.ECSV_CURVE_FLOAT

    factory = unreal.ReimportCurveFactory()
    factory.automated_import_settings = settings
    task.factory = factory

    asset_tools.import_asset_tasks( [task] ) # type:ignore
      
    os.remove( curve_file )
    
    return ap.asset_path(), max_torque, max_rpm
    
def edit_physics_asset( asset: unreal.PhysicsAsset ):
    # like https://docs.unrealengine.com/5.0/en-US/how-to-set-up-vehicles-in-unreal-engine/
    # do this manually for now 
    # then make a blueprint function library callable from python
    # depending on if the rest of the stuff can be done
    
    phys_helper: unreal.PhysicsAssetHelper = unreal.PhysicsAssetHelper.create(asset)
   
    wheel_names: list[str] = [
        "Wheel_FL",
        "Wheel_FR",
        "Wheel_RL",
        "Wheel_RR"
    ]

    body_name:str = "body"
    
    # the wheel bones have spheres for collision shapes
    # the body as a single convex hull
    # all other bones have no body in the physics asset
    phys_helper.delete_extra_bodies( body_name, wheel_names ) 
    phys_helper.create_spheres_for_wheels( wheel_names ) 
    phys_helper.create_single_convex_hull( body_name ) 
    phys_helper.make_wheels_kinematic( wheel_names )

def edit_existing_physics_asset(asset_path: str):

    ap: AssetPath = resolve_asset_name( asset_path=asset_path, overwrite=True, make_unique_name=False )
    EAS: unreal.EditorAssetSubsystem = unreal.EditorAssetSubsystem()
    loaded = EAS.load_asset( asset_path=ap.asset_path() )
    if loaded == None:
        raise Exception(f"Could not load asset {ap.asset_path()}") 
    
    assert isinstance( loaded, unreal.PhysicsAsset )
    edit_physics_asset( asset=loaded )
    EAS.save_asset( asset_to_save=ap.asset_path(), only_if_is_dirty=True )

def import_vehicle_mesh(
    asset_path: str,
    overwrite: bool = False,
    make_unique_name: bool = True,
    fbx_file_path: str = "", 
    verbose: bool = True ) -> tuple[str,str,str]:
    
    # returns skeletal_mesh_asset_path, physics_asset_path, skeleton_asset_path
    
    # TODO rename physics asset to PHYS_ and skeleton to SKEL_ per https://docs.unrealengine.com/4.27/en-US/ProductionPipelines/AssetNaming/

    ap: AssetPath = resolve_asset_name( asset_path=asset_path, overwrite=overwrite, make_unique_name=make_unique_name )

    if fbx_file_path == "":
        return ap.asset_path(), "", ""
    
    if verbose:
        if ap.exists:
            unreal.log(f"updating mesh {ap.asset_path()}")
        else:
            unreal.log(f"creating mesh {ap.asset_path()}")
    
    
    # if filename is a url download it to a temp file
    
    use_this_path: Path = Path(fbx_file_path)
    
    if fbx_file_path.startswith("http"):
        newfile:str = download(fbx_file_path)
        use_this_path = Path(newfile)

    # options
    options = unreal.FbxImportUI()
    options.import_materials = True
    options.create_physics_asset = True
    options.import_as_skeletal = True
    options.mesh_type_to_import = unreal.FBXImportType.FBXIT_SKELETAL_MESH
    options.automated_import_should_detect_type = False 
    options.skeletal_mesh_import_data.convert_scene = True
    
    # task 
    task = unreal.AssetImportTask()
    task.automated = True
    task.destination_name = ap.asset_name
    task.destination_path = ap.folder
    task.filename = str(use_this_path)
    task.replace_existing = True
    task.replace_existing_settings = True
    task.save = True
    task.options = options

    unreal.AssetToolsHelpers.get_asset_tools().import_asset_tasks( [task] )        
    
    # or load the car and ask it what the other parts are 
    EAS: unreal.EditorAssetSubsystem = unreal.EditorAssetSubsystem()
    EAL: unreal.EditorAssetLibrary = unreal.EditorAssetLibrary()
    
    loaded = EAS.load_asset( asset_path=ap.asset_path() )
    if loaded == None:
        raise Exception(f"Could not load newly created asset {ap.asset_path()}") 
    
    assert isinstance( loaded, unreal.SkeletalMesh )
    skm: unreal.SkeletalMesh = loaded
    
    physics_asset_path:str = ""
    skeleton_asset_path:str = ""
    
    
    if skm.physics_asset != None:
        assert isinstance( skm.physics_asset, unreal.PhysicsAsset )
        edit_physics_asset( asset=skm.physics_asset )
        EAS.save_loaded_asset( asset_to_save=skm.physics_asset, only_if_is_dirty=True )
        physics_asset_path = skm.physics_asset.get_full_name()
    if skm.skeleton != None:
        assert isinstance( skm.skeleton, unreal.Skeleton )
        EAS.save_loaded_asset( asset_to_save=skm.skeleton, only_if_is_dirty=True )
        skeleton_asset_path = skm.skeleton.get_full_name()

    return ap.asset_path(), physics_asset_path, skeleton_asset_path
        
def create_anim_blueprint(
    asset_path: str,
    skeletal_mesh_asset_path: str,
    overwrite: bool = False,
    make_unique_name: bool = True,
    verbose: bool = True ) -> str:

    EAS: unreal.EditorAssetSubsystem = unreal.get_editor_subsystem(unreal.EditorAssetSubsystem)
    EAL: unreal.EditorAssetLibrary = unreal.EditorAssetLibrary()
    asset_tools: unreal.AssetTools = unreal.AssetToolsHelpers.get_asset_tools()

    asset: object = None
    ap:AssetPath = resolve_asset_name( asset_path=asset_path, overwrite=overwrite, make_unique_name=make_unique_name )
    
    if ap.exists:
        if verbose:
            unreal.log(f"updating anim blueprint {ap.asset_path()}")
        asset = EAS.load_asset( asset_path=ap.asset_path() )
    else:
        if verbose:
            unreal.log(f"creating anim blueprint {ap.asset_path()}")
            
        factory: unreal.AnimBlueprintFactory = unreal.AnimBlueprintFactory()
        
        # get the skeleton of the car
        loaded = EAS.load_asset( asset_path=skeletal_mesh_asset_path )
        if loaded == None:
            raise Exception("Could not load newly created asset " + skeletal_mesh_asset_path) 
    
        assert isinstance( loaded, unreal.SkeletalMesh )
        skm: unreal.SkeletalMesh = loaded

        factory.set_editor_property(name="target_skeleton", value=skm.skeleton )
        factory.set_editor_property(name="parent_class", value=unreal.VehicleAnimationInstance )
        
        asset = asset_tools.create_asset(
                        asset_name=ap.asset_name, 
                        package_path=ap.folder, 
                        asset_class=unreal.AnimBlueprint, 
                        factory=factory ) 

    if not isinstance(asset, unreal.AnimBlueprint):
        raise Exception("Failed to create anim blueprint asset")

    assert isinstance( asset, unreal.AnimBlueprint )
    
    anim_bp: unreal.AnimBlueprint = asset
    
    graphs: unreal.Array[unreal.AnimationGraph] = anim_bp.get_animation_graphs()
    
    assert( len(graphs) == 1 )
    
    graph: unreal.AnimationGraph = graphs[0]
    
    helper: unreal.AminGraphUpdater = unreal.AminGraphUpdater.create_helper(graph)
    assert isinstance( helper, unreal.AminGraphUpdater )
    
    # add new nodes 
  
    nodes: list[unreal.AnimGraphNode_Base] = [
        unreal.AnimGraphNode_MeshRefPose( outer=graph ),
        unreal.AnimGraphNode_WheelController( outer=graph ),
        unreal.AnimGraphNode_ComponentToLocalSpace( outer=graph )
    ]
    
    # horizontal spacing
    spacing:int = 280
    x: int = -spacing*3
    y: int = 0
    for node in nodes:
        helper.add_node( node, x, y )
        x += spacing

    if False:
        # print node pin details
        for node in nodes:
            print("pin names for node", node.get_full_name() )
            x: unreal.PinDetails
            for x in helper.get_pin_details(node):
                print( "    ", x.name, "input", x.input )
            
    helper.connect( nodes[0], "ComponentPose", nodes[1], "ComponentPose" )
    helper.connect( nodes[1], "Pose", nodes[2], "ComponentPose" )
    
    # we need to connect the AnimGraphNode_ComponentToLocalSpace node to the Output Pose
    # node which is created by default when we create the graph, so we need to 
    # find that node and its input plug
    
    node = helper.find_node( "AnimGraphNode_Root_0")
    if not node == None:
        for x in helper.get_pin_details(node):
            print( "    ", x.name, "input", x.input )
        helper.connect( nodes[2], "Pose", node, "Result" )
    
    EAL.save_asset( asset_to_save=ap.asset_path(), only_if_is_dirty=False )

    return ap.asset_path()

def create_vehicle(
    asset_path: str,
    skeletal_mesh_asset_path:str,
    anim_blueprint_asset_path:str,
    front_wheel_blueprint_asset_path:str,
    rear_wheel_blueprint_asset_path:str,
    torque_curve_asset_path:str,
    max_torque:float,
    max_rpm:float,
    overwrite: bool = False,
    make_unique_name: bool = True,
    verbose: bool = True,
    add_camera: bool = True,
    overwrite_existing_wheels:bool = True ) -> str:

    EAS: unreal.EditorAssetSubsystem = unreal.EditorAssetSubsystem()
    EAL: unreal.EditorAssetLibrary = unreal.EditorAssetLibrary()

    asset_tools: unreal.AssetTools = unreal.AssetToolsHelpers.get_asset_tools()

    vehicle_blueprint: object = None
    ap:AssetPath = resolve_asset_name( asset_path=asset_path, overwrite=overwrite, make_unique_name=make_unique_name )
    
    if ap.exists:
        if verbose:
            unreal.log(f"updating vehicle blueprint {ap.asset_path()}")
        vehicle_blueprint = EAS.load_asset( asset_path=ap.asset_path() )
    else:
        if verbose:
            unreal.log(f"creating vehicle blueprint {ap.asset_path()}")
            
        factory: unreal.BlueprintFactory = unreal.BlueprintFactory()
        factory.set_editor_property(name="parent_class", value=unreal.WheeledVehiclePawn )
        
        vehicle_blueprint = asset_tools.create_asset(
                        asset_name=ap.asset_name, 
                        package_path=ap.folder, 
                        asset_class=None, 
                        factory=factory )

    if not isinstance(vehicle_blueprint, unreal.Blueprint):
        raise Exception("Failed to create blueprint asset")

    # get skeletal mesh subcomponent and set some properties in it 
    subsystem: unreal.SubobjectDataSubsystem = cast(unreal.SubobjectDataSubsystem,unreal.get_engine_subsystem(unreal.SubobjectDataSubsystem))
    
    library: unreal.SubobjectDataBlueprintFunctionLibrary = unreal.SubobjectDataBlueprintFunctionLibrary()
    
    # expect 3 handles 
    # displaynames are
    #  BP_Car
    #  VehicleMesh
    #  VehicleMovementComp
   
    # find handles
    handles: unreal.Array[unreal.SubobjectDataHandle] = subsystem.k2_gather_subobject_data_for_blueprint(context=vehicle_blueprint)
    
    if len(handles) < 1:
        raise Exception("Could not get subobjects (i.e. components) for blueprint " + ap.asset_path())

    # find data for handles
    object_data: unreal.Array[unreal.SubobjectData] = [ subsystem.k2_find_subobject_data_from_handle(i) for i in handles ]

    # find all components
    components: list[unreal.Object] = [ library.get_object(i) for i in object_data ]

    # filter for skeletal mesh components only    
    skeletal_meshes: list[unreal.Object] = [ i for i in components if i.get_class().get_name() == "SkeletalMeshComponent" ]

    assert len(skeletal_meshes) == 1
    assert isinstance(skeletal_meshes[0], unreal.SkeletalMeshComponent )
    skel_mesh_component: unreal.SkeletalMeshComponent = skeletal_meshes[0]
    
    # update the skeletal mesh component
    if not skel_mesh_component is None:
        # update skeletal mesh
        loaded = EAS.load_asset( asset_path=skeletal_mesh_asset_path )
        if loaded == None:
            raise Exception("Could not load skeletal mesh asset" + skeletal_mesh_asset_path) 

        assert isinstance( loaded, unreal.SkeletalMesh )
        skeletal_mesh_asset: unreal.SkeletalMesh = loaded
            
        skel_mesh_component.skeletal_mesh_asset = skeletal_mesh_asset
        
        # update anim class
        loaded = EAS.load_asset( asset_path=anim_blueprint_asset_path )
        if loaded == None:
            raise Exception( "Could not load anim class " + anim_blueprint_asset_path) 

        assert isinstance( loaded, unreal.AnimBlueprint )
        anim_class_asset: unreal.AnimBlueprint = loaded
                
        skel_mesh_component.set_anim_class( anim_class_asset.generated_class() )
        
        # set simulate physics
        skel_mesh_component.set_simulate_physics(True)

    # add a camera and swingarm
    if add_camera:
        # check there is no camera already, might exist if we are updating existing vehicle
        cameras = [ i for i in components if i.get_class().get_name() == "CineCameraComponent" or  i.get_class().get_name() == "CameraComponent" ]
        spring_arms = [ i for i in components if i.get_class().get_name() == "SpringArmComponent"]
        if len(spring_arms) < 1:
            spring_arm_handle, spring_arm = add_subobject(subsystem=subsystem, blueprint=vehicle_blueprint, new_class=unreal.SpringArmComponent, name="SpringArm")
            assert isinstance( spring_arm, unreal.SpringArmComponent)

            spring_arm_handle1, spring_arm1 = add_subobject(subsystem=subsystem, blueprint=vehicle_blueprint, new_class=unreal.SpringArmComponent, name="SpringArm1")
            assert isinstance( spring_arm1, unreal.SpringArmComponent)

            spring_arm.set_editor_property(name="do_collision_test", value=False)
            spring_arm1.set_editor_property(name="do_collision_test", value=False)
            
            # make them the same as the SportsCar_Pawn so we can just copy the inputs blueprint nodes
            spring_arm.set_relative_location( unreal.Vector(0.0,0.0,75.0), False, True )
            spring_arm1.set_relative_location( unreal.Vector(-30.0,0.0,120.0), False, True )

            spring_arm.set_editor_property(name="target_arm_length", value=650.0)

            if len(cameras) < 1:
                camera_handle, front_camera = add_subobject(subsystem=subsystem, blueprint=vehicle_blueprint, new_class=unreal.CameraComponent, name="FrontCamera")
                assert isinstance( front_camera, unreal.CameraComponent)

                camera_handle1, camera1 = add_subobject(subsystem=subsystem, blueprint=vehicle_blueprint, new_class=unreal.CameraComponent, name="BackCamera")
                assert isinstance( camera1, unreal.CameraComponent)
                
                # camera is child of spring arm
                subsystem.attach_subobject( spring_arm_handle, camera_handle1 )     
                subsystem.attach_subobject( spring_arm_handle1, camera_handle )     
                # spring arm is child of vehicle mesh   
                subsystem.attach_subobject( handles[0], spring_arm_handle )        
                subsystem.attach_subobject( handles[0], spring_arm_handle1 )        
    
                # move the camera
                #front_camera.set_relative_location( unreal.Vector(-400.0,0.0,340.0), False, True )
                #front_camera.set_relative_rotation( unreal.Rotator(  0.0, -20.0, 0.0 ), False, True )
                

    movement_components = [ i for i in components if i.get_class().get_name() == "ChaosWheeledVehicleMovementComponent" ]

    print("existing movement_components")
    for i in movement_components:
        print(i, i.get_class().get_name() )
        
    if len(movement_components) == 1:
        assert isinstance( movement_components[0], unreal.ChaosVehicleMovementComponent)
        vmc: unreal.ChaosVehicleMovementComponent  = movement_components[0]

        existing: [] = vmc.get_editor_property( name="wheel_setups")
        
        if len(existing) != 0 and not overwrite_existing_wheels:
            print("Not replacing existing wheel setups")
        else:
            print("Adding wheel setups")
            
            setups: list[unreal.ChaosWheelSetup] = [
                unreal.ChaosWheelSetup(),
                unreal.ChaosWheelSetup(),
                unreal.ChaosWheelSetup(),
                unreal.ChaosWheelSetup()
            ]
            
            # front wheel
            front_wheel_asset = EAS.load_asset( asset_path=front_wheel_blueprint_asset_path )
            if front_wheel_asset == None:
                raise Exception( "Could not load front wheel blueprint class " + front_wheel_blueprint_asset_path) 
            rear_wheel_asset = EAS.load_asset( asset_path=rear_wheel_blueprint_asset_path )
            if rear_wheel_asset == None:
                raise Exception( "Could not load rear wheel blueprint class " + rear_wheel_blueprint_asset_path) 

            assert isinstance( front_wheel_asset, unreal.Blueprint )
            assert isinstance( rear_wheel_asset, unreal.Blueprint )
           
            setups[0].set_editor_property( name="wheel_class", value=front_wheel_asset.generated_class() )
            setups[0].set_editor_property( name="bone_name", value="Wheel_FL" )

            setups[1].set_editor_property( name="wheel_class", value=front_wheel_asset.generated_class() )
            setups[1].set_editor_property( name="bone_name", value="Wheel_FR" )

            setups[2].set_editor_property( name="wheel_class", value=rear_wheel_asset.generated_class() )
            setups[2].set_editor_property( name="bone_name", value="Wheel_RL" )

            setups[3].set_editor_property( name="wheel_class", value=rear_wheel_asset.generated_class() )
            setups[3].set_editor_property( name="bone_name", value="Wheel_RR" )

            vmc.set_editor_property( name="wheel_setups", value=setups )
            
             
        
        # torque curve
        torque_curve_asset = EAS.load_asset( asset_path=torque_curve_asset_path )
        if torque_curve_asset == None:
            raise Exception( "Could not load torque curve " + torque_curve_asset_path ) 
            
        engine_setup: unreal.VehicleEngineConfig = vmc.get_editor_property(name="engine_setup")
        
        rfc: unreal.RuntimeFloatCurve = unreal.RuntimeFloatCurve()
        rfc.set_editor_property( name="external_curve", value=torque_curve_asset )
        
        engine_setup.set_editor_property( name="torque_curve", value=rfc )
        engine_setup.set_editor_property( name="max_rpm", value=max_rpm )
        engine_setup.set_editor_property( name="max_torque", value=max_torque )
        
        # gear ratios from https://www.youtube.com/watch?v=VC_9hRRTWdM
        ratios:list[float] = [ 3.75, 2.38, 1.72, 1.34, 1.11, 0.96, 0.84 ] 
        reverse_ratio:float = 3.42
        final_drive_axle_ratio:float = 3.97
        weight:float = 1435
        width:float = 185
        height:float = 128
        drag_coeff:float = 0.34

        trans: object = vmc.get_editor_property(name="transmission_setup")
        assert isinstance( trans, unreal.VehicleTransmissionConfig )
        vtc: unreal.VehicleTransmissionConfig = trans
        
        vtc.set_editor_property(name="change_down_rpm", value=3000 )# (float):  [Read-Write] Engine Revs at which gear down change ocurrs
        vtc.set_editor_property(name="change_up_rpm", value=max_rpm * 0.9 ) # (float):  [Read-Write] Engine Revs at which gear up change ocurrs
        vtc.set_editor_property(name="final_ratio", value=final_drive_axle_ratio ) # (float):  [Read-Write] The final gear ratio multiplies the transmission gear ratios.
        vtc.set_editor_property(name="forward_gear_ratios", value=ratios ) # (Array[float]):  [Read-Write] Forward gear ratios
        vtc.set_editor_property(name="gear_change_time", value=0.3 ) # (float):  [Read-Write] Time it takes to switch gears (seconds)
        vtc.set_editor_property(name="reverse_gear_ratios", value=[ reverse_ratio ] ) # (Array[float]):  [Read-Write] Reverse gear ratio(s)
                                
        #vtc.set_editor_property(name=- ``transmission_efficiency`` (float):  [Read-Write] Mechanical frictional losses mean transmission might operate at 0.94 (94% efficiency)
        
        vtc.set_editor_property(name="use_auto_reverse", value=True ) #  (bool):  [Read-Write]
        vtc.set_editor_property(name="use_automatic_gears", value=True ) # (bool):  [Read-Write] Whether to use automatic transmission

        vmc.set_editor_property(name="transmission_setup", value=vtc )
        
        # stop the front end coming up
        vmc.set_editor_property(name="legacy_wheel_friction_position", value=True )

        
        
        
            
            

    EAL.save_asset( asset_to_save=ap.asset_path(), only_if_is_dirty=False )

    return ap.asset_path()

def check_default_input_classes():
    # check default input classes are the enhanced ones
    settings:unreal.InputSettings = unreal.get_default_object( unreal.InputSettings )
   
    DEFAULT_PLAYER_INPUT_CLASS:str = "default_player_input_class"
    DEFAULT_INPUT_COMPONENT_CLASS:str = "default_input_component_class"

    value = settings.get_editor_property(name=DEFAULT_PLAYER_INPUT_CLASS)
    if not isinstance( value, unreal.EnhancedInputComponent ):
        print(f"changing {DEFAULT_INPUT_COMPONENT_CLASS} to EnhancedPlayerInput")
        settings.set_editor_property(name=DEFAULT_PLAYER_INPUT_CLASS, value=unreal.EnhancedPlayerInput)
    
    value = settings.get_editor_property(name=DEFAULT_INPUT_COMPONENT_CLASS)
    if not isinstance( value, unreal.EnhancedPlayerInput ):
        print(f"changing {DEFAULT_INPUT_COMPONENT_CLASS} to EnhancedInputComponent")
        settings.set_editor_property(name=DEFAULT_INPUT_COMPONENT_CLASS, value=unreal.EnhancedInputComponent)

def create_input_action(
    input_action_asset_path:str,
    overwrite: bool = True,
    make_unique_name: bool = False,
    verbose:bool = True ) -> str:

    # create on input action object 
    EAS: unreal.EditorAssetSubsystem = unreal.EditorAssetSubsystem()
    asset_tools: unreal.AssetTools = unreal.AssetToolsHelpers.get_asset_tools()

    action_blueprint: object = None
    ap:AssetPath = resolve_asset_name( asset_path=input_action_asset_path, overwrite=overwrite, make_unique_name=make_unique_name )
    
    if ap.exists:
        if verbose:
            unreal.log(f"updating input action blueprint {ap.asset_path()}")
        action_blueprint = EAS.load_asset( asset_path=ap.asset_path() )
    else:
        if verbose:
            unreal.log(f"creating input action blueprint {ap.asset_path()}")
            
        factory: unreal.InputAction_Factory = unreal.InputAction_Factory()
       
        action_blueprint = asset_tools.create_asset(
                        asset_name=ap.asset_name, 
                        package_path=ap.folder, 
                        asset_class=None, 
                        factory=factory )

    if not isinstance(action_blueprint, unreal.InputAction):
        raise Exception("Failed to create blueprint asset")

    action_blueprint.set_editor_property(name="action_description", value="accelerate forward")
    action_blueprint.set_editor_property(name="consume_input", value=True)
    action_blueprint.set_editor_property(name="value_type", value=unreal.InputActionValueType.AXIS1D)
    EAS.save_asset( asset_to_save=ap.asset_path(), only_if_is_dirty=False )
    
    return ap.asset_path()

def create_input_mapping_context(
    input_mapping_asset_path:str,
    input_action_asset_path:str,
    overwrite: bool = True,
    make_unique_name: bool = False,
    verbose:bool = True ):

    # create on input action object 
    EAS: unreal.EditorAssetSubsystem = unreal.EditorAssetSubsystem()
    asset_tools: unreal.AssetTools = unreal.AssetToolsHelpers.get_asset_tools()

    imc: object = None
    ap:AssetPath = resolve_asset_name( asset_path=input_mapping_asset_path, overwrite=overwrite, make_unique_name=make_unique_name )
    created_new_asset: bool = False
    
    if ap.exists:
        if verbose:
            unreal.log(f"updating input mapping blueprint {ap.asset_path()}")
        imc = EAS.load_asset( asset_path=ap.asset_path() )
    else:
        if verbose:
            unreal.log(f"creating input mapping blueprint {ap.asset_path()}")
            
        factory: unreal.InputMappingContext_Factory = unreal.InputMappingContext_Factory()
       
        imc = asset_tools.create_asset(
                        asset_name=ap.asset_name, 
                        package_path=ap.folder, 
                        asset_class=None, 
                        factory=factory )
        
        created_new_asset = True

    if not isinstance(imc, unreal.InputMappingContext):
        raise Exception("Failed to create blueprint asset")

    # only create mapping on a new asset
    if created_new_asset:
        mappings:list[unreal.EnhancedActionKeyMapping] = []
        
        mapping:unreal.EnhancedActionKeyMapping = unreal.EnhancedActionKeyMapping()
         
        # load the input action
        action = EAS.load_asset( asset_path=input_action_asset_path )
        if action == None:
            raise Exception("could not load input action from " + input_action_asset_path)
        
        mapping.set_editor_property(name="action", value=action)
        mapping.set_editor_property(name="key", value=unreal.Key() )
        
        k:unreal.Key = unreal.Key()
        print("!!!!!!!!!!!!!!!!!!", unreal.Key.static_struct() )
        # LogPython: !!!!!!!!!!!!!!!!!! <Object '/Script/InputCore.Key' (0x00000BB11862A560) Class 'ScriptStruct'>

        modifiers:list[unreal.InputModifier] = []
        modifier:unreal.InputModifierSwizzleAxis = unreal.InputModifierSwizzleAxis()
        modifier.set_editor_property(name="order",value=unreal.InputAxisSwizzle.YZX)
                
        modifiers.append(modifier)
        mapping.set_editor_property(name="modifiers", value=modifiers )
        

        mappings.append(mapping)       
        imc.set_editor_property(name="mappings", value=mappings)
    
    EAS.save_asset( asset_to_save=ap.asset_path(), only_if_is_dirty=False )

    
def create_enhanced_input_setup(
    input_action_asset_path:str,
    input_mapping_asset_path:str):
    check_default_input_classes()

    input_action_asset_path = create_input_action(input_action_asset_path=input_action_asset_path)

    create_input_mapping_context(
        input_action_asset_path=input_action_asset_path,
        input_mapping_asset_path=input_mapping_asset_path,
        overwrite=False,
        make_unique_name=True)

def print_pins(graph_tool: unreal.EventGraphTool, node: unreal.K2Node):
        details = graph_tool.get_pin_details(node)
        for d in details:
            print( "    ", d.name, "input", d.input )

def connect_existing_IMC(blueprint_asset_path):
    # assuming we are in the Vehicle sample project there will be existing input actions. Here
    # we add use of the existing inputs and input mapping contexts
    
    EAL = unreal.EditorAssetLibrary
    asset: object = EAL.load_asset(asset_path=blueprint_asset_path)
    assert isinstance( asset, unreal.Blueprint )
    
    assist: unreal.BlueprintTool = unreal.BlueprintTool.create(asset)
    
    # graphs are only return here if
    # - they have at least one node
    # - they have been compiled 
   
    # graphs seem to be named after the first node they contain i.e.  "ReceiveTick", "ReceiveEndPlay", "ReceiveUnpossessed"
    # schema names are all "Default__EdGraphSchema_K2"
        
    names: list[str] = assist.get_event_graph_names();
    
    for i in names:
        print(f"event graph is named \"{i}\"")
        
    event_graph: unreal.EdGraph = assist.get_event_graph("EventGraph")
    print("eventgraph", event_graph, event_graph.get_name(), "fullname", event_graph.get_full_name() )

    graph_tool: unreal.EventGraphTool = assist.create_event_graph_tool( event_graph )
    
    actions: list[str] = [ "IA_Throttle", "IA_Break", "IA_Steering", "IA_Handbrake" ]
    functions: list[str] = [ "SetThrottleInput", "SetBrakeInput", "SetSteeringInput", "SetHandbrakeInput" ]
    
    assert( len(actions) == len(functions))

    x_start:int = 100
    y:int = 600
    step:int = 300
    
    for i in range( 0, len(actions)):
        x:int = x_start
        y += 400
        action_node = graph_tool.add_node( 
            node_class_asset_path="EnhancedInputAction",
            properties =  { "InputAction": "/Game/VehicleTemplate/Input/Actions/" + actions[i] },
            x=x, 
            y=y )
        assert isinstance( action_node, unreal.K2Node )
        if False and i == 0:
            print("PINS for action node")
            print_pins( graph_tool=graph_tool, node=action_node)

        x += step
        vmcomp_node = graph_tool.add_component_reference_node( 
            component_name="VehicleMovementComponent",
            properties={},
            x=x, 
            y=y )
        assert isinstance( vmcomp_node, unreal.K2Node )
        if False and i == 0:
            print("PINS for comp node")
            print_pins( graph_tool=graph_tool, node=vmcomp_node)

        x += step
        set_node = graph_tool.add_function_call_node( 
            component_node=vmcomp_node,
            function_name=functions[i],
            x=x, 
            y=y )
        assert isinstance( set_node, unreal.K2Node )
        if i == 0:
            print("PINS for set node")
            print_pins( graph_tool=graph_tool, node=set_node)

        graph_tool.connect( action_node, "Triggered", set_node, "execute" )
        graph_tool.connect( vmcomp_node, "VehicleMovementComponent", set_node, "self" )

        # the value pin on the SetBrakeInput or SetThrottleInput etc changes names depending
        # on the node.  Try and find the input pin which is not called "execute", "then", "self"
        ignore_list:list[str] = [ "execute", "then", "self" ]
        print("ignore_list", ignore_list )
        pins: list[unreal.PinDetails] = graph_tool.get_pin_details(set_node)
        print("pins", pins )
        inputs: list[unreal.PinDetails] = [ p for p in pins if p.input ]
        print("inputs", inputs )
        remains: list[unreal.PinDetails] = [ p for p in inputs if not p.name in ignore_list ]
        print("remains", remains )
        if len(remains) == 1:
            graph_tool.connect( action_node, "ActionValue", set_node, remains[0].name )
        else:
            print("Cannot find input for set node, possible pins are")
            print_pins( graph_tool=graph_tool, node=set_node)
    return

def create_everything():
    with unreal.ScopedSlowTask(work=20, desc="creating vehicle") as slow_task:
        slow_task.make_dialog(True)  
        create_everything_slow_task(slow_task)
           

def create_everything_slow_task( slow_task:unreal.ScopedSlowTask ):
    level_package_path: str = "/Game/Levels"
    level_name: str = "NewLevel"

    blueprint_path : str = "/Game/Experimental/Porsche_911_GT3"
    mesh_package_path : str = "/Game/Experimental/Porsche_911_GT3"
    input_package_path : str = "/Game/Inputs"
    
    create_all = True 
    create_wheels:bool = False | create_all
    create_torque_curve:bool = False | create_all
    import_vehicle:bool = False | create_all
    create_anim_bp:bool = False | create_all
    create_vehicle_bp:bool = False | create_all
    edit_existing_PHAT: bool = False
    # don't create inputs, there is only ever one not one per vehicle
    create_enhanced_input:bool = False
    
    try:
        check_plugins_loaded()
        slow_task.enter_progress_frame()
        

        base_name: str = "Car"
        blueprint_asset_path: str = blueprint_path + "/" + "BP_" + base_name
        torque_curve_asset_path:str = blueprint_path + "/" + "CT_TorqueCurve_" + base_name 
        skeletal_mesh_asset_path:str = mesh_package_path + "/" + "SK_" + base_name
        physics_asset_path:str = "" # set when mesh is imported
        skeleton_asset_path:str = "" # set when mesh is imported
        anim_blueprint_asset_path: str = blueprint_path + "/" + "ABP_" + base_name
        front_wheel_blueprint_asset_path: str = blueprint_path + "/" + "BP_" + base_name + "_FrontWheel"
        rear_wheel_blueprint_asset_path: str = blueprint_path + "/" + "BP_" + base_name + "_RearWheel"
        input_action_asset_path: str = input_package_path + "/" + "IA_Accelerate"  
        input_mapping_asset_path: str = input_package_path + "/" + "IMC_Drive"  
        existing_physics_asset_path: str = mesh_package_path + "/" + "SK_" + base_name + "_PhysicsAsset"
        max_torque:float = 300
        max_rpm:float = 5000

        # separate to test updating physics asset only        
        if( edit_existing_PHAT ):
            edit_existing_physics_asset(asset_path=existing_physics_asset_path)
            return
        
        if create_wheels:
            slow_task.enter_progress_frame(4)
            front_wheel_blueprint_asset_path = create_wheel_blueprint( 
                asset_path = front_wheel_blueprint_asset_path,
                axle_type = unreal.AxleType.FRONT,
                affected_by_steering=True,
                wheel_radius=35.0,
                wheel_width=33.6,
                verbose=True,
                overwrite=True,
                make_unique_name=False,
                )

            rear_wheel_blueprint_asset_path = create_wheel_blueprint( 
                asset_path = rear_wheel_blueprint_asset_path,
                axle_type = unreal.AxleType.REAR,
                affected_by_engine=True,
                affected_by_handbrake=True,
                wheel_radius=36.0,
                wheel_width=33.6,
                verbose=True,
                overwrite=True,
                make_unique_name=False
                )
            
        if create_torque_curve:
            slow_task.enter_progress_frame()
            torque_curve_name, max_torque, max_rpm = create_engine_torque_curve(asset_path=torque_curve_asset_path, make_unique_name=False, overwrite=True)

        if import_vehicle:
            slow_task.enter_progress_frame(10)
            source:str = "https://raw.github.com/JohnJFarrow/public/dev/Porsche.fbx"
            skeletal_mesh_asset_path, physics_asset_path, skeleton_asset_path = import_vehicle_mesh(asset_path=skeletal_mesh_asset_path, fbx_file_path=source, make_unique_name=False, overwrite=True)
            edit_existing_physics_asset( asset_path=physics_asset_path )

        if create_anim_bp:
            slow_task.enter_progress_frame()
            # for now put the anim blueprint in same dir as car
            anim_blueprint_asset_path = create_anim_blueprint( 
                    asset_path=anim_blueprint_asset_path, 
                    skeletal_mesh_asset_path=skeletal_mesh_asset_path,
                    verbose=True, 
                    overwrite=True,
                    make_unique_name=True )
            
        if create_vehicle_bp:
            slow_task.enter_progress_frame()
            blueprint_asset_path = create_vehicle( 
                           asset_path=blueprint_asset_path, 
                           skeletal_mesh_asset_path=skeletal_mesh_asset_path,
                           anim_blueprint_asset_path=anim_blueprint_asset_path,
                           front_wheel_blueprint_asset_path=front_wheel_blueprint_asset_path,
                           rear_wheel_blueprint_asset_path=rear_wheel_blueprint_asset_path,
                           torque_curve_asset_path=torque_curve_asset_path,
                           max_rpm=max_rpm,
                           max_torque=max_torque,
                           make_unique_name=False, 
                           overwrite=True
                           )

        if create_enhanced_input:
            slow_task.enter_progress_frame()
            create_enhanced_input_setup(
                input_action_asset_path=input_action_asset_path,
                input_mapping_asset_path=input_mapping_asset_path
                )
            
        connect_existing_IMC(blueprint_asset_path=blueprint_asset_path)

        EAL = unreal.EditorAssetLibrary()
        slow_task.enter_progress_frame()
        EAL.save_asset( asset_to_save=blueprint_asset_path, only_if_is_dirty=False )
            
    except (BaseException,AttributeError) as ae:
        text: str = str(ae)
        if text == "module 'unreal' has no attribute 'ChaosVehicleWheel'":
            unreal.log("unreal.ChaosVehicleWheel not found - is ChaosVehiclesPlugin enabled?")
        else:
            unreal.log(f"Caught AttributeError exception {str(ae)}")

        info: OptExcInfo = sys.exc_info()
        
        assert isinstance( info[0], type(BaseException) )
        exc_type: Type = info[0]
        
        assert isinstance( info[1], BaseException )
        exc_obj:BaseException = info[1]
        
        assert isinstance( info[2], TracebackType )
        exc_tb: TracebackType = info[2]
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        unreal.log( f"caught exception type {exc_type}, filename {fname}, line {exc_tb.tb_lineno}")
        traceback.print_exc()



