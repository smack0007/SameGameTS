import { AssetLoader } from "./Assets/AssetLoader";
import { Board } from "./Logic/Board";
import { RNG } from "./Logic/RNG";
import { BoardRenderer } from "./Rendering/BoardRenderer";

export class Game {
    private _graphics: CanvasRenderingContext2D;
    private _boardRenderer: BoardRenderer;

    private _board: Board;

    private _blockImage: HTMLImageElement | undefined;

    private _lastTime: number = 0;

    constructor(
        private _canvas: HTMLCanvasElement
    ) {
        this._graphics = this._canvas.getContext("2d") as CanvasRenderingContext2D;
        this._boardRenderer = new BoardRenderer(this._graphics);

        const rng = new RNG(12345);
        this._board = new Board(rng);

        this._canvas.addEventListener("mousedown", ev => this.onClick(ev));
        this._canvas.addEventListener("dblclick", ev => this.onDoubleClick(ev));
    }

    public run(): void {
        AssetLoader.loadImages("assets/block.png").then(images => {
            this._blockImage = images[0];
            this.init();
        });
    }

    private init(): void {
        this.draw();

        requestAnimationFrame(time => this.tick(time));
    }

    private onClick(event: MouseEvent) {
        if (
            event.x > 0 &&
            event.x < Board.WidthInPixels &&
            event.y > 0 &&
            event.y < Board.HeightInPixels
        ) {
            this._board.onClick(event.x, event.y);
        }
    }

    private onDoubleClick(event: MouseEvent) {
        if (
            event.x > 0 &&
            event.x < Board.WidthInPixels &&
            event.y > 0 &&
            event.y < Board.HeightInPixels
        ) {
            this._board.onDoubleClick();
        }
    }

    private tick(time: number): void {
        if (this._lastTime > 0) {
            const elapsed = (time - this._lastTime) / 1000.0;
            console.info(elapsed);
            this.update(elapsed);
            this.draw();
        }

        this._lastTime = time;

        requestAnimationFrame(elapsed => this.tick(elapsed));
    }

    private update(elapsed: number): void {
        this._board.update(elapsed);
    }

    private draw(): void {
        this._graphics.fillRect(0, 0, this._graphics.canvas.width, this._graphics.canvas.height);

        this._boardRenderer.render(this._board, this._blockImage as HTMLImageElement);
    }
}