import { NodeBase } from "./nodeBase.js";
/**
 * Base node that executes on the entire dungeon. Needs to be extended.
 * @abstract ExecuterBase
 * @extends NodeBase
 */
export declare class FilterGroupNode extends NodeBase {
    constructor();
    addFilter(filterPredicate: any, node: any): this;
    /**
     * execute gets called once for the entire dungeon
     */
    execute(): void;
}
