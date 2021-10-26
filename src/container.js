import { Point } from "./point.js"
import { Tree } from "./tree.js";

export const H_RATIO = 0.45
export const W_RATIO = 0.45
export const MAXTRIES = 50;

export class Container {
    constructor(x, y, w, h, locked = false) {

        this.locked = locked; // if locked, cannot used in generators
        this.features = [];
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.center = new Point(
            this.x + (this.w / 2),
            this.y + (this.h / 2)
        )

        // /**
        //  * @type {Container[]}
        //  */
        this.connections = [];

    }
    contains(x,y){
        return (x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.h)
    }

    paint(c) {
        c.drawRect("rgba(0, 255, 0, 1)", this.x, this.y,
            this.w, this.h);       
    }
    paintConnections(c){
        for (let i = 0; i < this.connections.length; i++) {
            c.point("rgba(255, 0, 0, 1)", this.connections[i].x, this.connections[i].y);
            
        }
    }
    
    drawPath(c, other) {
        c.drawLine("#888", this.center.x, this.center.y, 
        other.center.x , other.center.y )        
    }

    console() {
        console.log(this.x, this.y, this.w, this.h, this.locked, this.features);
    }

    split(container, iter, callback) {
        if (!container)return;
        var root = new Tree(container);
        if(container.locked){
            return root;   
        }
        var root = new Tree(container);
        if (iter > 0) {
            var sr = callback(root, iter)
            if(sr[0] instanceof Container){
                root.lchild = this.split(sr[0], iter - 1, callback)       
                root.rchild = this.split(sr[1], iter - 1, callback)                         
            }
            else if(sr[0] instanceof Tree){             
                /** @type {Tree} */
                let subtree = sr[0];
                root =  sr[0];
                //root.lchild = subtree;            
                root.lchild.lchild = this.split(root.lchild.lchild.leaf, iter - 1, callback)
                root.lchild.rchild = this.split(root.lchild.rchild.leaf, iter - 1, callback)
                root.rchild = this.split(root.rchild.leaf, iter - 1, callback)
            };
            
        }
        return root
    }
}


