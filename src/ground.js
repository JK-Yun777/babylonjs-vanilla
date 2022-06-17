// Ground
export const ground = BABYLON.Mesh.CreateGroundFromHeightMap(
  "ground",
  "https://www.babylonjs-playground.com/textures/heightMap.png",
  200,
  200,
  100,
  0,
  10,
  scene,
  false
);
const groundMaterial = new BABYLON.StandardMaterial("ground", scene);
groundMaterial.diffuseTexture = new BABYLON.Texture(
  "https://www.babylonjs-playground.com/textures/grass.png",
  scene
);
groundMaterial.diffuseTexture.uScale = 6;
groundMaterial.diffuseTexture.vScale = 6;
groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
ground.position.y = -2.05;
ground.material = groundMaterial;
