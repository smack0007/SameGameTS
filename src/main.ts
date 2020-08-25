import { Board } from "./Game/Board";
import { BlockColors } from "./Game/BlockColors";
import { Block } from "./Game/Block";

const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
canvas.addEventListener("mousedown", onCanvasMouseDown);

const graphics = canvas.getContext("2d") as CanvasRenderingContext2D;

const blockImage: HTMLImageElement = document.getElementById("blockImage") as HTMLImageElement;

const board = new Board();

function init() {
    draw();
    setInterval(draw, 1000 / 60);
}

function draw() {
    graphics.fillRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < Board.Height; y++) {
        for (let x = 0; x < Board.Width; x++) {
            const block = board.getBlock(x, y);
            const xOffset = x * Block.WidthInPixels;
            const yOffset = y * Block.HeightInPixels;

            graphics.drawImage(
                blockImage,
                0,
                0,
                Block.WidthInPixels,
                Block.HeightInPixels,
                xOffset,
                yOffset,
                Block.WidthInPixels,
                Block.HeightInPixels);

            const imageData = graphics.getImageData(xOffset, yOffset, Block.WidthInPixels, Block.HeightInPixels);

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

            graphics.putImageData(imageData, xOffset, yOffset);

            if (block.isSelected) {
                graphics.globalAlpha = 0.7;

                graphics.drawImage(
                    blockImage,
                    Block.WidthInPixels * 4,
                    0,
                    Block.WidthInPixels,
                    Block.HeightInPixels,
                    xOffset,
                    yOffset,
                    Block.WidthInPixels,
                    Block.HeightInPixels);

                    graphics.globalAlpha = 1.0;
            }
        }
    }
}

function onCanvasMouseDown(event: MouseEvent) {
    if (event.x > 0 && event.x < Board.WidthInPixels &&
        event.y > 0 && event.y < Board.HeightInPixels) {
        board.onClick(event.x, event.y);
    }
}

init();
