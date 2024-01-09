import { Container } from "./container.js";
import { DebugCanvas } from "./debugCanvas.js";
export declare class Tree {
    leaf: Container;
    lchild: Tree | undefined;
    rchild: Tree | undefined;
    /**
     * instantiates a new tree
     * @param {Tree} leaf - the leaf to be added to the tree; undefined if the tree is empty
     */
    constructor(leaf: Container);
    /**
     * iterate through all the nodes on the tree finding the end leafs.
     * @returns {Array<Container>} All the end leafs of the tree
     */
    getLeafs(): Array<Container>;
    getLevel(level: number, queue: Tree[]): Tree[];
    /**
     *
     * @param {Number} x
     * @param {Number} y
     * @returns {Array<Container>}
     */
    nodesOnPosition(x: number, y: number): Array<Container>;
    /**
     * draw to canvas
     * @param {Tree} c
     */
    paint(c: DebugCanvas): void;
    /**
     * draw to canvas
     * @param {Tree} c
     */
    paintConnections(c: DebugCanvas): void;
    draw_paths(ctx: DebugCanvas, tree: Tree): void;
    /**
     *  Write info about container to console
     */
    console(): void;
}
