function dividedDifferences(xs, ys) {
  const n = xs.length;
  const coeffs = ys.slice();

  for (let j = 1; j < n; j++) {
    for (let i = n - 1; i >= j; i--) {
      coeffs[i] = (coeffs[i] - coeffs[i - 1]) / (xs[i] - xs[i - j]);
    }
  }

  return coeffs;
}

function newtonPolynomial(coeffs, xs, x) {
  let result = coeffs[0];
  let term = 1;
  for (let i = 1; i < coeffs.length; i++) {
    term *= (x - xs[i - 1]);
    result += coeffs[i] * term;
  }
  return result;
}

export function runInterpolationDemo() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;

  const xs = [0, 1, 2, 3, 4];
  const ys = [1, 2, 0, 2, 1];
  let coeffs = dividedDifferences(xs, ys);

  const coeffDiv = document.getElementById("coefficients");

  let draggingIndex = null;

  canvas.addEventListener("mousedown", (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    for (let i = 0; i < xs.length; i++) {
      const px = xs[i] * 150 + 50;
      const py = H - ys[i] * 100 - 50;
      const dist = Math.hypot(px - mouseX, py - mouseY);
      if (dist < 10) {
        draggingIndex = i;
        break;
      }
    }
  });

  canvas.addEventListener("mouseup", () => {
    draggingIndex = null;
  });

  canvas.addEventListener("mousemove", (e) => {
    if (draggingIndex !== null) {
      const rect = canvas.getBoundingClientRect();
      const mouseY = e.clientY - rect.top;
      const y = (H - mouseY - 50) / 100;
      ys[draggingIndex] = Math.max(0, Math.min(3, y));
      coeffs = dividedDifferences(xs, ys);
      draw();
    }
  });

  function drawPoints() {
    ctx.fillStyle = "#00ffc8";
    for (let i = 0; i < xs.length; i++) {
      const px = xs[i] * 150 + 50;
      const py = H - ys[i] * 100 - 50;
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.font = "12px monospace";
      ctx.fillText(`(${xs[i].toFixed(2)}, ${ys[i].toFixed(2)})`, px + 8, py - 8);
    }
  }

  function drawPolynomial() {
    ctx.beginPath();
    for (let x = 0; x <= 4; x += 0.01) {
      const px = x * 150 + 50;
      const y = newtonPolynomial(coeffs, xs, x);
      const py = H - y * 100 - 50;
      if (x === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.strokeStyle = "#ff70ff";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    drawPoints();
    drawPolynomial();
    updateCoefficients();
  }

  function updateCoefficients() {
    coeffDiv.innerHTML = `<h3>Divided Differences</h3>` +
      coeffs.map((c, i) => `f[x0,...,x${i}]: ${c.toFixed(3)}`).join("<br>");
  }

  draw();
}
runInterpolationDemo();
