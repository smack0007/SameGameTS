import { FrameBuffer } from "./FrameBuffer";
import { Game } from "./Game";

const appElement: HTMLElement = document.getElementById("app") as HTMLElement;

const frontBuffer: HTMLCanvasElement = document.createElement("canvas");
appElement.appendChild(frontBuffer);

const backBuffer: HTMLCanvasElement = document.createElement("canvas");
appElement.appendChild(backBuffer);

const frameBuffer: FrameBuffer = new FrameBuffer(
    frontBuffer,
    backBuffer,
    window.innerWidth,
    window.innerHeight
);

const game = new Game(frameBuffer);
game.run();
