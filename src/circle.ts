import { IParticle } from './i-particle';
import { DrawingKit } from './drawing-kit';
import { Vec2 } from './vec2';

export class Circle implements IParticle {
    constructor(
        public pos: Vec2,
        public vel: Vec2,
        public radius: number,
        public fillColorHex: string
    ) {}

    public draw(kit: DrawingKit): void {
        const { c, scale } = kit;
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