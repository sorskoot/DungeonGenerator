import { Container } from "./container.js";
import { NodeBase } from "./nodeBase.js";

/**
 * @abstract IteratorBase
 */
export class IteratorBase extends NodeBase {
  /**
   * execute gets called for every container(room) in the dungeon
   * @param {Container} currentContainer The current container that is being iterated
   * @param {Number} index The current index of the container in all the containers
   */
  execute(currentContainer: Container, index: number) {}
}
