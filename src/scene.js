import { controller } from "./controller.js";
import { createFollowCamera, createFreeCamera } from "./camera.js";
import { engine, canvas, scene } from "./initSetting.js";
import { createMonalisa } from "./monalisa.js";
import { createBanksy } from "./banksy.js";
import { createCampbell } from "./campbell.js";
import { creatStarrynight } from "./starrynight.js";
import { createBoxPointer, createSpherePointer } from "./fpsPointer.js";
import { createVincent, createWalkingVincent } from "./vincent.js";
import { createSambaWoman } from "./sambaWoman.js";

export const createScene = function () {
  const sun = new BABYLON.PointLight(
    "Omni0",
    new BABYLON.Vector3(60, 100, 10),
    scene
  );

  // const framesPerSecond = 60;
  // const gravity = -9.81;
  // scene.gravity = new BABYLON.Vector3(0, gravity / framesPerSecond, 0);
  // scene.collisionsEnabled = true;
  // scene.enablePhysics(
  //   new BABYLON.Vector3(0, -10, 0),
  //   new BABYLON.AmmoJSPlugin()
  // );

  BABYLON.SceneLoader.Load(
    "src/unitySource/",
    "scene_withoutCam.babylon",
    engine,
    function (scene) {
      scene.executeWhenReady(function () {
        scene.collisionsEnabled = true;

        // scene.enablePhysics(
        //   new BABYLON.Vector3(0, -10, 0),
        //   new BABYLON.AmmoJSPlugin()
        // );

        // scene.meshes.map((mesh) => {
        //   mesh.physicsImpostor = new BABYLON.PhysicsImpostor(
        //     mesh,
        //     BABYLON.PhysicsImpostor.BoxImpostor,
        //     { mass: 0.1 },
        //     scene
        //   );
        // });

        // scene.meshes.physicsImpostor = new BABYLON.PhysicsImpostor(
        //   scene.meshes,
        //   BABYLON.PhysicsImpostor.BoxImpostor,
        //   { mass: 1, restitution: 1, friction: 1 }
        // );
        // newScene.activeCamera.attachControl(canvas);
        // const ball = createSpherePointer(scene);
        // const camera = createFollowCamera(scene, canvas, ball);

        // console.log("ball", ball.move);
        // controller(ball);

        // createVincent(scene);
        // createVincentAnimation(scene);
        createSambaWoman(scene, canvas);
        // createWalkingVincent(scene, canvas);

        engine.runRenderLoop(function () {
          scene.render();
        });
      });
    },
    function (progress) {
      if (progress) {
        console.log("Loaded!!!");
      }
    }
  );

  //const camera =
  createFreeCamera(scene);

  return scene;
};
