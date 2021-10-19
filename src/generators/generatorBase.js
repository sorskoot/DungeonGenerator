
export class GeneratorBase {
    /**
     *
     * @param {Container} container the container to use the generator on
     * @param {number} tried the number of tries to generate
     * @returns Array with 2 new containers.
     */
    execute(container, tried = 0) {
        return [undefined, undefined];
    }
}
