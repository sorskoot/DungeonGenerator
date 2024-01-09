"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeBase = void 0;
/**
 * Base class for dungeon generator nodes. Should be extended by other classes.
 */
class NodeBase {
    containers;
    dungeonGenerator;
    /**
     * instantiates a new Node. Should be extended by subclasses.
     * @param {Array<Container>} containerArray
     * @param {DungeonGenerator} dungeonGenerator
     */
    initialize(containerArray, dungeonGenerator) {
        this.containers = containerArray;
        this.dungeonGenerator = dungeonGenerator;
    }
}
exports.NodeBase = NodeBase;
