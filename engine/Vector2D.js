export class Vector2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(v) { return new Vector2D(this.x + v.x, this.y + v.y); }
  sub(v) { return new Vector2D(this.x - v.x, this.y - v.y); }
  scale(s) { return new Vector2D(this.x * s, this.y * s); }
  length() { return Math.hypot(this.x, this.y); }
  normalize() {
    const len = this.length();
    return len === 0 ? new Vector2D(0, 0) : this.scale(1 / len);
  }
  get mag() {
  return Math.sqrt(this.x * this.x + this.y * this.y);
}
  dot(v) {
    return this.x * v.x + this.y * v.y;
  }
}
