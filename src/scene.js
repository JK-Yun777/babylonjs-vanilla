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
import { makePhysicsObject } from "./utils.js";
import { createPolice } from "./police.js";
import { createAj } from "./aj.js";

export const createScene = async function () {
  // const sun = new BABYLON.PointLight(
  //   "Omni0",
  //   new BABYLON.Vector3(50, 50, 10),
  //   scene
  // );

  const light = new BABYLON.HemisphericLight(
    "light1",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  light.intensity = 0.7;

  // const camera = new BABYLON.ArcRotateCamera(
  //   "Camera",
  //   (3 * Math.PI) / 2,
  //   Math.PI / 3,
  //   15,
  //   BABYLON.Vector3.Zero(),
  //   scene
  // );

  // camera.attachControl(canvas, true);

  const camera = new BABYLON.FreeCamera(
    "camera1",
    new BABYLON.Vector3(-50, 50, -50),
    scene
  );

  camera.setTarget(new BABYLON.Vector3(55, 15, 55));

  camera.attachControl(canvas, true);

  await Ammo();
  const ammo = new BABYLON.AmmoJSPlugin(true);
  ammo.setMaxSteps(10);
  ammo.setFixedTimeStep(1 / 240);

  BABYLON.SceneLoader.Load(
    "src/unitySource/",
    "sceneWithoutCam.babylon",
    engine,
    function (scene) {
      scene.executeWhenReady(function (newMeshes) {
        scene.enablePhysics(new BABYLON.Vector3(0, -10, 0), ammo);

        // const camera = new BABYLON.ArcRotateCamera(
        //   "Camera",
        //   BABYLON.Tools.ToRadians(90),
        //   BABYLON.Tools.ToRadians(80),
        //   40,
        //   new BABYLON.Vector3(0, -2, 0),
        //   scene
        // );
        // camera.attachControl(canvas, true);

        const city = newMeshes.meshes;

        // Collision cannot be added while there are children (should be added ignoreParent: true).  Collision can only be added on a single object
        city.forEach(function (m) {
          if (m.parent) {
            m.physicsImpostor = new BABYLON.PhysicsImpostor(
              m,
              BABYLON.PhysicsImpostor.MeshImpostor,
              { mass: 0, restitution: 0.9, ignoreParent: true },
              scene
            );
            console.log(m.physicsImpostor.object.name);
          }
        });

        createSambaWoman(scene, canvas);
        // createPolice(scene, canvas);
        // createAj(scene, canvas);

        // const sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 1, scene);
        // sphere.position = new BABYLON.Vector3(-2, 10, 24);

        // sphere.physicsImpostor = new BABYLON.PhysicsImpostor(
        //   sphere,
        //   BABYLON.PhysicsImpostor.SphereImpostor,
        //   { mass: 5, restitution: 0.9 },
        //   scene
        // );

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

  return scene;
};
