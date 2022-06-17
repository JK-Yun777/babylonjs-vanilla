export const createMonalisa = (scene) => {
  const monalisa = new BABYLON.MeshBuilder.CreateBox(
    "monalisa",
    { height: 3.5, width: 2.5, depth: 0.5 },
    scene
  );
  const monalisaMat = new BABYLON.StandardMaterial("monalisaMat", scene);
  monalisaMat.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.6);
  monalisaMat.specularColor = new BABYLON.Color3(1, 2, 1);
  monalisaMat.bumpTexture = new BABYLON.Texture("imgs/monarisa.jpg", scene);
  monalisa.material = monalisaMat;
  monalisa.position = new BABYLON.Vector3(-5, 7, 0);
};
