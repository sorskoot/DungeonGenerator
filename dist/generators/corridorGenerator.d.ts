import { Container } from "../container.js";
import { GeneratorBase } from "./generatorBase.js";
export declare class CorridorGenerator extends GeneratorBase {
    width: number;
    constructor(width: number);
    execute(container: Container, tried?: number): any;
}
