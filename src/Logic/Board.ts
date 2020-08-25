import { Block } from "./Block";
import { BlockColors } from "./BlockColors";
import { RNG } from "./RNG";

export class Board {
    public static readonly WidthInPixels = 1024;
    public static readonly HeightInPixels = 768 - (Block.HeightInPixels * 2);

    public static readonly Width = Board.WidthInPixels / Block.WidthInPixels;
    public static readonly Height = Board.HeightInPixels / Block.HeightInPixels;
    public static readonly BlockCount = Board.Width * Board.Height;

    private _blocks: Block[] = [];

    constructor(private _rng: RNG) {
        for (let i = 0; i < Board.BlockCount; i++) {
            const blockColor = this._rng.nextInt(0, 3) as BlockColors;
            this._blocks[i] = new Block(blockColor);
        }
    }

    public getBlock(x: number, y: number): Block {
        return this._blocks[y * Board.Width + x];
    }

    public onClick(x: number, y: number): void {
        this.unselectAllBlocks();

        const blockX = Math.floor(x / Block.WidthInPixels);
        const blockY = Math.floor(y / Block.HeightInPixels);
        const block = this.getBlock(blockX, blockY);

        this.selectBlock(block, blockX, blockY);
    }

    private unselectAllBlocks(): void {
        for (const block of this._blocks) {
            block.unselect();
        }
    }

    private selectBlock(startingBlock: Block, x: number, y: number): void {
        const block = this.getBlock(x, y);

        if (block.isSelected || block.color !== startingBlock.color) {
            return;
        }

        block.select();

        if (x > 0) {
            this.selectBlock(startingBlock, x - 1, y);
        }

        if (x < Board.Width - 1) {
            this.selectBlock(startingBlock, x + 1, y);
        }

        if (y > 0) {
            this.selectBlock(startingBlock, x, y - 1);
        }

        if (y < Board.Height - 1) {
            this.selectBlock(startingBlock, x, y + 1);
        }
    }
}