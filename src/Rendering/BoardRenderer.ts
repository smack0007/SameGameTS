import { FrameBuffer } from "../FrameBuffer";
import { Board } from "../Logic/Board";
import { Block } from "../Logic/Block";
import { BlockColors } from "../Logic/BlockColors";

export class BoardRenderer {
    constructor(private _frameBuffer: FrameBuffer) {}

    public render(board: Board, blockImage: HTMLImageElement): void {
        for (let y = 0; y < Board.Height; y++) {
            for (let x = 0; x < Board.Width; x++) {
                const block = board.getBlock(x, y);

                if (!block.isActive) {
                    continue;
                }

                const xOffset = Math.trunc(x * Block.WidthInPixels);
                const yOffset = Math.trunc(y * Block.HeightInPixels + block.offsetY);

                this._frameBuffer.context.drawImage(
                    blockImage,
                    0,
                    0,
                    Block.WidthInPixels,
                    Block.HeightInPixels,
                    xOffset,
                    yOffset,
                    Block.WidthInPixels,
                    Block.HeightInPixels
                );

                const imageData = this._frameBuffer.context.getImageData(xOffset, yOffset, Block.WidthInPixels, Block.HeightInPixels);

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

                this._frameBuffer.context.putImageData(imageData, xOffset, yOffset);

                if (block.isSelected) {
                    this._frameBuffer.context.globalAlpha = 0.7;

                    this._frameBuffer.context.drawImage(
                        blockImage,
                        Block.WidthInPixels * 4,
                        0,
                        Block.WidthInPixels,
                        Block.HeightInPixels,
                        xOffset,
                        yOffset,
                        Block.WidthInPixels,
                        Block.HeightInPixels
                    );

                    this._frameBuffer.context.globalAlpha = 1.0;
                }
            }
        }
    }
}
