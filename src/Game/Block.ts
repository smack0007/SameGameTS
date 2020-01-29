import { BlockColors } from './BlockColors';

export class Block {
    public get Color() {
        return this._color;
    }
    
    constructor(private _color: BlockColors) {
    }
}