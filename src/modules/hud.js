import { drawArc, drawImage } from './base2DFuncs'

function drawHud(canvas, offset){
    const ctx = canvas.getContext('2d');
    const center = {
        x: (canvas.width - offset) / 2 + offset,
        y: canvas.height / 2,
    };

    //draw icon
    drawImage(ctx, { w: 50, h: 50 }, './assets/Images/icon.png', center);

    //draw arcs
    drawArc(ctx, center, 130, 'gray');
    drawArc(ctx, center, 90, 'gray');
    drawArc(ctx, center, 50, 'gray');
}

export { drawHud }