export class DebugCanvas {
  width = 128;
  height = 128;
  mapCanvas: HTMLCanvasElement;
  mapContext: CanvasRenderingContext2D;
  scale = 8;

  constructor(width: number, height: number) {
    this.width = width * this.scale;
    this.height = height * this.scale;
    this.mapCanvas = document.createElement("canvas") as HTMLCanvasElement;
    this.mapCanvas.style.position = "absolute";
    this.mapCanvas.style.top = "0px";
    this.mapCanvas.style.left = "0px";
    this.mapCanvas.style.zIndex = "100";
    this.mapCanvas.width = this.width;
    this.mapCanvas.height = this.height;

    // Temp during development
    this.mapCanvas.style.width = `${this.width}px`;
    this.mapCanvas.style.height = `${this.height}px`;
    this.mapCanvas.style.imageRendering = "pixelated";

    document.body.appendChild(this.mapCanvas);
    // END

    this.mapContext = this.mapCanvas.getContext(
      "2d"
    ) as CanvasRenderingContext2D;
    this.mapContext.fillStyle = "rgba(0, 0, 0, 1)";
    this.mapContext.fillRect(0, 0, this.width, this.height);
  }

  size() {
    return { width: this.width, height: this.height };
  }

  drawRect(color: string, x: number, y: number, w: number, h: number) {
    this.mapContext.strokeStyle = color;
    this.mapContext.lineWidth = (1 * this.scale) / 2;
    this.mapContext.beginPath();
    this.mapContext.rect(
      Math.floor(x) * this.scale + this.scale / 2,
      Math.floor(y) * this.scale + this.scale / 2,
      Math.floor(w) * this.scale - this.scale / 2,
      Math.floor(h) * this.scale - this.scale / 2
    );
    this.mapContext.stroke();
  }

  fillRect(color: string, x: number, y: number, w: number, h: number) {
    this.mapContext.fillStyle = color;
    this.mapContext.fillRect(
      Math.floor(x) * this.scale,
      Math.floor(y) * this.scale,
      Math.floor(w) * this.scale,
      Math.floor(h) * this.scale
    );
  }

  point(color: string, x: number, y: number) {
    this.fillRect(color, Math.floor(x), Math.floor(y), 1, 1);
  }

  drawLine(color: string, x1: number, y1: number, x2: number, y2: number) {
    this.mapContext.beginPath();
    this.mapContext.lineWidth = 1 * this.scale;
    this.mapContext.strokeStyle = color;
    this.mapContext.moveTo(
      Math.floor(x1) * this.scale,
      Math.floor(y1) * this.scale
    );
    this.mapContext.lineTo(
      Math.floor(x2) * this.scale,
      Math.floor(y2) * this.scale
    );
    this.mapContext.stroke();
  }
}
