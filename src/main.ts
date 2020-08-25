import { Board } from "./Logic/Board";
import { BlockColors } from "./Logic/BlockColors";
import { Block } from "./Logic/Block";
import { BoardRenderer } from "./Rendering/BoardRenderer";

const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
canvas.addEventListener("mousedown", onCanvasMouseDown);

const graphics = canvas.getContext("2d") as CanvasRenderingContext2D;
const blockImage: HTMLImageElement = document.getElementById("blockImage") as HTMLImageElement;
const boardRenderer: BoardRenderer = new BoardRenderer(graphics, blockImage);

const board = new Board();

function init() {
    draw();
    setInterval(draw, 1000 / 60);
}

function draw() {
    graphics.fillRect(0, 0, graphics.canvas.width, graphics.canvas.height);

    boardRenderer.render(board);
}

function onCanvasMouseDown(event: MouseEvent) {
    if (event.x > 0 && event.x < Board.WidthInPixels &&
        event.y > 0 && event.y < Board.HeightInPixels) {
        board.onClick(event.x, event.y);
    }
}

init();
