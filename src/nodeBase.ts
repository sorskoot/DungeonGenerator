import { DungeonGenerator } from "../dungeonGenerator.js";
import { Container } from "./container.js";

/**
 * Base class for dungeon generator nodes. Should be extended by other classes.
 */
export class NodeBase {
  containers!: Array<Container>;
  dungeonGenerator: DungeonGenerator;

  /**
   * instantiates a new Node. Should be extended by subclasses.
   * @param {Array<Container>} containerArray
   * @param {DungeonGenerator} dungeonGenerator
   */
  initialize(containerArray: any, dungeonGenerator: any) {
    this.containers = containerArray;
    this.dungeonGenerator = dungeonGenerator;
  }
}
