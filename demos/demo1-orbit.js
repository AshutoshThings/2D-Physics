import { Vector2D } from '../engine/Vector2D.js';
import { Body } from '../engine/Body.js';
import { explicitEuler, rk4 } from '../engine/integrators.js';

export function runOrbitDemo(canvas) {
  const statsDiv = document.getElementById('stats');
  const ctx = canvas.getContext('2d');
  const center = new Vector2D(canvas.width / 2, canvas.height / 2);
  const dt = 1 / 40;

  const radius = 100;
  const G = 5000;
  const centralMass = 100;
  const orbitSpeed = Math.sqrt((G * centralMass) / radius);

  const body = new Body(
    new Vector2D(center.x + radius, center.y),
    new Vector2D(0, -orbitSpeed),
    5
  );

  const trail = [];
  const integratorSelect = document.getElementById("integrator");

  function update() {
    const method = integratorSelect.value;
    if (method === 'euler') {
      explicitEuler(body, dt, center);
    } else {
      rk4(body, dt, center);
    }
    trail.push({ x: body.pos.x, y: body.pos.y });
    if (trail.length > 500) trail.shift();
  }

    function drawTrail() {
    for (let i = 1; i < trail.length; i++) {
        const opacity = i / trail.length; 
        ctx.beginPath();
        ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
        ctx.lineTo(trail[i].x, trail[i].y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`; 
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(center.x, center.y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    drawTrail();
    body.draw(ctx);
    // drawVectors();
    updateStats();
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  function updateStats() {
    const dx = body.pos.x - center.x;
    const dy = body.pos.y - center.y;
    const radius = Math.hypot(dx, dy);
    statsDiv.innerHTML = `
      <b>Position</b>: (${body.pos.x.toFixed(2)}, ${body.pos.y.toFixed(2)})<br>
      <b>Distance from center</b>: ${radius.toFixed(2)} px
    `;
  }

  loop();
}

const canvas = document.getElementById("canvas");
if (canvas) {
  runOrbitDemo(canvas);
}
