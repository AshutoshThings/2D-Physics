import { runOrbitDemo } from "./demos/demo1-orbit.js";
// import { runBulletCollisionDemo } from "./demos/demo2-bullet-collision.js";
// import { runInterpolationDemo } from "./demos/demo3-interpolation.js";
// import { runVectorFieldDemo } from "./demos/demo4-vectorfield.js";

const canvas = document.getElementById("canvas");

function clearCanvas() {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function loadDemo(demo) {
  clearCanvas();

  switch (demo) {
    case "orbit":
      runOrbitDemo(canvas);
      break;
    // case "bullet":
    //   runBulletCollisionDemo(canvas);
    //   break;
    // case "interpolation":
    //   runInterpolationDemo(canvas);
    //   break;
    // case "vector":
    //   runVectorFieldDemo(canvas);
    //   break;
    default:
      console.warn("Unknown demo:", demo);
  }
}

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => {
    const demo = card.getAttribute("data-demo");
    loadDemo(demo);
  });
});
