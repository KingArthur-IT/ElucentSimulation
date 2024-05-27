import * as THREE from 'three';
//modules import
import { settings3D } from './modules/settings'
import { addFBXObjectToScene } from './modules/addObjects'
import { drawScale } from './modules/scale'

var canvas3D, scene, camera, renderer, 
scene3D = {
    width: 300,
    height: 450,
},
canvas2D,
scene2D = {
    width: 400,
    height: 450,
}

class App {
    init() {
        //init 3d scene
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

        //init 2d scene
        canvas2D = document.getElementById('Canvas2D');
        const canvasWrapper = document.getElementById('wrapper2D');
        scene2D.width = canvasWrapper.getBoundingClientRect().width;
        scene2D.height = canvasWrapper.getBoundingClientRect().height;
        canvas2D.width = scene2D.width;
        canvas2D.height = scene2D.height;

        drawScale(canvas2D, 50, 6, 30, -30, 24);

        animate();
    }
}

function BovieSceneInit(){
    canvas3D = document.getElementById('Canvas3D');
    const canvasWrapper = document.getElementById('wrapper3D');
    scene3D.width = canvasWrapper.getBoundingClientRect().width;
    scene3D.height = canvasWrapper.getBoundingClientRect().height;
    canvas3D.width = scene3D.width;
    canvas3D.height = scene3D.height;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, scene3D.width / scene3D.height, 0.1, settings3D.camera.deep );
    camera.position.x = settings3D.camera.posX;
    camera.position.y = settings3D.camera.posY;
    camera.position.z = settings3D.camera.posZ;
    scene.add(camera)

    //lights
    const light = new THREE.AmbientLight(0xffffff, 3.0);
    light.position.set(0, 0, 0);
    scene.add(light);

    renderer = new THREE.WebGLRenderer({ canvas: canvas3D, antialias: true });
    renderer.setClearColor( 0xffffff, 0 ); 
    // renderer.setPixelRatio( Math.min(window.devicePixelRatio, 1.5) );
    renderer.setSize( scene3D.width, scene3D.height );
};

function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

export default App;
