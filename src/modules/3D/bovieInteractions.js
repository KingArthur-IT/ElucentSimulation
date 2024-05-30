import * as THREE from 'three';
import { settings3D } from '../settings'

function move3DBovie(scene, newXPos, newYPos){
    const bovie = scene.getObjectByName(settings3D.bovieModel.name);
    const isMoved = { x: false, y: false };

    if (newXPos >= settings3D.bovieModel.availableArea.minX && newXPos <= settings3D.bovieModel.availableArea.maxX ){
        bovie.position.x = newXPos;
        isMoved.x = true;
    };
    if (newYPos >= settings3D.bovieModel.availableArea.minY && newYPos <= settings3D.bovieModel.availableArea.maxY ){
        bovie.position.y = newYPos;
        isMoved.y = true;
    };

    return isMoved;
}
function set3DBovieNormal(scene3DMouse, scene, camera){
    const body = scene.getObjectByName(settings3D.bodyModel.name);
    const bovie = scene.getObjectByName(settings3D.bovieModel.name);

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(scene3DMouse, camera);
    const intersects = raycaster.intersectObject(body, true);

    if (intersects.length > 0) {
        const intersection = intersects[0];
        // console.log('intersection', intersection);

        // bovie.position.z += intersection.distance;
        // console.log('intersection.distance', intersection.distance);

        const normal = intersection.face.normal.clone().normalize();
        
        const lookAtPoint = intersection.point.clone().add(normal);
        bovie.lookAt(lookAtPoint);
        bovie.rotation.x = settings3D.bovieModel.rotation.x;
        bovie.rotation.y = settings3D.bovieModel.rotation.y;
    }
}

export { move3DBovie, set3DBovieNormal }