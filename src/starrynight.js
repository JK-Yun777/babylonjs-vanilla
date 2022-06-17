export const creatStarrynight = (scene) => {
  const starrynight = new BABYLON.MeshBuilder.CreateBox(
    "starrynight",
    { height: 2.5, width: 3.5, depth: 0.5 },
    scene
  );
  const starrynightMat = new BABYLON.StandardMaterial("starrynight", scene);
  starrynightMat.diffuseColor = new BABYLON.Color3(1, 0, 0);
  starrynightMat.specularColor = new BABYLON.Color3(0, 1, 0);
  starrynightMat.bumpTexture = new BABYLON.Texture(
    "imgs/starrynight.jpg",
    scene
  );
  starrynight.material = starrynightMat;
  starrynight.position = new BABYLON.Vector3(5, 7, 5);
};
