import { Block } from "./Block";
import { BlockColors } from "./BlockColors";

export class Board {
    public static readonly Width = 1024 / 32;
    public static readonly Height = 768 / 32 - 2;
    public static readonly BlockCount = Board.Width * Board.Height;
    
    private _blocks: Block[] = [];
    
    constructor() {
        for (let i = 0; i < Board.BlockCount; i++) {
            const blockColor = Math.floor(Math.random() * 4) as BlockColors;
            this._blocks[i] = new Block(blockColor);
        }
    }

    public getBlock(x: number, y: number): Block {
        return this._blocks[y * Board.Height + x];
    }
}