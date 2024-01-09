import { Container } from "../container";
import { Tree } from "../tree";

export class GeneratorBase {
  /**
   * Base class for generators.
   * @param {Tree} container Tree with container the container to use the generator on
   * @param {number} tried the number of tries to generate
   * @returns Array with 2 new containers.
   */
  execute(
    container: Container,
    tried: number = 0
  ): Array<Container | undefined> {
    return [undefined, undefined];
  }
}
