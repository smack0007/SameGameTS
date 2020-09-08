export enum BlockColors {
    red = 0,
    blue,
    green,
    yellow,
}

export const BlockColorKeys: number[] = Object.keys(BlockColors)
    .map((x) => Number(x))
    .filter((x) => !isNaN(x));
