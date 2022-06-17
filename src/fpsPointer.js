export const createBoxPointer = (scene) => {
  const tank = new BABYLON.MeshBuilder.CreateBox(
    "tank",
    { height: 0.1, depth: 0.1, width: 0.1 },
    scene
  );
  const tankMaterial = new BABYLON.StandardMaterial("tankMaterial", scene);
  tankMaterial.diffuseColor = new BABYLON.Color3(1, 0, 5);

  tank.material = tankMaterial;
  tank.position.y = 5;
  tank.speed = 1;
  tank.frontVector = new BABYLON.Vector3(0, 0, 1);

  return tank;
};

export const createSpherePointer = (scene) => {
  const ballPointer = new BABYLON.MeshBuilder.CreateSphere(
    "ballPointer",
    { segments: 16, diameter: 0.1 },
    scene
  );
  const ballPointerMaterial = new BABYLON.StandardMaterial(
    "ballMaterial",
    scene
  );
  ballPointerMaterial.diffuseColor = new BABYLON.Color3(1, 0, 5);

  ballPointer.material = ballPointerMaterial;
  ballPointer.position.y = 2;
  ballPointer.speed = 1;
  ballPointer.frontVector = new BABYLON.Vector3(0, 0, 1);

  return ballPointer;
};
