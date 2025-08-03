const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const stats = document.getElementById("stats");
const collisionTypeSelect = document.getElementById("collisionType");

let collisionType = collisionTypeSelect.value;

collisionTypeSelect.addEventListener("change", () => {
  collisionType = collisionTypeSelect.value;
  reset();
});

const bullet = {
  x: 100,
  y: canvas.height / 2,
  vx: 5,
  vy: 0,
  radius: 10,
  mass: 2,
  color: "red"
};

const block = {
  x: 600,
  y: canvas.height / 2,
  vx: 0,
  vy: 0,
  radius: 30,
  mass: 8,
  color: "blue"
};

function drawCircle(obj, after = false) {
  ctx.beginPath();
  ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
  ctx.fillStyle = obj.color;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(obj.x, obj.y);
  ctx.strokeStyle = after ? "yellow" : "white";
  ctx.lineTo(obj.x + obj.vx * 10, obj.y);
  ctx.stroke();
}

function resolveCollision() {
  const m1 = bullet.mass;
  const m2 = block.mass;
  const u1 = bullet.vx;
  const u2 = block.vx;

  let v1, v2;

  if (collisionType === "elastic") {
    v1 = ((m1 - m2) / (m1 + m2)) * u1 + ((2 * m2) / (m1 + m2)) * u2;
    v2 = ((2 * m1) / (m1 + m2)) * u1 + ((m2 - m1) / (m1 + m2)) * u2;
  } else {
    const vFinal = (m1 * u1 + m2 * u2) / (m1 + m2);
    v1 = v2 = vFinal;
  }

  bullet.vx = v1;
  block.vx = v2;
}

function update() {
  bullet.x += bullet.vx;
  block.x += block.vx;
  const dist = Math.abs(bullet.x - block.x);
  if (dist <= bullet.radius + block.radius && !collisionHappened) {
    resolveCollision();
    collisionHappened = true;
  }

  draw();
}

function draw() {
  ctx.fillStyle = "rgba(18, 18, 18, 0.4)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawCircle(bullet, collisionHappened);
  drawCircle(block, collisionHappened);

  showStats();
}

function showStats() {
  const KE = (m, v) => 0.5 * m * v * v;
  const P = (m, v) => m * v;

  stats.innerHTML = `
    <b>Before/After Collision:</b><br>
    Bullet Momentum: ${P(bullet.mass, bullet.vx).toFixed(2)}<br>
    Block Momentum: ${P(block.mass, block.vx).toFixed(2)}<br>
    Total Momentum: ${(P(bullet.mass, bullet.vx) + P(block.mass, block.vx)).toFixed(2)}<br><br>
    Bullet KE: ${KE(bullet.mass, bullet.vx).toFixed(2)}<br>
    Block KE: ${KE(block.mass, block.vx).toFixed(2)}<br>
    Total KE: ${(KE(bullet.mass, bullet.vx) + KE(block.mass, block.vx)).toFixed(2)}
  `;
}

function reset() {
  bullet.x = 100;
  bullet.vx = 5;
  block.x = 600;
  block.vx = 0;
  collisionHappened = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

let collisionHappened = false;
reset();

function animate() {
  update();
  requestAnimationFrame(animate);
}
animate();
