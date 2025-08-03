export class Body {
  constructor(pos, vel, mass) {
    this.pos = pos;
    this.vel = vel;
    this.mass = mass;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
  }
}
