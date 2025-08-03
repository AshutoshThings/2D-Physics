import { Vector2D } from './Vector2D.js';

export class Body {
  constructor(position, velocity, mass) {
    this.pos = position;
    this.vel = velocity;
    this.mass = mass;
    this.radius = 5;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
  }
}
