export function runVectorFieldDemo() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;

  const particles = [];
  const fieldSpacing = 40;
  const particleCount = 300;

  const infoPanel = document.getElementById("field-info");

  function getVector(x, y) {
    const cx = W / 2;
    const cy = H / 2;
    const dx = x - cx;
    const dy = y - cy;
    const mag = Math.sqrt(dx * dx + dy * dy) + 0.001;
    return {
      x: -dy / mag * 2,
      y: dx / mag * 2,
    };
  }
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      life: Math.random() * 100 + 50,
    });
  }

  function drawField() {
    ctx.strokeStyle = "#444";
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += fieldSpacing) {
      for (let y = 0; y < H; y += fieldSpacing) {
        const vec = getVector(x, y);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + vec.x * 10, y + vec.y * 10);
        ctx.stroke();
      }
    }
  }

  function updateParticles() {
    for (const p of particles) {
      const v = getVector(p.x, p.y);
      p.x += v.x;
      p.y += v.y;
      p.life--;
      if (p.x < 0 || p.x > W || p.y < 0 || p.y > H || p.life <= 0) {
        p.x = Math.random() * W;
        p.y = Math.random() * H;
        p.life = Math.random() * 100 + 50;
      }
    }
  }

  function drawParticles() {
    ctx.fillStyle = "#00ffe0";
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(0, 0, W, H);
    drawField();
    drawParticles();
  }

  function loop() {
    updateParticles();
    draw();
    requestAnimationFrame(loop);
  }

  if (infoPanel) {
    infoPanel.innerHTML = `
      <h2>🌀 Vector Field Info</h2>
      <p>This is a <strong>circular (rotational) vector field</strong> centered at the canvas center.</p>
      <ul>
        <li><b>Vector Function:</b> <code>F(x, y) = (-dy/r, dx/r)</code></li>
        <li><b>Behavior:</b> Particles follow swirling field lines</li>
        <li><b>Magnitude:</b> Normalized with slight amplification</li>
      </ul>
    `;
  }

  draw();
  loop();
}
runVectorFieldDemo();
