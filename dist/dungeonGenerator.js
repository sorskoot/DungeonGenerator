"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DungeonGenerator = void 0;
const container_js_1 = require("./container.js");
const debugCanvas_js_1 = require("./debugCanvas.js");
const iteratorBase_js_1 = require("./iteratorBase.js");
const executerBase_js_1 = require("./executerBase.js");
const filterGroupNode_js_1 = require("./filterGroupNode.js");
class DungeonGenerator {
    width;
    height;
    debug = false;
    debugCanvas;
    generators;
    nodes;
    mainContainer;
    constructor(width, height, debug = false) {
        this.width = width;
        this.height = height;
        // RNG.setSeed(1);
        if (debug) {
            this.debug = true;
            this.debugCanvas = new debugCanvas_js_1.DebugCanvas(width, height);
        }
        this.generators = [];
        this.nodes = [];
        this.mainContainer = new container_js_1.Container(0, 0, this.width, this.height);
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
        return this.mainContainer.nodesOnPosition(x, y);
    }
    /**
     * Searches all the rooms and returns the ones with the specified feature.
     * @param {String} feature Case sensitive feature to search for.
     * @returns {Array<Container>} Array of rooms with the specified feature.
     */
    findRoomByFeature(feature) {
        return this.mainContainer
            .getLeafs()
            .filter((c) => c.features.includes(feature));
    }
    generate() {
        console.log("Generating dungeon...");
        this.mainContainer.split(this.generators.length, this._generatorHandler.bind(this));
        let leafs = this.mainContainer.getLeafs();
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].initialize(leafs, this);
            switch (true) {
                case this.nodes[i] instanceof iteratorBase_js_1.IteratorBase:
                    const iterator = this.nodes[i];
                    for (let j = 0; j < leafs.length; j++) {
                        iterator.execute(leafs[j], j);
                    }
                    break;
                case this.nodes[i] instanceof executerBase_js_1.ExecuterBase:
                    const executer = this.nodes[i];
                    executer.execute();
                    break;
                case this.nodes[i] instanceof filterGroupNode_js_1.FilterGroupNode:
                    const filterGroupNode = this.nodes[i];
                    filterGroupNode.execute();
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
        this.mainContainer.paint(this.debugCanvas);
        this.mainContainer.paintConnections(this.debugCanvas);
        //this.mainTree.draw_paths(this.debugCanvas, this.mainTree);
        return this.debugCanvas;
    }
    debugConsole() {
        this.mainContainer.console();
    }
}
exports.DungeonGenerator = DungeonGenerator;
