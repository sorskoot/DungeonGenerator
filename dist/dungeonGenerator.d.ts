import { Container } from "./container.js";
import { DebugCanvas } from "./debugCanvas.js";
import { GeneratorBase } from "./generators/generatorBase.js";
import { NodeBase } from "./nodeBase.js";
export declare class DungeonGenerator {
    width: number;
    height: number;
    debug: boolean;
    debugCanvas: DebugCanvas;
    generators: GeneratorBase[];
    nodes: NodeBase[];
    mainContainer: Container;
    constructor(width: number, height: number, debug?: boolean);
    addGenerator(generator: GeneratorBase): this;
    addNode(node: NodeBase): this;
    nodesOnPosition(x: number, y: number): Container[];
    /**
     * Searches all the rooms and returns the ones with the specified feature.
     * @param {String} feature Case sensitive feature to search for.
     * @returns {Array<Container>} Array of rooms with the specified feature.
     */
    findRoomByFeature(feature: string): Container[];
    generate(): void;
    _generatorHandler(container: Container, iteration: number): (Container | undefined)[];
    debugVisual(): DebugCanvas;
    debugConsole(): void;
}
