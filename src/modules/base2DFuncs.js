function drawArc(ctx, center, radius, color, width = 1){
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
};

function drawImage(ctx, size, imagePath, center){
    const img = new Image();
    img.src = imagePath;
    img.onload = function() {
        ctx.drawImage(img, center.x - size.w / 2, center.y - size.h / 2, size.w, size.h);
    };
}

export { drawArc, drawImage }