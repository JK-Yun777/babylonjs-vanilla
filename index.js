import { createScene } from "./src/scene.js";
import { engine } from "./src/initSetting.js";

window.addEventListener("DOMContentLoaded", async function () {
  const scene = await createScene();
  // createPointerLock(scene);

  engine.runRenderLoop(function () {
    scene.render();
  });

  // the canvas/window resize event handler
  window.addEventListener("resize", function () {
    engine.resize();
  });
});
