import { Container } from './container.js';
import { IteratorBase } from './iteratorBase.js';

export class CorridorConnectionIterator extends IteratorBase {

    /**
     * initialize the iterator
     * @param {Array<Container>} containerArray 
     */
    initialize(containerArray) {
        /**
        * @type {Array<Container>}
        */
        this.containers = containerArray;

        /**
         * @type {Array<Container>}
         */
        this.corridors = this.containers.filter(container => ~container.features.indexOf("corridor"));
    }

    /**
     * executes on every container in the dungeon
     * @param {Container} currentContainer 
     * todo: 
     *  - remove duplicate code
     *  - lower the change of a connection after the first one      
     */
    execute(currentContainer) {
        let firstX = currentContainer.center.x + currentContainer.w / 2;
        let firstY = currentContainer.center.y;
        let found = this.corridors.findIndex(corridor => corridor.contains(firstX+1, firstY));
        if (found !== -1 && this.corridors[found] !== currentContainer) {
            currentContainer.connections = [new Connection(this.corridors[found], firstX - 1, firstY, "E"), ...currentContainer.connections];
            this.corridors[found].connections = [new Connection(currentContainer, firstX, firstY,"W"), ...this.corridors[found].connections];
        }

        firstX = currentContainer.center.x - currentContainer.w / 2 - 1;
        firstY = currentContainer.center.y;
        found = this.corridors.findIndex(corridor => corridor.contains(firstX-1, firstY));
        if (found !== -1 && this.corridors[found] !== currentContainer) {
            currentContainer.connections = [new Connection(this.corridors[found], firstX + 1, firstY,"W"), ...currentContainer.connections];
            this.corridors[found].connections = [new Connection(currentContainer, firstX, firstY,"E"), ...this.corridors[found].connections];
        }

        firstX = currentContainer.center.x;
        firstY = currentContainer.center.y + currentContainer.h / 2;
        found = this.corridors.findIndex(corridor => corridor.contains(firstX, firstY+1));
        if (found !== -1 && this.corridors[found] !== currentContainer) {
            currentContainer.connections = [new Connection(this.corridors[found], firstX, firstY - 1,"S"), ...currentContainer.connections];
            this.corridors[found].connections = [new Connection(currentContainer, firstX, firstY,"N"), ...this.corridors[found].connections];
        }

        firstX = currentContainer.center.x;
        firstY = currentContainer.center.y - currentContainer.h / 2 - 1;
        found = this.corridors.findIndex(corridor => corridor.contains(firstX, firstY-1));
        if (found !== -1 && this.corridors[found] !== currentContainer) {
            currentContainer.connections = [new Connection(this.corridors[found], firstX, firstY + 1,"N"), ...currentContainer.connections];
            this.corridors[found].connections = [new Connection(currentContainer, firstX, firstY,"S"), ...this.corridors[found].connections];
        }
    }
}

class Connection {
    constructor(container, x, y, orientation) {
        this.container = container;
        this.x = x;
        this.y = y;
        this.orientation = orientation;
    }
}