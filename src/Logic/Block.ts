import { BlockColors } from "./BlockColors";

export class Block {
    public static readonly WidthInPixels = 32;
    public static readonly HeightInPixels = 32;

    public get color(): BlockColors {
        return this._color;
    }

    public get isSelected(): boolean {
        return this._isSelected;
    }

    constructor(
        private _color: BlockColors,
        private _isSelected: boolean = false) {
    }

    public select(): void {
        this._isSelected = true;
    }

    public unselect(): void {
        this._isSelected = false;
    }
}