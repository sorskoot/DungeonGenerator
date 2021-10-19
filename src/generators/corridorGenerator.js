import RNG from "../rng.js";
import { Tree } from "../tree.js";
import { Container, W_RATIO, MAXTRIES, H_RATIO } from "../container.js";
import { GeneratorBase } from "./generatorBase.js";
import { roundToClosest } from "../utils.js";

export class CorridorGenerator extends GeneratorBase {
    constructor(width) {
        super();
        this.width = width || 9;
    }
    /**
     * 
     * @param {Tree} tree 
     * @param {Number} tried 
     * @returns 
     */
    execute(tree, tried = 0) {
        let r1, r2, r3, r4;
        let container = tree.leaf;        
        const isVertical = RNG.getUniform() < 0.5;
        if (isVertical) {
            // Vertical
            r1 = new Container(
                container.x, container.y,
                roundToClosest (RNG.getUniformInt(1, container.w),3), container.h // r1.w, r1.h
            );
            r2 = new Container(
                container.x + r1.w, container.y,
                container.w - r1.w, container.h // r2.w, r2.h
            );

            var r1_w_ratio = r1.w / r1.h;
            var r2_w_ratio = r2.w / r2.h;
            if (r1_w_ratio < W_RATIO || r2_w_ratio < W_RATIO) {
                if (tried > MAXTRIES)
                    return [undefined, undefined]; // Too many tries
                return this.execute(tree, tried + 1);
            }
        } else {
            // Horizontal
            r1 = new Container(
                container.x, container.y,
                container.w, roundToClosest(RNG.getUniformInt(1, container.h),3) // r1.w, r1.h
            );
            r2 = new Container(
                container.x, container.y + r1.h,
                container.w, container.h - r1.h // r2.w, r2.h
            );
            var r1_h_ratio = r1.h / r1.w;
            var r2_h_ratio = r2.h / r2.w;
            if (r1_h_ratio < H_RATIO || r2_h_ratio < H_RATIO) {
                if (tried > MAXTRIES)
                    return [undefined, undefined]; // Too many tries
                return this.execute(tree, tried + 1);
            }
        }

        var t2 = new Tree(r1);
        tree.lchild = t2;
        tree.rchild = new Tree(r2);

        let container2 = t2.leaf;
        if (isVertical) {
            r3 = new Container(
                container2.x, container2.y,
                container2.w - this.width, container2.h // r1.w, r1.h            
            );
            r4 = new Container(
                container2.x + r3.w, container2.y,
                container2.w - r3.w, container2.h,
                true // r2.w, r2.h
            );
            r4.features.push("corridor");
        } else {
            r3 = new Container(
                container2.x, container2.y,
                container2.w, container2.h - this.width // r1.w, r1.h            
            );
            r4 = new Container(
                container2.x, container2.y + r3.h,
                container2.w, container2.h - r3.h,
                true // r2.w, r2.h
            );            
            r4.features.push("corridor");
        }
        

        t2.lchild = new Tree(r3);
        t2.rchild = new Tree(r4);
        // tree.rchild.lchild = r1;
        // tree.rchild.rchild = r3;
        return [tree];
    }
}
