import { scene } from "./initSetting.js";

export const controller = (targetObj) => {
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

  scene.onBeforeRenderObservable.add(function () {
    if (targetObj) {
      if (inputMap["w"] || inputMap["ArrowUp"]) {
        targetObj.moveWithCollisions(
          targetObj.frontVector.multiplyByFloats(
            targetObj.speed,
            targetObj.speed,
            targetObj.speed
          )
        );
      }
      if (inputMap["a"] || inputMap["ArrowLeft"]) {
        targetObj.rotation.y -= 0.01;
        targetObj.frontVector = new BABYLON.Vector3(
          Math.sin(targetObj.rotation.y),
          0,
          Math.cos(targetObj.rotation.y)
        );
      }
      if (inputMap["s"] || inputMap["ArrowDown"]) {
        targetObj.moveWithCollisions(
          targetObj.frontVector.multiplyByFloats(
            -targetObj.speed,
            -targetObj.speed,
            -targetObj.speed
          )
        );
      }
      if (inputMap["d"] || inputMap["ArrowRight"]) {
        targetObj.rotation.y += 0.01;
        targetObj.frontVector = new BABYLON.Vector3(
          Math.sin(targetObj.rotation.y),
          0,
          Math.cos(targetObj.rotation.y)
        );
      }
    }
  });
};
