import { FrameBuffer } from "./FrameBuffer";
import { AssetLoader } from "./Assets/AssetLoader";
import { Board } from "./Logic/Board";
import { RNG } from "./Logic/RNG";
import { BoardRenderer } from "./Rendering/BoardRenderer";

export class Game {
    private _boardRenderer: BoardRenderer;

    private _board: Board;

    private _blockImage: HTMLCanvasElement | undefined;

    private _lastTime: number = 0;

    constructor(private _frameBuffer: FrameBuffer) {
        this._boardRenderer = new BoardRenderer(this._frameBuffer);

        const rng = new RNG(12345);
        this._board = new Board(rng);

        this._frameBuffer.addEventListener("mousedown", (ev) => this.onClick(ev as MouseEvent));

        this._frameBuffer.addEventListener("dblclick", (ev) => this.onDoubleClick(ev as MouseEvent));
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
}
