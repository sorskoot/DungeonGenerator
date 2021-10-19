import RNG from "../rng.js";
import {Tree} from "../tree.js";
import { Container, W_RATIO, MAXTRIES, H_RATIO } from "../container.js";
import { GeneratorBase } from "./generatorBase.js";
import { roundToClosest } from "../utils.js";

export class ContainerSplitGenerator extends GeneratorBase {

    /**
     * 
     * @param {Tree} tree 
     * @param {Number} tried 
     * @returns 
     */
    execute(tree, tried = 0) {
        let container = tree.leaf;
        var r1, r2;        
        if (RNG.getUniform() < 0.5) {
            // Vertical
            r1 = new Container(
                container.x, container.y,
                roundToClosest(RNG.getUniformInt(1, container.w),3), container.h // r1.w, r1.h
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

        return [r1,r2];
    }
}
