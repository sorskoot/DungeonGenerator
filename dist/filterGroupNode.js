"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterGroupNode = void 0;
const nodeBase_js_1 = require("./nodeBase.js");
/**
 * Base node that executes on the entire dungeon. Needs to be extended.
 * @abstract ExecuterBase
 * @extends NodeBase
 */
class FilterGroupNode extends nodeBase_js_1.NodeBase {
    constructor() {
        super();
        this.filters = [];
    }
    addFilter(filterPredicate, node) {
        this.filters.push({
            filterPredicate: filterPredicate,
            node: node
        });
        return this;
    }
    /**
     * execute gets called once for the entire dungeon
     */
    execute() {
        this.filters.forEach(filter => {
            let filtered = this.containers.filter(filter.filterPredicate);
            for (let container of filtered) {
                filter.node.execute(container);
            }
        });
    }
}
exports.FilterGroupNode = FilterGroupNode;
