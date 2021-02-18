import { FrameBuffer } from "./FrameBuffer.js";
import { Game } from "./Game.js";

const appElement: HTMLElement = document.getElementById("app") as HTMLElement;

const frontBuffer: HTMLCanvasElement = document.createElement("canvas");
frontBuffer.width = window.innerWidth;
frontBuffer.height = window.innerHeight;
appElement.appendChild(frontBuffer);

const frameBuffer: FrameBuffer = new FrameBuffer(frontBuffer);

const game = new Game(frameBuffer);
game.run();
