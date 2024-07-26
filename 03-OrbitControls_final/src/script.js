import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const canvas = document.querySelector("canvas.webgl");
//scene///
const scene = new THREE.Scene();

///object ///

/// laptop base

const baseGeometry = new THREE.BoxGeometry(4, 0.15, 3.3);
const baseMaterial = new THREE.MeshBasicMaterial({ color: 0x888888 });
const base = new THREE.Mesh(baseGeometry, baseMaterial);
scene.add(base);

// Laptop screen
const screenGeometry = new THREE.BoxGeometry(4, 2.5, 0.1);
const screenMaterial = new THREE.MeshBasicMaterial({ color: "#6E856D" });
const screen = new THREE.Mesh(screenGeometry, screenMaterial);
screen.position.y = 1.2;
screen.position.z = -2;
screen.rotation.x = -Math.PI / 12; // Slight tilt for a realistic look
scene.add(screen);

// Load texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("Capture.JPG", (texture) => {
  // Set texture filtering
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  // Set anisotropy
  const maxAnisotropy = render.capabilities.getMaxAnisotropy();
  texture.anisotropy = maxAnisotropy;
});

// Screen display
const displayGeometry = new THREE.PlaneGeometry(3.8, 2.3);
const displayMaterial = new THREE.MeshBasicMaterial({
  // color: 0xffffff,
  map: texture,
});
const display = new THREE.Mesh(displayGeometry, displayMaterial);
display.position.y = 1.2;
display.position.z = -1.94;
display.rotation.x = -Math.PI / 12; // Slight tilt for a realistic look
scene.add(display);

// Laptop keyboard
const keyboardGeometry = new THREE.BoxGeometry(3.8, 0.1, 1.5);
const keyboardMaterial = new THREE.MeshBasicMaterial({ color: 0x444444 });
const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
keyboard.position.y = 0.1;
keyboard.position.z = 0;
scene.add(keyboard);

/// floor
const FloorGrometry = new THREE.PlaneGeometry(50, 50);
const FloorMaterial = new THREE.MeshBasicMaterial({ color: "black" });
const Floor = new THREE.Mesh(FloorGrometry, FloorMaterial);
Floor.rotation.x = -Math.PI / 2;
Floor.position.y = -10;
Floor.position.y = -Math.PI;

scene.add(Floor);

// BackWall

// const BackWall = new THREE.Mesh(
//   new THREE.BoxGeometry(50, 50, 0.0001),
//   new THREE.MeshBasicMaterial({ color: "green" })
// );
// BackWall.rotation.x = Math.PI / 20;
// BackWall.position.z = -20;

// scene.add(BackWall);

// leftWall
const LeftWall = new THREE.Mesh(
  new THREE.BoxGeometry(50, 50, 0.0001),
  new THREE.MeshBasicMaterial({ color: "red" })
);
LeftWall.rotation.y = Math.PI / 2;
LeftWall.position.x = -20;

scene.add(LeftWall);

///RightWall

const RightWall = new THREE.Mesh(
  new THREE.BoxGeometry(50, 50, 0.0001),
  new THREE.MeshBasicMaterial({ color: "yellow" })
);
RightWall.rotation.y = Math.PI / 2;
RightWall.position.x = 20;

scene.add(RightWall);

///camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

scene.add(camera);

const Control = new OrbitControls(camera, canvas);
Control.enableDamping = true;
Control.dampingFactor = 0.05;
Control.maxDistance = 12;
Control.minDistance = 3;
Control.enablePan = false;
// Control.enableZoom = false;
// Control.minPolarAngle = -Math.PI / 2;
Control.maxPolarAngle = Math.PI / 2.5;
// Control.autoRotate = true;
// Control.autoRotateSpeed = 2;
/// Renderer ////

const render = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true,
});
render.setSize(window.innerWidth, window.innerHeight);
render.toneMapping = THREE.ACESFilmicToneMapping;
render.toneMappingExposure = 1;
render.outputEncoding = THREE.sRGBEncoding;
render.shadowMap.enabled = true;

//// Light

// let light = new THREE.AmbientLight(0x404040, 1); // soft white light
// light.position.z = 3;
// scene.add(light);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
// directionalLight.y = 15;
// scene.add(directionalLight);

/// left Right function

// document.addEventListener("keydown", onkeydown, false);

// function onkeydown(e) {
//   let key = e.which;
//   if (key === 39) {
//     camera.translateX(-0.5);
//   } else if (key === 37) {
//     camera.translateX(0.5);
//   } else if (key == 38) {
//     camera.translateY(-0.5);
//   } else if (key === 40) {
//     camera.translateY(0.5);
//   }
// }

// Zoom Function

let zoomIn = false;
window.addEventListener("dblclick", () => {
  if (zoomIn) {
    camera.position.z = 2;
    camera.position.y = -2;
  } else {
    camera.position.z = 10;
  }
  zoomIn = !zoomIn;
});

/// animation ////

function animation() {
  requestAnimationFrame(animation);

  Control.update();

  render.render(scene, camera);
}
animation();

/// Handle window resize

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  render.setSize(window.innerWidth, window.innerHeight);
});
