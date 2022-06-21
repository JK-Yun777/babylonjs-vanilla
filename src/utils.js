export const colors = {
  seaFoam: BABYLON.Color3.FromHexString("#16a085"),
  green: BABYLON.Color3.FromHexString("#27ae60"),
  blue: BABYLON.Color3.FromHexString("#2980b9"),
  purple: BABYLON.Color3.FromHexString("#8e44ad"),
  navy: BABYLON.Color3.FromHexString("#2c3e50"),
  yellow: BABYLON.Color3.FromHexString("#f39c12"),
  orange: BABYLON.Color3.FromHexString("#d35400"),
  red: BABYLON.Color3.FromHexString("#c0392b"),
  white: BABYLON.Color3.FromHexString("#bdc3c7"),
  gray: BABYLON.Color3.FromHexString("#7f8c8d"),
};

export const createMat = (scene, color) => {
  var mat = new BABYLON.StandardMaterial("", scene);
  mat.diffuseColor = color;
  mat.specularColor = BABYLON.Color3.FromHexString("#555555");
  mat.specularPower = 1;
  mat.emissiveColor = color.clone().scale(0.7);
  mat.backFaceCulling = false;
  return mat;
};

export const makePhysicsObject = (newMeshes, scene, scaling) => {
  // Create physics root and position it to be the center of mass for the imported mesh
  var physicsRoot = new BABYLON.Mesh("physicsRoot", scene);
  physicsRoot.position.y -= 0.9;

  // For all children labeled box (representing colliders), make them invisible and add them as a child of the root object
  newMeshes.forEach((m, i) => {
    if (m.name.indexOf("box") != -1) {
      m.isVisible = false;
      physicsRoot.addChild(m);
    }
  });

  // Add all root nodes within the loaded gltf to the physics root
  newMeshes.forEach((m, i) => {
    if (m.parent == null) {
      physicsRoot.addChild(m);
    }
  });

  // Make every collider into a physics impostor
  physicsRoot.getChildMeshes().forEach((m) => {
    if (m.name.indexOf("box") != -1) {
      m.scaling.x = Math.abs(m.scaling.x);
      m.scaling.y = Math.abs(m.scaling.y);
      m.scaling.z = Math.abs(m.scaling.z);
      m.physicsImpostor = new BABYLON.PhysicsImpostor(
        m,
        BABYLON.PhysicsImpostor.BoxImpostor,
        { mass: 0.1 },
        scene
      );
    }
  });

  // Scale the root object and turn it into a physics impsotor
  physicsRoot.scaling.scaleInPlace(scaling);
  physicsRoot.physicsImpostor = new BABYLON.PhysicsImpostor(
    physicsRoot,
    BABYLON.PhysicsImpostor.NoImpostor,
    { mass: 3 },
    scene
  );

  return physicsRoot;
};
