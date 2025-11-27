import { DrawingKit } from "./drawing-kit";

export interface IParticle {
    draw(kit: DrawingKit): void;
}