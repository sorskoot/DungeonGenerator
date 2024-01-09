import { Container } from "./container.js";
import { DebugCanvas } from "./debugCanvas.js";
import { IteratorBase } from "./iteratorBase.js";
import { ExecuterBase } from "./executerBase.js";
import { rng } from "./utils/rng.js";
import { Tree } from "./tree.js";
import { FilterGroupNode } from "./filterGroupNode.js";
import { GeneratorBase } from "./generators/generatorBase.js";
import { NodeBase } from "./nodeBase.js";

export class DungeonGenerator {
  width: number;
  height: number;
  debug = false;
  debugCanvas!: DebugCanvas;
  generators: GeneratorBase[];
  nodes: NodeBase[];
  mainContainer: Container;

  constructor(width: number, height: number, debug: boolean = false) {
    this.width = width;
    this.height = height;

    // RNG.setSeed(1);

    if (debug) {
      this.debug = true;
      this.debugCanvas = new DebugCanvas(width, height);
    }
    this.generators = [];
    this.nodes = [];
    this.mainContainer = new Container(0, 0, this.width, this.height);
  }

  addGenerator(generator: GeneratorBase) {
    this.generators.push(generator);
    return this;
  }

  addNode(node: NodeBase) {
    this.nodes.push(node);
    return this;
  }

  nodesOnPosition(x: number, y: number) {
    //this.debugCanvas.point("red", x, y);
    return this.mainContainer.nodesOnPosition(x, y);
  }

  /**
   * Searches all the rooms and returns the ones with the specified feature.
   * @param {String} feature Case sensitive feature to search for.
   * @returns {Array<Container>} Array of rooms with the specified feature.
   */
  findRoomByFeature(feature: string) {
    return this.mainContainer
      .getLeafs()
      .filter((c) => c.features.includes(feature));
  }

  generate() {
    console.log("Generating dungeon...");

    this.mainContainer.split(
      this.generators.length,
      this._generatorHandler.bind(this)
    )!;

    let leafs = this.mainContainer.getLeafs();
    for (let i = 0; i < this.nodes.length; i++) {
      this.nodes[i].initialize(leafs, this);
      switch (true) {
        case this.nodes[i] instanceof IteratorBase:
          const iterator = this.nodes[i] as IteratorBase;
          for (let j = 0; j < leafs.length; j++) {
            iterator.execute(leafs[j], j);
          }
          break;
        case this.nodes[i] instanceof ExecuterBase:
          const executer = this.nodes[i] as ExecuterBase;
          executer.execute();
          break;
        case this.nodes[i] instanceof FilterGroupNode:
          const filterGroupNode = this.nodes[i] as FilterGroupNode;
          filterGroupNode.execute();
          break;
      }
    }
  }

  _generatorHandler(container: Container, iteration: number) {
    const index = this.generators.length - iteration;
    let generator = this.generators[index];
    return generator.execute(container);
  }

  debugVisual() {
    this.mainContainer.paint(this.debugCanvas);
    this.mainContainer.paintConnections(this.debugCanvas);
    //this.mainTree.draw_paths(this.debugCanvas, this.mainTree);
    return this.debugCanvas;
  }

  debugConsole() {
    this.mainContainer.console();
  }
}
