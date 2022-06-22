export const createPolice = (scene, canvas) => {
  const camera1 = new BABYLON.ArcRotateCamera(
    "camera1",
    Math.PI / 2.2,
    Math.PI / 2.5,
    40,
    new BABYLON.Vector3(0, -5, 0),
    scene
  );
  scene.activeCamera = camera1;
  scene.activeCamera.attachControl(canvas, true);
  camera1.lowerRadiusLimit = 2;
  camera1.upperRadiusLimit = 100;
  camera1.wheelDeltaPercentage = 0.09;
  camera1.applyGravity = true;
  camera1.checkCollisions = true;
  camera1.ellipsoid = new BABYLON.Vector3(1, 1, 1);

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

  // Load police character
  BABYLON.SceneLoader.ImportMesh(
    "",
    "src/unitySource/",
    "police.glb",
    scene,
    function (newMeshes, particleSystems, skeletons, animationGroups) {
      const police = newMeshes[0];
      console.log(animationGroups);

      //Add collider
      const authoredStartPosition = new BABYLON.Vector3(-5, 0, 15);
      const authoredCenterMassOffset = new BABYLON.Vector3(0, 0, 0);

      police.position = authoredCenterMassOffset;

      const bodyVisible = false;
      const box = BABYLON.MeshBuilder.CreateBox(
        "box1",
        { width: 2, height: 2, depth: 1 },
        scene
      );

      box.position.y = -1;
      box.isVisible = bodyVisible;
      police.addChild(box);

      box.physicsImpostor = new BABYLON.PhysicsImpostor(
        box,
        BABYLON.PhysicsImpostor.BoxImpostor,
        { mass: 0 },
        scene
      );

      police.physicsImpostor = new BABYLON.PhysicsImpostor(
        police,
        BABYLON.PhysicsImpostor.NoImpostor,
        { mass: 3 },
        scene
      );

      police.position = authoredStartPosition;
      police.scaling.scaleInPlace(1.5);
      camera1.target = police;

      const policeSpeed = 0.08;

      const policeRotationSpeed = 0.1;

      let animating = true;

      const walkAnim = scene.getAnimationGroupByName("walk");
      const runAnim = scene.getAnimationGroupByName("run");
      const idleAnim = scene.getAnimationGroupByName("idle");

      //Rendering loop (executed for everyframe)
      scene.onBeforeRenderObservable.add(() => {
        let keydown = false;
        //Manage the movements of the character (e.g. position, direction)
        if (inputMap["w"]) {
          police.moveWithCollisions(police.forward.scaleInPlace(policeSpeed));
          keydown = true;
        }
        if (inputMap["a"]) {
          police.rotate(BABYLON.Vector3.Up(), -policeRotationSpeed);
          keydown = true;
        }
        if (inputMap["d"]) {
          police.rotate(BABYLON.Vector3.Up(), policeRotationSpeed);
          keydown = true;
        }
        if (inputMap["b"]) {
          keydown = true;
        }

        //Manage animations to be played
        if (keydown) {
          if (!animating) {
            animating = true;
            if (inputMap["b"]) {
              //runAnim backwards
              runAnim.start(true, 1.0, runAnim.from, runAnim.to, false);
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
            runAnim.stop();

            //Ensure animation are played only once per rendering loop
            animating = false;
          }
        }
      });
    }
  );
};
