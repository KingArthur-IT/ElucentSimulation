import { drawImage } from './base2DFuncs'

function drawScale(canvas, offsetX, offsetY, numDivisions, { min, max, value }){
    const ctx = canvas.getContext('2d');
    const divisionsWidth = 20;

    //draw scale
    const divisionLength = (canvas.height - 2 * offsetY) / numDivisions;

    ctx.font = '16px Arial';
    ctx.textAlign = 'center';

    for (let i = 0; i <= numDivisions; i++) {
        const y = offsetY + i * divisionLength;

        const isFirstOrLast = i === 0 || i === numDivisions;
        const lineHight = isFirstOrLast ? 3 : 2;
        const lineOffset = isFirstOrLast ? 0 : 3;
        const lineWidth = divisionsWidth - 2 * lineOffset;

        ctx.lineWidth = lineHight;
        
        ctx.beginPath();
        ctx.moveTo(offsetX + lineOffset, y);
        ctx.lineTo(offsetX + lineOffset + lineWidth, y);
        ctx.stroke();

        if (i === 0) {
            ctx.fillText('A', offsetX + lineWidth / 2, offsetY - 5);
        };
        if (i === numDivisions) {
            ctx.fillText('P', offsetX + lineWidth / 2, canvas.height - offsetY + 18);
        };
    };
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    if (value !== 0){
        ctx.fillText('0', offsetX - 7, canvas.height / 2 + 5);
    }

    //draw pointer
    if (value >= min && value <= max){
        const pointerPointY = offsetY + (value - max) * (canvas.height - 2 * offsetY) / (min - max);
        const pointerSize = 12;
    
        ctx.beginPath();
        ctx.moveTo(offsetX - 5, pointerPointY);
        ctx.lineTo(offsetX - 5 - pointerSize, pointerPointY + pointerSize / 1.5);
        ctx.lineTo(offsetX - 5 - pointerSize, pointerPointY - pointerSize / 1.5);
    
        ctx.fill();
        ctx.fillText(value, offsetX - pointerSize - 18, pointerPointY + 5);
        ctx.closePath();
    }

    //draw person icon
    drawImage(ctx, 
        { w: 24, h: 20 },
        './assets/Images/personIcon.png', 
        {
            x: offsetX + divisionsWidth + 20 / 2, 
            y: canvas.height / 2
        }
    );
}

export { drawScale }