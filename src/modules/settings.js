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
        position: new Vector3(0.0, 0.0, 0.2),
		rotation: new Vector3(Math.PI * 110 / 180, Math.PI * 0.0, Math.PI * 0.0),
		scale: 	  new Vector3(0.25, 0.25, 0.25),
        availableArea: {
            maxX: 0.1,
            minX: -0.65,
            minY: -0.1,
            maxY: 0.42,
            minZ: 0.05,
            maxZ: 0.05,
        },
    },
    bodyModel: {
        modelPath: './assets/Models/body/',
        fileName: 'body_drapes.fbx',
        name: 'body',
        position: new Vector3(0.9, 1.2, 0.0),
		rotation: new Vector3(Math.PI * 0.5, Math.PI * 0.5, Math.PI * 0.0),
		scale: 	  new Vector3(0.25, 0.25, 0.25),
    },
    touchMouseStartArea: {
        center: { 
            x: 0.0,
            y: -0.7,
        },
        R: 0.1,
    },
}

const settings2D = {
    canvasId: 'Canvas2D',
    canvasWrapperId: 'wrapper2D',
    iconPath: './assets/Images/icon.png',
    boviePath: './assets/Images/HUD_bovie.png',
    bovieSize: { w: 15, h: 197 },
    activeColor: '#703E89',
    hubRadiuses: [217, 141, 65],
}

export { settings3D, settings2D }