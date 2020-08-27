export class RNG {
    private static readonly a = 16807;
    private static readonly m = 2147483647;
    private static readonly q = 127773;
    private static readonly r = 2836;

    constructor(private _seed: number) {
        if (this._seed <= 0 || this._seed === Number.MAX_VALUE) {
            throw new Error("Seed out of range.");
        }
    }

    public nextDouble(): number {
        const hi = this._seed / RNG.q;
        const lo = this._seed % RNG.q;

        this._seed = RNG.a * lo - RNG.r * hi;

        if (this._seed <= 0) {
            this._seed = this._seed + RNG.m;
        }

        return (this._seed * 1.0) / RNG.m;
    }

    public nextInt(min: number, max: number): number {
        const range = Math.round(max) - Math.round(min);
        return min + Math.round(range * this.nextDouble());
    }
}
