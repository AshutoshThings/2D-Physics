export function newtonSolve(f, df, t0, maxIter = 10, epsilon = 1e-6) {
  let t = t0;
  for (let i = 0; i < maxIter; i++) {
    const ft = f(t);
    const dft = df(t);
    if (Math.abs(dft) < 1e-8) break;
    const dt = ft / dft;
    t -= dt;
    if (Math.abs(dt) < epsilon) return t;
  }
  return null;
}
