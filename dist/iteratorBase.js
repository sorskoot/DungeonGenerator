"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IteratorBase = void 0;
const nodeBase_js_1 = require("./nodeBase.js");
/**
 * @abstract IteratorBase
 */
class IteratorBase extends nodeBase_js_1.NodeBase {
    /**
     * execute gets called for every container(room) in the dungeon
     * @param {Container} currentContainer The current container that is being iterated
     * @param {Number} index The current index of the container in all the containers
     */
    execute(currentContainer, index) { }
}
exports.IteratorBase = IteratorBase;
