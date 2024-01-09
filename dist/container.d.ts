import { DebugCanvas } from "./debugCanvas.js";
import { Point } from "./point.js";
export declare const H_RATIO = 0.45;
export declare const W_RATIO = 0.45;
export declare const MAXTRIES = 50;
export declare class Container {
    lchild: Container | undefined;
    rchild: Container | undefined;
    locked: boolean;
    features: string[];
    x: number;
    y: number;
    w: number;
    h: number;
    center: Point;
    connections: Container[];
    constructor(x: number, y: number, w: number, h: number, locked?: boolean);
    /**
     * @returns {boolean} true if the container is a leaf, ie. it has no children
     */
    isLeaf(): boolean;
    contains(x: number, y: number): boolean;
    /**
     * draw to canvas
     * @param {Tree} c
     */
    paint(c: DebugCanvas): void;
    paintRect(context: DebugCanvas): void;
    paintConnections(c: DebugCanvas): void;
    drawPath(c: DebugCanvas, other: Container): void;
    console(): void;
    split(iter: number, callback: Function, shouldSplit?: boolean): void;
    /**
     * iterate through all the nodes on the tree finding the end leafs.
     * @returns {Array<Container>} All the end leafs of the tree
     */
    getLeafs(): Array<Container>;
    getLevel(level: number, queue: Container[]): Container[];
    /**
     *
     * @param {Number} x
     * @param {Number} y
     * @returns {Array<Container>}
     */
    nodesOnPosition(x: number, y: number): Array<Container>;
}
