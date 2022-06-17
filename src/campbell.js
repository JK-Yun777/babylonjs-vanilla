export const createCampbell = (scene) => {
  const campbell = new BABYLON.MeshBuilder.CreateBox(
    "campbell",
    { height: 3.5, width: 2.5, depth: 0.5 },
    scene
  );
  const campbellMat = new BABYLON.StandardMaterial("campbell", scene);
  campbellMat.diffuseColor = new BABYLON.Color3(1, 0, 0);
  campbellMat.specularColor = new BABYLON.Color3(0, 1, 0);
  campbellMat.bumpTexture = new BABYLON.Texture("imgs/campbell.jpg", scene);
  campbell.material = campbellMat;
  campbell.position = new BABYLON.Vector3(-5, 3, 5);
};
