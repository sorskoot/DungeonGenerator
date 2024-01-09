"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneratorBase = void 0;
class GeneratorBase {
    /**
     * Base class for generators.
     * @param {Tree} container Tree with container the container to use the generator on
     * @param {number} tried the number of tries to generate
     * @returns Array with 2 new containers.
     */
    execute(container, tried = 0) {
        return [undefined, undefined];
    }
}
exports.GeneratorBase = GeneratorBase;
