import { Board } from "../Logic/Board";
import { Block } from "../Logic/Block";
import { BlockColors } from "../Logic/BlockColors";

export class BoardRenderer {
    constructor(
        private _graphics: CanvasRenderingContext2D,
        private _blockImage: HTMLImageElement) {
    }

    public render(board: Board): void {
        for (let y = 0; y < Board.Height; y++) {
            for (let x = 0; x < Board.Width; x++) {
                const block = board.getBlock(x, y);
                const xOffset = x * Block.WidthInPixels;
                const yOffset = y * Block.HeightInPixels;

                this._graphics.drawImage(
                    this._blockImage,
                    0,
                    0,
                    Block.WidthInPixels,
                    Block.HeightInPixels,
                    xOffset,
                    yOffset,
                    Block.WidthInPixels,
                    Block.HeightInPixels);

                const imageData = this._graphics.getImageData(xOffset, yOffset, Block.WidthInPixels, Block.HeightInPixels);

                for (let i = 0; i < imageData.data.length; i += 4) {
                    switch (block.color) {
                        case BlockColors.red:
                            imageData.data[i + 1] = 0;
                            imageData.data[i + 2] = 0;
                            break;

                        case BlockColors.blue:
                            imageData.data[i + 0] = 0;
                            imageData.data[i + 2] = 0;
                            break;

                        case BlockColors.green:
                            imageData.data[i + 0] = 0;
                            imageData.data[i + 1] = 0;
                            break;

                        case BlockColors.yellow:
                            imageData.data[i + 2] = 0;
                            break;
                    }
                }

                this._graphics.putImageData(imageData, xOffset, yOffset);

                if (block.isSelected) {
                    this._graphics.globalAlpha = 0.7;

                    this._graphics.drawImage(
                        this._blockImage,
                        Block.WidthInPixels * 4,
                        0,
                        Block.WidthInPixels,
                        Block.HeightInPixels,
                        xOffset,
                        yOffset,
                        Block.WidthInPixels,
                        Block.HeightInPixels);

                        this._graphics.globalAlpha = 1.0;
                }
            }
        }
    }
}