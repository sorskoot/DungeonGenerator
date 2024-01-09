export declare class DebugCanvas {
    width: number;
    height: number;
    mapCanvas: HTMLCanvasElement;
    mapContext: CanvasRenderingContext2D;
    scale: number;
    constructor(width: number, height: number);
    size(): {
        width: number;
        height: number;
    };
    drawRect(color: string, x: number, y: number, w: number, h: number): void;
    fillRect(color: string, x: number, y: number, w: number, h: number): void;
    point(color: string, x: number, y: number): void;
    drawLine(color: string, x1: number, y1: number, x2: number, y2: number): void;
}
