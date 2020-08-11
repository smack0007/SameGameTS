import { Block } from "./Block";
import { BlockColors } from "./BlockColors";

export class Board {
    public static readonly WidthInPixels = 1024;
    public static readonly HeightInPixels = 768 - (Block.HeightInPixels * 2);

    public static readonly Width = Board.WidthInPixels / Block.WidthInPixels;
    public static readonly Height = Board.HeightInPixels / Block.HeightInPixels;
    public static readonly BlockCount = Board.Width * Board.Height;

    private _blocks: Block[] = [];

    constructor() {
        for (let i = 0; i < Board.BlockCount; i++) {
            const blockColor = Math.floor(Math.random() * 4) as BlockColors;
            this._blocks[i] = new Block(blockColor);
        }
    }

    public getBlock(x: number, y: number): Block {
        return this._blocks[y * Board.Width + x];
    }

    public onClick(x: number, y: number): void {
        const blockX = Math.floor(x / Block.WidthInPixels);
        const blockY = Math.floor(y / Block.HeightInPixels);
        const block = this.getBlock(blockX, blockY);
        console.info(blockX, blockY, block);
        block.select();
    }
}