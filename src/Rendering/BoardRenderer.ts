import { FrameBuffer } from "../FrameBuffer.js";
import { Board } from "../Logic/Board.js";
import { Block } from "../Logic/Block.js";
import { BlockColors, BlockColorKeys } from "../Logic/BlockColors.js";

export class BoardRenderer {
    constructor(private _frameBuffer: FrameBuffer) {}

    public createBlockCanvas(image: HTMLImageElement): HTMLCanvasElement {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height * 4;

        const context = canvas.getContext("2d") as CanvasRenderingContext2D;

        for (const color of BlockColorKeys) {
            const y = Block.HeightInPixels * color;

            context.drawImage(image, 0, y);

            const imageData = context.getImageData(0, y, image.width - Block.WidthInPixels, image.height);

            for (let i = 0; i < imageData.data.length; i += 4) {
                switch (color) {
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

            context.putImageData(imageData, 0, y);
        }

        return canvas;
    }

    public render(board: Board, blockImage: HTMLCanvasElement): void {
        for (let y = 0; y < Board.Height; y++) {
            for (let x = 0; x < Board.Width; x++) {
                const block = board.getBlock(x, y);

                if (!block.isActive) {
                    continue;
                }

                const xSrc = 0;
                const ySrc = Block.HeightInPixels * block.color;

                const xDest = Math.trunc(x * Block.WidthInPixels);
                const yDest = Math.trunc(y * Block.HeightInPixels + block.offsetY);

                this._frameBuffer.context.drawImage(
                    blockImage,
                    xSrc,
                    ySrc,
                    Block.WidthInPixels,
                    Block.HeightInPixels,
                    xDest,
                    yDest,
                    Block.WidthInPixels,
                    Block.HeightInPixels
                );

                if (block.isSelected) {
                    this._frameBuffer.context.drawImage(
                        blockImage,
                        Block.WidthInPixels * 4,
                        0,
                        Block.WidthInPixels,
                        Block.HeightInPixels,
                        xDest,
                        yDest,
                        Block.WidthInPixels,
                        Block.HeightInPixels
                    );
                }
            }
        }
    }
}
