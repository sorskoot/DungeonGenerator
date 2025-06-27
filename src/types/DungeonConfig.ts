export type DungeonConfig = {
    dungeonSize: Float32Array;
    /**
     * Size of each room in the dungeon.
     * static, or min-max.
     */
    roomSize: number | [number, number];

    /**
     * Size of each grid cell in the dungeon.
     */
    gridSize: Float32Array;
};
