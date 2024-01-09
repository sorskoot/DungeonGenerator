"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = exports.MAXTRIES = exports.W_RATIO = exports.H_RATIO = void 0;
const point_js_1 = require("./point.js");
const rng_js_1 = require("./utils/rng.js");
exports.H_RATIO = 0.45;
exports.W_RATIO = 0.45;
exports.MAXTRIES = 50;
class Container {
    lchild;
    rchild;
    locked;
    features;
    x;
    y;
    w;
    h;
    center;
    connections;
    constructor(x, y, w, h, locked = false) {
        this.locked = locked; // if locked, cannot used in generators
        this.features = [];
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.center = new point_js_1.Point(this.x + this.w / 2, this.y + this.h / 2);
        // /**
        //  * @type {Container[]}
        //  */
        this.connections = [];
    }
    /**
     * @returns {boolean} true if the container is a leaf, ie. it has no children
     */
    isLeaf() {
        return this.lchild === undefined || this.rchild === undefined;
    }
    contains(x, y) {
        return (x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.h);
    }
    /**
     * draw to canvas
     * @param {Tree} c
     */
    paint(c) {
        if (this.isLeaf()) {
            this.paintRect(c);
        }
        if (this.lchild) {
            this.lchild.paint(c);
        }
        if (this.rchild) {
            this.rchild.paint(c);
        }
    }
    paintRect(context) {
        context.drawRect(`rgba(${rng_js_1.rng.getUniformInt(64, 196)}, ${rng_js_1.rng.getUniformInt(64, 196)}, ${rng_js_1.rng.getUniformInt(64, 196)}, 1)`, this.x, this.y, this.w, this.h);
    }
    paintConnections(c) {
        for (let i = 0; i < this.connections.length; i++) {
            c.point("rgba(255, 0, 0, 1)", this.connections[i].x, this.connections[i].y);
        }
    }
    drawPath(c, other) {
        c.drawLine("#888", this.center.x, this.center.y, other.center.x, other.center.y);
    }
    console() {
        console.log(this.x, this.y, this.w, this.h, this.locked, this.features, this.isLeaf(), this.lchild, this.rchild);
        if (this.lchild !== undefined) {
            this.lchild.console();
        }
        if (this.rchild !== undefined) {
            this.rchild.console();
        }
    }
    split(
    //  container: Container,
    iter, callback, shouldSplit = true) {
        if (this.locked) {
            return;
        }
        if (iter > 0) {
            if (shouldSplit) {
                callback(this, iter);
            }
            // if (sr[0] instanceof Container) {
            if (this.lchild) {
                if (this.lchild.isLeaf()) {
                    this.lchild.split(iter - 1, callback);
                }
                else {
                    this.lchild.split(iter - 1, callback, false);
                }
            }
            if (this.rchild) {
                if (this.rchild.isLeaf()) {
                    this.rchild.split(iter - 1, callback);
                }
                else {
                    this.rchild.split(iter - 1, callback, false);
                }
            }
            // this.split(sr[0], iter - 1, callback);
            // this.split(sr[1], iter - 1, callback);
            // if (sr[2]) {
            //   this.split(sr[2], iter - 1, callback);
            // }
            // }
            //else if (sr[0] instanceof Tree) {
            /** @type {Tree} */
            // let subtree = sr[0];
            // root = sr[0];
            // //root.lchild = subtree;
            // root.lchild!.lchild = this.split(
            //   root.lchild!.lchild!,
            //   iter - 1,
            //   callback
            // );
            // root.lchild!.rchild = this.split(
            //   root.lchild!.rchild!,
            //   iter - 1,
            //   callback
            // );
            // root.rchild = this.split(root!.rchild!, iter - 1, callback);
            //}
        }
    }
    /**
     * iterate through all the nodes on the tree finding the end leafs.
     * @returns {Array<Container>} All the end leafs of the tree
     */
    getLeafs() {
        if (this.lchild === undefined && this.rchild === undefined) {
            return [this];
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
        if (this.contains(x, y)) {
            nodes.push(this);
        }
        if (this.lchild !== undefined) {
            nodes.push(...this.lchild.nodesOnPosition(x, y));
        }
        if (this.rchild !== undefined) {
            nodes.push(...this.rchild.nodesOnPosition(x, y));
        }
        return nodes;
    }
}
exports.Container = Container;
