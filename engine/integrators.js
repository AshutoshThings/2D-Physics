import { Vector2D } from './Vector2D.js';

export function gravityForce(center, body) {
  const G = 5000;
  const centralMass = 100;
  const rVec = center.sub(body.pos);
  const r = rVec.length();
  const F = rVec.normalize().scale(G * body.mass * centralMass / (r * r));
  return F;
}

export function explicitEuler(body, dt, center) {
  const a = gravityForce(center, body).scale(1 / body.mass);
  body.pos = body.pos.add(body.vel.scale(dt));
  body.vel = body.vel.add(a.scale(dt));
}

export function rk4(body, dt, center) {
  const a = (pos, vel) => gravityForce(center, { pos, vel, mass: body.mass }).scale(1 / body.mass);

  const x0 = body.pos, v0 = body.vel;

  const a1 = a(x0, v0);
  const v1 = v0;
  const x1 = x0;

  const a2 = a(x1.add(v1.scale(dt / 2)), v1.add(a1.scale(dt / 2)));
  const v2 = v0.add(a1.scale(dt / 2));

  const a3 = a(x1.add(v2.scale(dt / 2)), v2.add(a2.scale(dt / 2)));
  const v3 = v0.add(a2.scale(dt / 2));

  const a4 = a(x1.add(v3.scale(dt)), v3.add(a3.scale(dt)));
  const v4 = v0.add(a3.scale(dt));

  body.pos = x0.add(v1.add(v2.scale(2)).add(v3.scale(2)).add(v4).scale(dt / 6));
  body.vel = v0.add(a1.add(a2.scale(2)).add(a3.scale(2)).add(a4).scale(dt / 6));
}
