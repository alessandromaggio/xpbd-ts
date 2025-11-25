import { IParticle } from './i-particle';
import { Pos } from './pos';

export class Circle implements IParticle {
    constructor(
        public pos: Pos,
        public radius: number,
        public fillColorHex: string
    ) {}

    public draw(c: CanvasRenderingContext2D, scale: number): void {
        c.beginPath();
        c.fillStyle = this.fillColorHex;
        c.arc(
            this.pos.x * scale,
            c.canvas.height - this.pos.y * scale,
            this.radius * scale,
            0,
            2 * Math.PI
        );
        c.fill();
    }
}