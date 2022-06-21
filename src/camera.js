export const createFollowCamera = function (scene, canvas, target) {
  const camera = new BABYLON.FollowCamera(
    "tankFollowCamera",
    new BABYLON.Vector3(10, 0, 0),
    scene
  );
  camera.heightOffset = 2;
  camera.rotationOffset = 180;
  camera.cameraAcceleration = 0.1;
  camera.maxCameraSpeed = 1;
  camera.lockedTarget = target;
  camera.attachControl(canvas, true);
  console.log(camera.inputs);

  camera.inputs.removeByType("FollowCameraPointersInput");

  // const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI/2, Math.PI/3, 10, BABYLON.Vector3.Zero(), scene);
  //             camera.setTarget(target);
  //             camera.inputs.remove(camera.inputs.attached.mousewheel);
  // console.log("inputs", camera.inputs)
  // //camera.inputs.clear();
  // camera.inputs.removeByType('ArcRotateCameraPointersInput');
  // camera.attachControl(canvas, true);

  return camera;
};

export const createFreeCamera = (scene, canvas) => {
  const camera = new BABYLON.FreeCamera(
    "freeCamera",
    new BABYLON.Vector3(0, 2, 0),
    scene
  );
  camera.attachControl(canvas, true);

  camera.applyGravity = true;
  camera.checkCollisions = true;

  camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);

  camera.minZ = 0.45;
  camera.speed = 0.75;
  camera.angularSensibility = 4000;

  camera.keysUp.push(87);
  camera.keysLeft.push(65);
  camera.keysDown.push(83);
  camera.keysRight.push(68);
};
