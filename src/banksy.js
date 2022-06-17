export const createBanksy = (scene) => {
  const banksy = new BABYLON.MeshBuilder.CreateBox(
    "banksy",
    { height: 3.5, width: 2.5, depth: 0.5 },
    scene
  );
  const banksyMat = new BABYLON.StandardMaterial("banksy", scene);
  banksyMat.diffuseColor = new BABYLON.Color3(1, 0, 0);
  banksyMat.specularColor = new BABYLON.Color3(0, 1, 0);
  banksyMat.bumpTexture = new BABYLON.Texture("imgs/banksy.jpg", scene);
  banksy.material = banksyMat;
  banksy.position = new BABYLON.Vector3(5, 3, 0);
};
