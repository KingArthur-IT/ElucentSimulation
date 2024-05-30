import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

function addFBXObjectToScene(scene, fileName, modelPath, objectName, position, scale, rotation){
    let Obj = new THREE.Object3D();
    let fbxLoader = new FBXLoader();
    fbxLoader.setPath(modelPath);
    fbxLoader.load(
        fileName,
        (object) => {
            object.name = objectName;
            Obj.add(object)
        }, (xhr) => {
            // console.log('loading progress', xhr);
        },
    )
    Obj.scale.copy(scale);
    Obj.position.copy(position); 
	Obj.rotation.setFromVector3(rotation);
    Obj.name = objectName;
    scene.add(Obj);
}


export { addFBXObjectToScene }