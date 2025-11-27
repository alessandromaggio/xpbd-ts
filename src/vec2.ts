export class Vec2 {
    constructor(public x: number, public y: number) {}

    public add(other: Vec2): Vec2 {
        return new Vec2(this.x + other.x, this.y + other.y);
    }

    public scale(factor: number): Vec2 {
        return new Vec2(this.x * factor, this.y * factor);
    }
};