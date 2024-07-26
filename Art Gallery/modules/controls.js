import * as THREE from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import { camera } from "./camera.js";
import { scene } from "./scene.js";

const controls = new PointerLockControls(camera, document.body);
const btn = document.querySelector("#btn");

btn.addEventListener("click", () => {
  document.addEventListener("keypress", (e) => {
    controls.lock();
  });
});

document.addEventListener("keydown", onPositionHandler, false);

function onPositionHandler(e) {
  let key = e.which;
  let previousPosition = camera.position.clone();

  if (key === 37) {
    controls.moveRight(-0.8);
  } else if (key === 39) {
    controls.moveRight(0.8);
  } else if (key === 38) {
    controls.moveForward(0.5);
    controls.lock();
  } else if (key === 40) {
    controls.moveForward(-0.5);
  }

  // Create a bounding box for the camera's current position
  const cameraBB = new THREE.Box3().setFromCenterAndSize(
    camera.position,
    new THREE.Vector3(3, 3, 3) // Adjust the size of the bounding box as needed
  );

  // Create bounding boxes for walls
  const frontWallBB = new THREE.Box3().setFromObject(
    scene.getObjectByName("frontWall")
  );
  const backWallBB = new THREE.Box3().setFromObject(
    scene.getObjectByName("BackWall")
  );
  const leftWallBB = new THREE.Box3().setFromObject(
    scene.getObjectByName("leftWall")
  );
  const rightWallBB = new THREE.Box3().setFromObject(
    scene.getObjectByName("rightWall")
  );
  const ceilingBB = new THREE.Box3().setFromObject(
    scene.getObjectByName("ceiling")
  );

  // Check for collisions and revert to previous position if collision detected
  if (
    cameraBB.intersectsBox(frontWallBB) ||
    cameraBB.intersectsBox(leftWallBB) ||
    cameraBB.intersectsBox(rightWallBB) ||
    cameraBB.intersectsBox(backWallBB) ||
    cameraBB.intersectsBox(ceilingBB)
  ) {
    camera.position.copy(previousPosition);
  }
}

export { controls };
