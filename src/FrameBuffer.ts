export class FrameBuffer {
    private _currentOffset = 0;
    private _canvases: HTMLCanvasElement[] = [];
    private _renderingContexts: CanvasRenderingContext2D[] = [];

    public get context(): CanvasRenderingContext2D {
        return this._renderingContexts[this._currentOffset];
    }

    constructor(
        frontBuffer: HTMLCanvasElement,
        backBuffer: HTMLCanvasElement,
        public readonly width: number,
        public readonly height: number
    ) {
        this._canvases.push(frontBuffer, backBuffer);

        this._renderingContexts.push(
            frontBuffer.getContext("2d") as CanvasRenderingContext2D,
            backBuffer.getContext("2d") as CanvasRenderingContext2D
        );

        for (const canvas of this._canvases) {
            canvas.width = this.width;
            canvas.height = this.height;
        }

        this._renderingContexts[0].fillRect(0, 0, this.width, this.height);
        this.present();
    }

    public addEventListener(type: string, listener: EventListener): void {
        for (const canvas of this._canvases) {
            canvas.addEventListener(type, listener);
        }
    }

    public present(): void {
        for (let i = 0; i < this._canvases.length; i++) {
            if (i === this._currentOffset) {
                this._canvases[this._currentOffset].style.visibility = "visible";
            } else {
                this._canvases[this._currentOffset].style.visibility = "hidden";
            }
        }

        this._currentOffset++;

        if (this._currentOffset >= this._canvases.length) {
            this._currentOffset = 0;
        }
    }
}
