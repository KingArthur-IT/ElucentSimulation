import { drawImage } from './base2DFuncs'

function drawScale(canvas, offset, numDivisions, min, max, value){
    const ctx = canvas.getContext('2d');
    const divisionsWidth = 20;

    //draw scale
    const divisionLength = (canvas.height - 2 * offset) / numDivisions;

    ctx.font = '16px Arial';
    ctx.textAlign = 'center';

    for (let i = 0; i <= numDivisions; i++) {
        const y = offset + i * divisionLength;

        const isFirstOrLast = i === 0 || i === numDivisions;
        const lineHight = isFirstOrLast ? 3 : 2;
        const lineOffset = isFirstOrLast ? 0 : 3;
        const lineWidth = divisionsWidth - 2 * lineOffset;

        ctx.lineWidth = lineHight;
        
        ctx.beginPath();
        ctx.moveTo(offset + lineOffset, y);
        ctx.lineTo(offset + lineOffset + lineWidth, y);
        ctx.stroke();

        if (i === 0) {
            ctx.fillText('A', offset + lineWidth / 2, offset - 5);
        };
        if (i === numDivisions) {
            ctx.fillText('P', offset + lineWidth / 2, canvas.height - offset * 0.65);
        };
    };
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    if (value !== 0){
        ctx.fillText('0', offset - 7, canvas.height / 2 + 5);
    }

    //draw pointer
    if (value >= max && value <= min){
        const pointerPointY = offset + (value - min) * (canvas.height - 2 * offset) / (max - min);
        const pointerSize = 12;
    
        ctx.beginPath();
        ctx.moveTo(offset - 5, pointerPointY);
        ctx.lineTo(offset - 5 - pointerSize, pointerPointY + pointerSize / 1.5);
        ctx.lineTo(offset - 5 - pointerSize, pointerPointY - pointerSize / 1.5);
    
        ctx.fill();
        ctx.fillText(value, offset - pointerSize - 18, pointerPointY + 5);
        ctx.closePath();
    }

    //draw person icon
    drawImage(ctx, 
        { w: 20, h: 16 },
        './assets/Images/personIcon.png', 
        {
            x: offset + divisionsWidth + 20 / 2, 
            y: canvas.height / 2
        }
    );
}

export { drawScale }