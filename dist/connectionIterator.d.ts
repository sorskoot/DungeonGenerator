import { IteratorBase } from "./iteratorBase.js";
/**
 * Connectes room to
 * @class ConnectionIterator
 * @extends IteratorBase
 */
export declare class CorridorConnectionIterator extends IteratorBase {
    /**
     * initialize the iterator
     * @param {Array<Container>} containerArray
     */
    initialize(containerArray: any): void;
    /**
     * executes on every container in the dungeon
     * @param {Container} currentContainer
     * todo:
     *  - remove duplicate code
     *  - lower the change of a connection after the first one
     */
    execute(currentContainer: any): void;
}
