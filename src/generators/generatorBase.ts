import { Container } from "../container";
export class GeneratorBase {
  /**
   * Base class for generators.
   * @param {Container} container Container to use the generator on
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
