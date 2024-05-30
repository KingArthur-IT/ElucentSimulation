import * as THREE from 'three';
//modules import
import { settings3D, settings2D } from './modules/settings'
import { addFBXObjectToScene } from './modules/3D/addObjects'
import { move3DBovie, set3DBovieNormal } from './modules/3D/bovieInteractions'
import { drawScale } from './modules/2D/scale'
import { drawHud, drawHudBovie } from './modules/2D/hud'

//3d
var canvas3D, scene, camera, renderer, 
scene3D = {
    width: 300,
    height: 450,
    isActive: false,
    mouse: { x: 0, y: 0 },
}

//2d
var canvas2D,
sceneSize2D = {
    width: 400,
    height: 450,
},
bovie2DDisplacement = {
    x: 10,
    y: -100,
    angle: -40 * Math.PI / 180,
},
scaleValues = {
    max: 30,
    min: -30,
    value: 20
};

class App {
    init() {
        //init 3d scene
        BovieSceneInit();
    
        //init 2d scene
        HudSceneInit();

        //---------------mouse, touch events------------------
        canvas3D.addEventListener("mousedown",    mouseDownHandler);
        canvas3D.addEventListener("mousemove",    mouseMoveHandler);
        
        canvas3D.addEventListener("touchstart",   touchStartHandler);
        canvas3D.addEventListener("touchmove",    touchMoveHandler);    
        canvas3D.addEventListener("touchend",     touchEndHandler);

        animate();
    }
}

//--- Scenes init
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
};

function HudSceneInit(){
    canvas2D = document.getElementById(settings2D.canvasId);
    const canvasWrapper = document.getElementById(settings2D.canvasWrapperId);
    sceneSize2D.width = canvasWrapper.getBoundingClientRect().width;
    sceneSize2D.height = canvasWrapper.getBoundingClientRect().height;
    canvas2D.width = sceneSize2D.width;
    canvas2D.height = sceneSize2D.height;

    drawScale(canvas2D, 50, 30, 6, scaleValues);
    drawHud(canvas2D, 90, bovie2DDisplacement);
    setTimeout(() => {
        drawHudBovie(canvas2D, 90, bovie2DDisplacement);
    }, 0);
}

//---mouse events
function mouseDownHandler(e){
    if (!scene3D.isActive){//lock
        document.querySelector('.startText').classList.add('d-none');

        scene3D.isActive = true;
        scene3D.mouse.x = (e.offsetX / canvas3D.width) * 2 - 1;
        scene3D.mouse.y = - (e.offsetY / canvas3D.height) * 2 + 1;

        canvas3D.requestPointerLock = canvas3D.requestPointerLock ||
            canvas3D.mozRequestPointerLock ||
            canvas3D.webkitRequestPointerLock;
            canvas3D.requestPointerLock();

    } else { //unlock
        scene3D.isActive = false;
        document.exitPointerLock = document.exitPointerLock ||
            document.mozExitPointerLock ||
            document.webkitExitPointerLock;
        document.exitPointerLock();
    }
}
function mouseMoveHandler(e){
    // const raycaster = new THREE.Raycaster();
    // const body = scene.getObjectByName(settings3D.bovieModel.name);
    // const mouse = new THREE.Vector2();
    // mouse.x = (e.offsetX / canvas3D.width) * 2 - 1;
    // mouse.y = - (e.offsetY / canvas3D.height) * 2 + 1;
    // raycaster.setFromCamera(mouse, camera);
    // const intersects = raycaster.intersectObject(body, true);
    // if (intersects.length > 0) {
    //     const intersection = intersects[0];
    //     console.log(intersection);
    // }
    // console.log('e', mouse);

    if (!scene3D.isActive) return;

    let movementX = e.movementX ||
        e.mozMovementX ||
        e.webkitMovementX ||
        0;
    let movementY = e.movementY ||
        e.mozMovementY ||
        e.webkitMovementY ||
        0;

    const movementStep = 0.01;
    const bovie = scene.getObjectByName(settings3D.bovieModel.name);
    const currentPosition = bovie.position;
    const newXPos = currentPosition.x + movementX * movementStep;
    const newYPos = currentPosition.y - movementY * movementStep;

    const isMoved = move3DBovie(scene, newXPos, newYPos);

    if (isMoved.x){
        scene3D.mouse.x += 0.1 * movementX / canvas3D.width;
    };
    if (isMoved.y){
        scene3D.mouse.y += 0.1 * movementY / canvas3D.height;
    };
    console.log(scene3D.mouse);
    set3DBovieNormal(scene3D.mouse, scene, camera);
}

//--- touch events
function touchStartHandler(e){
    if (!scene3D.isActive){//lock
        document.querySelector('.startText').classList.add('d-none');
        const canvasOffset = document.querySelector('.left-panel').clientWidth;
        
        //touch position
        const evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
        const touch = evt.touches[0] || evt.changedTouches[0];
        const xTouch = parseInt(touch.pageX - canvasOffset);
        const yTouch = parseInt(touch.pageY);
        const touchPoint = new THREE.Vector2((xTouch / canvas3D.width) * 2 - 1, - (yTouch / canvas3D.height) * 2 + 1);

        //calc distance between bovie pin center and touch point
        const boviePinCenter = new THREE.Vector2(settings3D.touchMouseStartArea.center.x, settings3D.touchMouseStartArea.center.y);
        const distanceToBoviePen = boviePinCenter.distanceTo(touchPoint);
    
        if (distanceToBoviePen < settings3D.touchMouseStartArea.R){
            scene3D.isActive = true;
            scene3D.mouse.x = touchPoint.x;
            scene3D.mouse.y = touchPoint.y;
        };
    } else {//unlock
        scene3D.isActive = false;
    }
}

function touchMoveHandler(e){
    if (!scene3D.isActive) return;
    const canvasOffset = document.querySelector('.left-panel').clientWidth;

    //touch position
    const evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
    const touch = evt.touches[0] || evt.changedTouches[0];
    const xTouch = parseInt(touch.pageX - canvasOffset);
    const yTouch = parseInt(touch.pageY);
    const touchPoint = new THREE.Vector2((xTouch / canvas3D.width) * 2 - 1, - (yTouch / canvas3D.height) * 2 + 1);

    const movementX = touchPoint.x - scene3D.mouse.x;
    const movementY = touchPoint.y - scene3D.mouse.y;

    const bovie = scene.getObjectByName(settings3D.bovieModel.name);
    const currentPosition = bovie.position;
    const newXPos = currentPosition.x + movementX;
    const newYPos = currentPosition.y + movementY;

    const isMoved = move3DBovie(scene, newXPos, newYPos);

    if (isMoved.x){
        scene3D.mouse.x = touchPoint.x;
    };
    if (isMoved.y){
        scene3D.mouse.y = touchPoint.y;
    };
    
    set3DBovieNormal({ x: scene3D.mouse.x * 0.1, y: scene3D.mouse.y * 0.1 }, scene, camera);
}

function touchEndHandler(){
    scene3D.isActive = false;
    const bovie = scene.getObjectByName(settings3D.bovieModel.name);
    bovie.position.copy(settings3D.bovieModel.position); 
	bovie.rotation.setFromVector3(settings3D.bovieModel.rotation);
}

//---main loop
function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

export default App;
