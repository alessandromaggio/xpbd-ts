export class Vec2 {
    constructor(public x: number, public y: number) {}

    public add(other: Vec2): void {
      this.x += other.x;
      this.y += other.y;
    }

    public scale(factor: number): void {
      this.x *= factor;
      this.y *= factor;
    }

    public addScaled(other: Vec2, factor: number): void {
      this.x += other.x * factor;
      this.y += other.y * factor;
    }
};
