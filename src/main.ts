import { AssetLoader } from "./Assets/AssetLoader";
import { Board } from "./Logic/Board";
import { BoardRenderer } from "./Rendering/BoardRenderer";
import { RNG } from "./Logic/RNG";

const canvas: HTMLCanvasElement = document.getElementById(
    "canvas"
) as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.addEventListener("mousedown", onCanvasMouseDown);

const rng = new RNG(1234);
const board = new Board(rng);

const graphics = canvas.getContext("2d") as CanvasRenderingContext2D;
let boardRenderer: BoardRenderer;

AssetLoader.loadImages("assets/block.png").then((images) => {
    boardRenderer = new BoardRenderer(graphics, images[0]);
    init();
});

function init() {
    draw();
    setInterval(draw, 1000 / 60);
}

function draw() {
    graphics.fillRect(0, 0, graphics.canvas.width, graphics.canvas.height);

    boardRenderer.render(board);
}

function onCanvasMouseDown(event: MouseEvent) {
    if (
        event.x > 0 &&
        event.x < Board.WidthInPixels &&
        event.y > 0 &&
        event.y < Board.HeightInPixels
    ) {
        board.onClick(event.x, event.y);
    }
}
