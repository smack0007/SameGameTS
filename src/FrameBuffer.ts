export class FrameBuffer {
    private _frontBufferContext: CanvasRenderingContext2D;

    private _backBuffer: HTMLCanvasElement;
    private _backBufferContext: CanvasRenderingContext2D;

    public get context(): CanvasRenderingContext2D {
        return this._backBufferContext;
    }

    public get width(): number {
        return this._frontBuffer.width;
    }

    public get height(): number {
        return this._frontBuffer.height;
    }

    constructor(private _frontBuffer: HTMLCanvasElement) {
        this._frontBufferContext = this._frontBuffer.getContext("2d") as CanvasRenderingContext2D;

        this._backBuffer = document.createElement("canvas") as HTMLCanvasElement;
        this._backBuffer.width = this._frontBuffer.width;
        this._backBuffer.height = this._frontBuffer.height;
        this._backBufferContext = this._backBuffer.getContext("2d") as CanvasRenderingContext2D;

        this._backBufferContext.fillRect(0, 0, this.width, this.height);
        this.present();
    }

    public addEventListener(type: string, listener: EventListener): void {
        this._frontBuffer.addEventListener(type, listener);
    }

    public present(): void {
        this._frontBufferContext.drawImage(this._backBuffer, 0, 0);
    }
}
