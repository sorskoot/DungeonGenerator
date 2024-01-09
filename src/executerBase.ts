import { NodeBase } from "./nodeBase.js";

/**
 * Base node that executes on the entire dungeon. Needs to be extended.
 * @abstract ExecuterBase
 * @extends NodeBase
 */
export class ExecuterBase extends NodeBase {

    /**
     * execute gets called once for the entire dungeon
     */
    execute() {
    }
}
