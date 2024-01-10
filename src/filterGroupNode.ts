import { Container, IteratorBase } from "./index.js";
import { NodeBase } from "./nodeBase.js";

type FilterPredicate = (c: Container) => boolean;
type Filter = {
  filterPredicate: FilterPredicate;
  node: IteratorBase;
};
/**
 * Base node that executes on the entire dungeon. Needs to be extended.
 * @abstract ExecuterBase
 * @extends NodeBase
 */
export class FilterGroupNode extends NodeBase {
  filters: Filter[];

  constructor() {
    super();
    this.filters = [];
  }

  addFilter(filterPredicate: FilterPredicate, node: IteratorBase) {
    this.filters.push({
      filterPredicate: filterPredicate,
      node: node,
    });
    return this;
  }

  /**
   * execute gets called once for the entire dungeon
   */
  execute() {
    this.filters.forEach((filter) => {
      let filtered = this.containers.filter(filter.filterPredicate);
      for (let container of filtered) {
        filter.node.execute(container);
      }
    });
  }
}
