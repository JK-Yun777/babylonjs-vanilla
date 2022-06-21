import { engine } from "./initSetting.js";

export const createVincent = (scene) => {
  const result = BABYLON.SceneLoader.Append(
    "src/unitySource/",
    "Vincent.babylon",
    scene,
    function (scene) {
      scene.executeWhenReady(() => {
        engine.runRenderLoop(function () {
          scene.render();
        });
      });
    }
  );
};

export const createWalkingVincent = (scene, canvas) => {
  const camera1 = new BABYLON.ArcRotateCamera(
    "camera1",
    Math.PI / 2,
    Math.PI / 4,
    10,
    new BABYLON.Vector3(0, -5, 0),
    scene
  );
  scene.activeCamera = camera1;
  scene.activeCamera.attachControl(canvas, true);
  camera1.lowerRadiusLimit = 2;
  camera1.upperRadiusLimit = 10;
  camera1.wheelDeltaPercentage = 0.09;

  const inputMap = {};
  scene.actionManager = new BABYLON.ActionManager(scene);
  scene.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
      BABYLON.ActionManager.OnKeyDownTrigger,
      function (evt) {
        inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
      }
    )
  );
  scene.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
      BABYLON.ActionManager.OnKeyUpTrigger,
      function (evt) {
        inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
      }
    )
  );

  // Load hero character
  BABYLON.SceneLoader.ImportMesh(
    "",
    "src/unitySource/",
    "Vincent.glb",
    scene,
    function (newMeshes, particleSystems, skeletons, animationGroups) {
      const hero = newMeshes[0];
      console.log("Vincent:", hero);
      const mat = new BABYLON.StandardMaterial(null, scene);
      mat.diffuseTexture = new BABYLON.Texture(
        "src/unitySource/Vincent_texture_image.jpg",
        scene
      );
      hero.material = mat;
      //Scale the model down
      hero.scaling.scaleInPlace(1);

      //Lock camera on the character
      camera1.target = hero;

      //Hero character variables
      const heroSpeed = 0.03;
      const heroSpeedBackwards = 0.01;
      const heroRotationSpeed = 0.1;

      let animating = true;

      const walkAnim = scene.getAnimationGroupByName("walk");
      const walkBackAnim = scene.getAnimationGroupByName("walkBack");
      const idleAnim = scene.getAnimationGroupByName("idle");

      //Rendering loop (executed for everyframe)
      scene.onBeforeRenderObservable.add(() => {
        let keydown = false;
        //Manage the movements of the character (e.g. position, direction)
        if (inputMap["w"]) {
          hero.moveWithCollisions(hero.forward.scaleInPlace(heroSpeed));
          keydown = true;
        }
        if (inputMap["s"]) {
          hero.moveWithCollisions(
            hero.forward.scaleInPlace(-heroSpeedBackwards)
          );
          keydown = true;
        }
        if (inputMap["a"]) {
          hero.rotate(BABYLON.Vector3.Up(), -heroRotationSpeed);
          keydown = true;
        }
        if (inputMap["d"]) {
          hero.rotate(BABYLON.Vector3.Up(), heroRotationSpeed);
          keydown = true;
        }
        if (inputMap["b"]) {
          keydown = true;
        }

        //Manage animations to be played
        if (keydown) {
          if (!animating) {
            animating = true;
            if (inputMap["s"]) {
              //Walk backwards
              walkBackAnim.start(
                true,
                1.0,
                walkBackAnim.from,
                walkBackAnim.to,
                false
              );
            } else {
              //Walk
              walkAnim.start(true, 1.0, walkAnim.from, walkAnim.to, false);
            }
          }
        } else {
          if (animating) {
            //Default animation is idle when no key is down
            idleAnim.start(true, 1.0, idleAnim.from, idleAnim.to, false);

            //Stop all animations besides Idle Anim when no key is down

            walkAnim.stop();
            walkBackAnim.stop();

            //Ensure animation are played only once per rendering loop
            animating = false;
          }
        }
      });
    }
  );
};
