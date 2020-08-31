import { Game } from "./Game";

const canvas: HTMLCanvasElement = document.getElementById(
    "canvas"
) as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const game = new Game(canvas);
game.run();
