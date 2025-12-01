import { Pos } from './components/vec2';

export class Canvas {
    private _scale: number = 1;
    private simHeight: number = 0;
    private simWidth: number = 0;
    private canvasContext: CanvasRenderingContext2D;

    constructor(
        private canvas: HTMLCanvasElement,
        private window: Window,
        private simulationMinimumWidth: number
    ) {
        this.canvasContext = this.canvas.getContext('2d')!;
    }

    public init() {
        this.canvas.width = this.window.innerWidth;
        this.canvas.height = this.window.innerHeight;
        this._scale = Math.min(this.canvas.width, this.canvas.height) / this.simulationMinimumWidth;
        this.simHeight = this.canvas.height / this.scale;
        this.simWidth = this.canvas.width / this.scale;
    }

    public get context(): CanvasRenderingContext2D {
        return this.canvasContext;
    }

    public get simulationWidth(): number {
        return this.simWidth;
    }

    public get simulationHeight(): number {
        return this.simHeight;
    }

    public get scale(): number {
        return this._scale;
    }

    public X(pos: Pos): number {
        return pos.x * this.scale;
    }

    public Y(pos: Pos): number {
        return this.canvas.height - pos.y * this.scale;
    }
}
