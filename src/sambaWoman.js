export const createSambaWoman = (scene, canvas) => {
  const light = new BABYLON.HemisphericLight(
    "light1",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  light.intensity = 0.2;

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

  // Load hero character
  BABYLON.SceneLoader.ImportMesh(
    "",
    "src/unitySource/",
    "HVGirl.glb",
    scene,
    function (newMeshes, particleSystems, skeletons, animationGroups) {
      const hero = newMeshes[0];

      //Add collider
      const authoredStartPosition = new BABYLON.Vector3(-5, 0, 10);
      const authoredCenterMassOffset = new BABYLON.Vector3(0, 0, 0);

      hero.position = authoredCenterMassOffset;

      const bodyVisible = false;
      const box = BABYLON.MeshBuilder.CreateBox(
        "box1",
        { width: 2, height: 2, depth: 1 },
        scene
      );

      box.position.y = -1;
      box.isVisible = bodyVisible;
      hero.addChild(box);

      box.physicsImpostor = new BABYLON.PhysicsImpostor(
        box,
        BABYLON.PhysicsImpostor.BoxImpostor,
        { mass: 0 },
        scene
      );

      hero.physicsImpostor = new BABYLON.PhysicsImpostor(
        hero,
        BABYLON.PhysicsImpostor.NoImpostor,
        { mass: 3 },
        scene
      );

      hero.position = authoredStartPosition;
      hero.scaling.scaleInPlace(0.1);

      camera1.target = hero;

      // Add animations
      const heroSpeed = 0.08;
      const heroSpeedBackwards = 0.01;
      const heroRotationSpeed = 0.1;

      let animating = true;

      const walkAnim = scene.getAnimationGroupByName("Walking");
      const walkBackAnim = scene.getAnimationGroupByName("WalkingBack");
      const idleAnim = scene.getAnimationGroupByName("Idle");
      const sambaAnim = scene.getAnimationGroupByName("Samba");

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
            } else if (inputMap["b"]) {
              //Samba!
              sambaAnim.start(true, 1.0, sambaAnim.from, sambaAnim.to, false);
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
            sambaAnim.stop();
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
