import { drawArc, drawImage } from './base2DFuncs'
import { settings2D } from '../settings'

function drawHud(mainCanvas, leftOffset, bovieDisplacement){
    const mainContext = mainCanvas.getContext('2d', { antialias: true });

    const center = {
        x: (mainCanvas.width - leftOffset) / 2 + leftOffset,
        y: mainCanvas.height / 2,
    };

    const bufferCanvas = document.createElement('canvas');
    const scaleFactor = 2;
    bufferCanvas.width = mainCanvas.width * scaleFactor;
    bufferCanvas.height = mainCanvas.height * scaleFactor;
    const bufferContext = bufferCanvas.getContext('2d', { antialias: true });
    bufferContext.scale(scaleFactor, scaleFactor);

    //find active radius index
    const bovieDistanceFromCenter = Math.sqrt(bovieDisplacement.x * bovieDisplacement.x + bovieDisplacement.y * bovieDisplacement.y);
    let maxActiveRadiusIndex = -1;
    settings2D.hubRadiuses.forEach((r, index) => {
        if (bovieDistanceFromCenter < r){
            maxActiveRadiusIndex = index;
        };
    });
    //draw arcs
    settings2D.hubRadiuses.forEach((r, index) => {
        const color = index === maxActiveRadiusIndex ? settings2D.activeColor : 'gray';
        drawArc(bufferContext, center, r, color);
    });

    mainContext.drawImage(bufferCanvas, 0, 0, bufferCanvas.width, bufferCanvas.height,
        0, 0, mainCanvas.width, mainCanvas.height);

    //draw icon only when init
    drawImage(mainContext, { w: 52, h: 90 }, settings2D.iconPath, center);
}

function drawHudBovie(mainCanvas, leftOffset, displacement){
    const mainContext = mainCanvas.getContext('2d', { antialias: true });

    const center = {
        x: (mainCanvas.width - leftOffset) / 2 + leftOffset,
        y: mainCanvas.height / 2,
    };

    drawImage(
        mainContext, 
        settings2D.bovieSize, 
        settings2D.boviePath, 
        {
            x: center.x + displacement.x,
            y: center.y + settings2D.bovieSize.h / 2 + displacement.y
        },
        displacement.angle
    );

    //draw line between center and bovie pointer
    // const cosTheta = Math.cos(displacement.angle);
    // const sinTheta = Math.sin(displacement.angle);
    // console.log(cosTheta, sinTheta);
    const boviePointer = {
        x: center.x + displacement.x,
        y: center.y + displacement.y
    };

    mainContext.beginPath();
    mainContext.lineWidth = 10;
    mainContext.strokeStyle = settings2D.activeColor + '99'; //opacity 60%
    mainContext.lineCap = "round";
    mainContext.moveTo(center.x, center.y);
    mainContext.lineTo(boviePointer.x, boviePointer.y);
    mainContext.stroke();
    mainContext.closePath();
}

export { drawHud, drawHudBovie }