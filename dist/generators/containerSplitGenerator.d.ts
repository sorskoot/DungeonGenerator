import { Container } from "../container.js";
import { GeneratorBase } from "./generatorBase.js";
export declare class ContainerSplitGenerator extends GeneratorBase {
    /**
     *
     * @param {Tree} container
     * @param {Number} tried
     * @returns Tree with 2 new containers.
     */
    execute(container: Container, tried?: number): Array<Container | undefined>;
}
