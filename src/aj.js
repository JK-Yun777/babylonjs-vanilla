export const createAj = (scene, canvas) => {
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

  // Load aj character
  BABYLON.SceneLoader.ImportMesh(
    "",
    "src/unitySource/",
    "aj.glb",
    scene,
    function (newMeshes, particleSystems, skeletons, animationGroups) {
      const aj = newMeshes[0];
      console.log(animationGroups);

      // //Add collider
      const authoredStartPosition = new BABYLON.Vector3(-5, 0, 30);
      const authoredCenterMassOffset = new BABYLON.Vector3(0, 0, 0);

      aj.position = authoredCenterMassOffset;

      const bodyVisible = false;
      const box = BABYLON.MeshBuilder.CreateBox(
        "box1",
        { width: 2, height: 2, depth: 1 },
        scene
      );

      box.position.y = -1;
      box.isVisible = bodyVisible;
      aj.addChild(box);

      box.physicsImpostor = new BABYLON.PhysicsImpostor(
        box,
        BABYLON.PhysicsImpostor.BoxImpostor,
        { mass: 0 },
        scene
      );

      aj.physicsImpostor = new BABYLON.PhysicsImpostor(
        aj,
        BABYLON.PhysicsImpostor.NoImpostor,
        { mass: 3 },
        scene
      );

      aj.position = authoredStartPosition;
      aj.scaling.scaleInPlace(0.9);

      camera1.target = aj;

      // // Add animations
      const ajSpeed = 0.08;
      const ajSpeedBackwards = 0.01;
      const ajRotationSpeed = 0.1;

      let animating = true;

      const walkAnim = scene.getAnimationGroupByName("walk");
      const walkBackAnim = scene.getAnimationGroupByName("walkbackwards");
      const idleAnim = scene.getAnimationGroupByName("idle");
      const runAnim = scene.getAnimationGroupByName("run");
      const jumpAnim = scene.getAnimationGroupByName("jump");
      const danceAnim = scene.getAnimationGroupByName("dance");

      //Rendering loop (executed for everyframe)
      scene.onBeforeRenderObservable.add(() => {
        let keydown = false;
        //Manage the movements of the character (e.g. position, direction)
        if (inputMap["w"]) {
          aj.moveWithCollisions(aj.forward.scaleInPlace(ajSpeed));
          keydown = true;
        }
        if (inputMap["s"]) {
          aj.moveWithCollisions(aj.forward.scaleInPlace(-ajSpeedBackwards));
          keydown = true;
        }
        if (inputMap["a"]) {
          aj.rotate(BABYLON.Vector3.Up(), -ajRotationSpeed);
          keydown = true;
        }
        if (inputMap["d"]) {
          aj.rotate(BABYLON.Vector3.Up(), ajRotationSpeed);
          keydown = true;
        }
        if (inputMap["b"]) {
          keydown = true;
        }
        if (inputMap["v"]) {
          keydown = true;
        }
        if (inputMap["f"]) {
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
            } else if (inputMap["b"]) {
              //dance
              danceAnim.start(true, 1.0, danceAnim.from, danceAnim.to, false);
            } else if (inputMap["v"]) {
              //Run
              runAnim.start(true, 1.0, runAnim.from, runAnim.to, false);
            } else if (inputMap["f"]) {
              //Jump
              jumpAnim.start(true, 1.0, jumpAnim.from, jumpAnim.to, false);
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
            danceAnim.stop();
            walkAnim.stop();
            walkBackAnim.stop();
            runAnim.stop();
            jumpAnim.stop();

            //Ensure animation are played only once per rendering loop
            animating = false;
          }
        }
      });
    }
  );
};
