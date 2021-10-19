import {Container} from './container.js';

export class Tree {

    /**
     * instantiates a new tree
     * @param {Tree} leaf - the leaf to be added to the tree; undefined if the tree is empty 
     */
    constructor(leaf) {
        this.leaf = leaf
        this.lchild = undefined
        this.rchild = undefined
    }

    /**
     * iterate through all the nodes on the tree finding the end leafs.
     * @returns {Array<Container>} All the end leafs of the tree
     */
    getLeafs() {
        if (this.lchild === undefined && this.rchild === undefined)
            return [this.leaf]
        else
            return [].concat(this.lchild.getLeafs(), this.rchild.getLeafs())
    }


    getLevel(level, queue) {
        if (queue === undefined)
            queue = []
        if (level == 1) {
            queue.push(this)
        } else {
            if (this.lchild !== undefined)
                this.lchild.getLevel(level - 1, queue)
            if (this.rchild !== undefined)
                this.rchild.getLevel(level - 1, queue)
        }
        return queue
    }

    nodesOnPosition(x, y) {
        let nodes = []
        if (this.leaf.contains(x, y))
            nodes.push(this.leaf)
        if (this.lchild !== undefined)
            nodes = nodes.concat(this.lchild.nodesOnPosition(x, y))
        if (this.rchild !== undefined)
            nodes = nodes.concat(this.rchild.nodesOnPosition(x, y))
        return nodes
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
        if (!tree) tree = this;
        if (tree?.lchild == undefined || tree?.rchild == undefined)
            return            
        tree.lchild.leaf.drawPath(ctx, tree.rchild.leaf)

        this.draw_paths(ctx, tree.lchild)
        this.draw_paths(ctx, tree.rchild)
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