import { Container } from "./src/container.js";
import { DebugCanvas } from "./src/debugCanvas.js";
import RNG from "./src/rng.js";
import { Tree } from "./src/tree.js";

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
        this.iterators = [];
        this.mainTree = new Tree();
    }

    addGenerator(generator) {
        this.generators.push(generator);
        return this;
    }

    addIterator(iterator){
        this.iterators.push(iterator);
        return this;
    }

    nodesOnPosition(x, y) {
        this.debugCanvas.point("red", x, y);
        return this.mainTree.nodesOnPosition(x,y)
        
    }

    generate() {
        console.log("Generating dungeon...");
        let mainContainer = new Container(0, 0, this.width, this.height);
        this.mainTree =
            mainContainer.split(mainContainer,
                this.generators.length,
                this._generatorHandler.bind(this));

        let leafs = this.mainTree.getLeafs();
        for (let i = 0; i < this.iterators.length; i++) {
            this.iterators[i].initialize(leafs);
            for (let j = 0; j < leafs.length; j++) {
                this.iterators[i].execute(leafs[j]);                    
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

