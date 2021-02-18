import { FrameBuffer } from "./FrameBuffer.js";
import { AssetLoader } from "./Assets/AssetLoader.js";
import { Board } from "./Logic/Board.js";
import { RNG } from "./Logic/RNG.js";
import { BoardRenderer } from "./Rendering/BoardRenderer.js";

export class Game {
    private _boardRenderer: BoardRenderer;

    private _board: Board;

    private _blockImage: HTMLCanvasElement | undefined;

    private _lastTime: number = 0;

    private _textOverlayElement: HTMLDivElement;
    private _scoreElement: HTMLDivElement;
    private _selectedElement: HTMLDivElement;

    constructor(private _frameBuffer: FrameBuffer) {
        this._boardRenderer = new BoardRenderer(this._frameBuffer);

        const rng = new RNG(12345);
        this._board = new Board(rng);

        this._frameBuffer.addEventListener("mousedown", (ev) => this.onClick(ev as MouseEvent));

        this._frameBuffer.addEventListener("dblclick", (ev) => this.onDoubleClick(ev as MouseEvent));

        this._textOverlayElement = document.createElement("div");
        this._textOverlayElement.style.display = "grid";
        this._textOverlayElement.style.gridTemplateColumns = "50% 50%";
        this._textOverlayElement.style.alignItems = "center";
        this._textOverlayElement.style.color = "white";
        this._textOverlayElement.style.fontSize = "24px";
        this._textOverlayElement.style.pointerEvents = "none";
        this._textOverlayElement.style.userSelect = "none";
        this._textOverlayElement.style.position = "absolute";
        this._textOverlayElement.style.left = "0";
        this._textOverlayElement.style.top = Board.HeightInPixels + "px";
        this._textOverlayElement.style.width = Board.WidthInPixels + "px";
        this._textOverlayElement.style.height = this._frameBuffer.height - Board.HeightInPixels + "px";
        this._frameBuffer.element.parentElement?.appendChild(this._textOverlayElement);

        this._scoreElement = document.createElement("div");
        this._textOverlayElement.append(this._scoreElement);

        this._selectedElement = document.createElement("div");
        this._textOverlayElement.append(this._selectedElement);

        this.updateTextOverlay();
    }

    public run(): void {
        AssetLoader.loadImages("assets/block.png").then((images) => {
            this._blockImage = this._boardRenderer.createBlockCanvas(images[0]);

            this.init();
        });
    }

    private init(): void {
        this.draw();

        requestAnimationFrame((time) => this.tick(time));
    }

    private onClick(event: MouseEvent) {
        if (event.x > 0 && event.x < Board.WidthInPixels && event.y > 0 && event.y < Board.HeightInPixels) {
            this._board.onClick(event.x, event.y);
            this.updateTextOverlay();
        }
    }

    private onDoubleClick(event: MouseEvent) {
        if (event.x > 0 && event.x < Board.WidthInPixels && event.y > 0 && event.y < Board.HeightInPixels) {
            this._board.onDoubleClick();
        }
    }

    private tick(time: number): void {
        if (this._lastTime > 0) {
            const elapsed = (time - this._lastTime) / 1000.0;
            this.update(elapsed);
            this.draw();
        }

        this._lastTime = time;

        requestAnimationFrame((elapsed) => this.tick(elapsed));
    }

    private update(elapsed: number): void {
        this._board.update(elapsed);
    }

    private draw(): void {
        this._frameBuffer.context.fillRect(0, 0, this._frameBuffer.width, this._frameBuffer.height);

        this._boardRenderer.render(this._board, this._blockImage as HTMLCanvasElement);

        this._frameBuffer.present();
    }

    private updateTextOverlay(): void {
        this._scoreElement.innerText = "Score: 0";
        this._selectedElement.innerText = "Selected: " + this._board.selectedBlockCount;
    }
}
