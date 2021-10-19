export class DebugCanvas {

    
    width = 128;
    height = 128;

    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.mapCanvas = document.createElement('canvas');
        this.mapCanvas.style.position = 'absolute';
        this.mapCanvas.style.top = '0px';
        this.mapCanvas.style.left = '0px';
        this.mapCanvas.style.zIndex = '100';
        this.mapCanvas.width = this.width;
        this.mapCanvas.height = this.height;

        // Temp during development
        this.mapCanvas.style.width = `${this.width*4}px`;
        this.mapCanvas.style.height = `${this.height*4}px`;
        this.mapCanvas.style.imageRendering = 'pixelated';
        
        document.body.appendChild(this.mapCanvas);
        // END

        this.mapContext = this.mapCanvas.getContext('2d');
        this.mapContext.fillStyle = "rgba(0, 0, 0, 1)";
        this.mapContext.fillRect(0, 0, this.width, this.height);
    }

    size(){
        return {width: this.width, height: this.height};
    }

    drawRect(color, x, y, w, h) {
        this.mapContext.strokeStyle = color;
        this.mapContext.lineWidth = 1;
        this.mapContext.beginPath();
        this.mapContext.rect( Math.floor(x),  Math.floor(y),  Math.floor(w),  Math.floor(h));
        this.mapContext.stroke();
    }

    fillRect(color, x, y, w, h) {
        this.mapContext.fillStyle = color;
        this.mapContext.fillRect( Math.floor(x),  Math.floor(y),  Math.floor(w),  Math.floor(h));
    }

    point(color, x, y){
        this.fillRect(color, Math.floor(x), Math.floor(y), 1, 1);
    }

    drawLine(color, x1, y1, x2, y2){
        this.mapContext.beginPath();
        this.mapContext.lineWidth = 1;
        this.mapContext.strokeStyle = color;
        this.mapContext.moveTo(x1, y1);
        this.mapContext.lineTo(x2,y2);
        this.mapContext.stroke();
    }
}

