"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecuterBase = void 0;
const nodeBase_js_1 = require("./nodeBase.js");
/**
 * Base node that executes on the entire dungeon. Needs to be extended.
 * @abstract ExecuterBase
 * @extends NodeBase
 */
class ExecuterBase extends nodeBase_js_1.NodeBase {
    /**
     * execute gets called once for the entire dungeon
     */
    execute() {
    }
}
exports.ExecuterBase = ExecuterBase;
