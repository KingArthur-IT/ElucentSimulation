import { Vector3, Euler } from 'three';

const settings3D = {
    camera: {
        deep: 1000,
        posX: 0,
        posY: 0,
        posZ: 5,
    },
    bovieModel: {
        modelPath: './assets/Models/bovie/',
        fileName: 'bovie.fbx',
        name: 'bovie',
        position: new Vector3(0.0, 0.0, 0.0),
		rotation: new Vector3(Math.PI * 0.5, Math.PI * 0.0, Math.PI * 0.0),
		scale: 	  new Vector3(0.25, 0.25, 0.25),
    },
    bodyModel: {
        modelPath: './assets/Models/body/',
        fileName: 'body_drapes.fbx',
        name: 'body',
        position: new Vector3(0.9, 1.1, 0.0),
		rotation: new Vector3(Math.PI * 0.5, Math.PI * 0.5, Math.PI * 0.0),
		scale: 	  new Vector3(0.25, 0.25, 0.25),
    }
}

export { settings3D }