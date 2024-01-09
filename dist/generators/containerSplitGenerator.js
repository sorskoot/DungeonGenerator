"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerSplitGenerator = void 0;
const rng_js_1 = require("../utils/rng.js");
const container_js_1 = require("../container.js");
const generatorBase_js_1 = require("./generatorBase.js");
const utils_js_1 = require("../utils/utils.js");
class ContainerSplitGenerator extends generatorBase_js_1.GeneratorBase {
    /**
     *
     * @param {Tree} container
     * @param {Number} tried
     * @returns Tree with 2 new containers.
     */
    execute(container, tried = 0) {
        var r1, r2;
        if (rng_js_1.rng.getUniform() < 0.5) {
            // Vertical
            r1 = new container_js_1.Container(container.x, container.y, 
            // Round to closed multiple of 3 to make sure the rooms are a certain size. This
            // adds a consistancy to the rooms in the mansion.
            (0, utils_js_1.roundToClosest)(rng_js_1.rng.getUniformInt(1, container.w), 3), container.h // r1.w, r1.h
            );
            r2 = new container_js_1.Container(container.x + r1.w, container.y, container.w - r1.w, container.h // r2.w, r2.h
            );
            // Check if the rooms are too narrow to prevent odd looking rooms.
            var r1_w_ratio = r1.w / r1.h;
            var r2_w_ratio = r2.w / r2.h;
            if (r1_w_ratio < container_js_1.W_RATIO || r2_w_ratio < container_js_1.W_RATIO) {
                if (tried > container_js_1.MAXTRIES)
                    return [undefined, undefined]; // Too many tries
                return this.execute(container, tried + 1);
            }
        }
        else {
            // Horizontal
            r1 = new container_js_1.Container(container.x, container.y, container.w, (0, utils_js_1.roundToClosest)(rng_js_1.rng.getUniformInt(1, container.h), 3) // r1.w, r1.h
            );
            r2 = new container_js_1.Container(container.x, container.y + r1.h, container.w, container.h - r1.h // r2.w, r2.h
            );
            var r1_h_ratio = r1.h / r1.w;
            var r2_h_ratio = r2.h / r2.w;
            if (r1_h_ratio < container_js_1.H_RATIO || r2_h_ratio < container_js_1.H_RATIO) {
                if (tried > container_js_1.MAXTRIES)
                    return [undefined, undefined]; // Too many tries
                return this.execute(container, tried + 1);
            }
        }
        container.lchild = r1;
        container.rchild = r2;
        return [r1, r2];
    }
}
exports.ContainerSplitGenerator = ContainerSplitGenerator;
