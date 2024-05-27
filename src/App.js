import * as THREE from 'three';
//modules import
import { settings3D } from './modules/settings'
import { addFBXObjectToScene } from './modules/addObjects'

var canvas, scene, camera, renderer, 
scene3DScene = {
    width: 300,
    height: 450,
}

class App {
    init() {
        BovieSceneInit();
        addFBXObjectToScene(
            scene,
            settings3D.bovieModel.fileName,
            settings3D.bovieModel.modelPath,
            settings3D.bovieModel.name,
            settings3D.bovieModel.position,
            settings3D.bovieModel.scale,
            settings3D.bovieModel.rotation,
        );
        addFBXObjectToScene(
            scene,
            settings3D.bodyModel.fileName,
            settings3D.bodyModel.modelPath,
            settings3D.bodyModel.name,
            settings3D.bodyModel.position,
            settings3D.bodyModel.scale,
            settings3D.bodyModel.rotation,
        );

        animate();
    }
}

function BovieSceneInit(){
    canvas = document.getElementById('Canvas3D');
    const canvasWrapper = document.getElementById('Wrapper3D');
    scene3DScene.width = canvasWrapper.getBoundingClientRect().width;
    scene3DScene.height = canvasWrapper.getBoundingClientRect().height;
    canvas.width = scene3DScene.width;
    canvas.height = scene3DScene.height;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, scene3DScene.width / scene3DScene.height, 0.1, settings3D.camera.deep );
    camera.position.x = settings3D.camera.posX;
    camera.position.y = settings3D.camera.posY;
    camera.position.z = settings3D.camera.posZ;
    scene.add(camera)

    //lights
    const light = new THREE.AmbientLight(0xffffff, 3.0);
    light.position.set(0, 0, 0);
    scene.add(light);

    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setClearColor( 0xffffff, 0 ); 
    // renderer.setPixelRatio( Math.min(window.devicePixelRatio, 1.5) );
    renderer.setSize( scene3DScene.width, scene3DScene.height );
};

function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

export default App;
