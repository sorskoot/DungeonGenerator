"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tree = void 0;
class Tree {
    leaf;
    lchild;
    rchild;
    /**
     * instantiates a new tree
     * @param {Tree} leaf - the leaf to be added to the tree; undefined if the tree is empty
     */
    constructor(leaf) {
        //  this.container = container;
        this.leaf = leaf;
        this.lchild = undefined;
        this.rchild = undefined;
    }
    /**
     * iterate through all the nodes on the tree finding the end leafs.
     * @returns {Array<Container>} All the end leafs of the tree
     */
    getLeafs() {
        if (this.lchild === undefined && this.rchild === undefined) {
            return [this.leaf];
        }
        else {
            const temp = [];
            if (this.lchild) {
                temp.push(...this.lchild.getLeafs());
            }
            else if (this.rchild) {
                temp.push(...this.rchild.getLeafs());
            }
            return temp;
        }
    }
    getLevel(level, queue) {
        if (queue === undefined)
            queue = [];
        if (level == 1) {
            queue.push(this);
        }
        else {
            if (this.lchild !== undefined)
                this.lchild.getLevel(level - 1, queue);
            if (this.rchild !== undefined)
                this.rchild.getLevel(level - 1, queue);
        }
        return queue;
    }
    /**
     *
     * @param {Number} x
     * @param {Number} y
     * @returns {Array<Container>}
     */
    nodesOnPosition(x, y) {
        let nodes = [];
        if (this.leaf.contains(x, y)) {
            nodes.push(this.leaf);
        }
        if (this.lchild !== undefined) {
            nodes.push(...this.lchild.nodesOnPosition(x, y));
        }
        if (this.rchild !== undefined) {
            nodes.push(...this.rchild.nodesOnPosition(x, y));
        }
        return nodes;
    }
    /**
     * draw to canvas
     * @param {Tree} c
     */
    paint(c) {
        this.leaf.paint(c);
        if (this.lchild !== undefined)
            this.lchild.paint(c);
        if (this.rchild !== undefined)
            this.rchild.paint(c);
    }
    /**
     * draw to canvas
     * @param {Tree} c
     */
    paintConnections(c) {
        this.leaf.paintConnections(c);
        if (this.lchild !== undefined)
            this.lchild.paintConnections(c);
        if (this.rchild !== undefined)
            this.rchild.paintConnections(c);
    }
    draw_paths(ctx, tree) {
        if (!tree) {
            tree = this;
        }
        if (tree?.lchild == undefined || tree?.rchild == undefined) {
            return;
        }
        tree.lchild.leaf.drawPath(ctx, tree.rchild.leaf);
        this.draw_paths(ctx, tree.lchild);
        this.draw_paths(ctx, tree.rchild);
    }
    /**
     *  Write info about container to console
     */
    console() {
        this.leaf.console();
        if (this.lchild !== undefined)
            this.lchild.console();
        if (this.rchild !== undefined)
            this.rchild.console();
    }
}
exports.Tree = Tree;
