import { Container } from "./src/container.js";
import { DebugCanvas } from "./src/debugCanvas.js";
import { IteratorBase } from "./src/iteratorBase.js";
import { ExecuterBase } from "./src/executerBase.js";
import RNG from "./src/rng.js";
import { Tree } from "./src/tree.js";
import { FilterGroupNode } from "./src/filterGroupNode.js";

export class DungeonGenerator {

    constructor(width, height, debug) {
        this.width = width;
        this.height = height;

        // RNG.setSeed(1);

        if (debug) {
            this.debug = true;
            this.debugCanvas = new DebugCanvas(width, height);
        }
        this.generators = [];
        this.nodes = [];
        this.mainTree = new Tree();
    }

    addGenerator(generator) {
        this.generators.push(generator);
        return this;
    }

    addNode(node) {
        this.nodes.push(node);
        return this;
    }

    nodesOnPosition(x, y) {
        //this.debugCanvas.point("red", x, y);
        return this.mainTree.nodesOnPosition(x, y)
    }

    /**
     * Searches all the rooms and returns the ones with the specified feature.
     * @param {String} feature Case sensitive feature to search for.
     * @returns {Array<Container>} Array of rooms with the specified feature.
     */
    findRoomByFeature(feature) {
        return this.mainTree.getLeafs().filter(c=>c.features.includes(feature));
    }

    generate() {
        console.log("Generating dungeon...");
        let mainContainer = new Container(0, 0, this.width, this.height);
        this.mainTree =
            mainContainer.split(mainContainer,
                this.generators.length,
                this._generatorHandler.bind(this));

        let leafs = this.mainTree.getLeafs();
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].initialize(leafs, this);
            switch (true) {
                case this.nodes[i] instanceof IteratorBase:
                    for (let j = 0; j < leafs.length; j++) {
                        this.nodes[i].execute(leafs[j], j);
                    }
                    break;
                case this.nodes[i] instanceof ExecuterBase:                    
                case this.nodes[i] instanceof FilterGroupNode:                    
                    this.nodes[i].execute();                    
                    break;
            }

        }
    }

    _generatorHandler(container, iteration) {
        const index = this.generators.length - iteration;
        let generator = this.generators[index];
        return generator.execute(container);
    }

    debugVisual() {
        this.mainTree.paint(this.debugCanvas)
        this.mainTree.paintConnections(this.debugCanvas)
        //this.mainTree.draw_paths(this.debugCanvas)
    }

    debugConsole() {
        this.mainTree.console()
    }
}

