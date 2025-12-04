export class Vec2 {
  constructor(public x: number, public y: number) {}

  public add(other: Vec2): Vec2 {
    this.x += other.x;
    this.y += other.y;
    return this;
  }

  public scale(factor: number): Vec2 {
    this.x *= factor;
    this.y *= factor;
    return this;
  }

  public addScaled(other: Vec2, factor: number): Vec2 {
    this.x += other.x * factor;
    this.y += other.y * factor;
    return this;
  }

  public clone(): Vec2 {
    return new Vec2(this.x, this.y);
  }

  public subtract(other: Vec2): Vec2 {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  }

  public subtractScaled(other: Vec2, factor: number): Vec2 {
    this.x -= other.x * factor;
    this.y -= other.y * factor;
    return this;
  }

  public length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public dot(other: Vec2): number {
    return this.x * other.x + this.y * other.y;
  }

  public normalize(): Vec2 {
    const len = this.length();
    if (len > 0) {
      this.x /= len;
      this.y /= len;
    }
    return this;
  }
};
