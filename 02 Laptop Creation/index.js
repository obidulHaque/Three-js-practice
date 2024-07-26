// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;
camera.position.y = 0.75;

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Laptop base
const baseGeometry = new THREE.BoxGeometry(4, 0.2, 3);
const baseMaterial = new THREE.MeshBasicMaterial({ color: 0x888888 });
const base = new THREE.Mesh(baseGeometry, baseMaterial);
scene.add(base);

// Laptop screen
const screenGeometry = new THREE.BoxGeometry(4, 2.5, 0.1);
const screenMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const screen = new THREE.Mesh(screenGeometry, screenMaterial);
screen.position.y = 1.35;
screen.position.z = -1.45;
screen.rotation.x = -Math.PI / 12; // Slight tilt for a realistic look
scene.add(screen);

// Screen display
const displayGeometry = new THREE.PlaneGeometry(3.8, 2.3);
const displayMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const display = new THREE.Mesh(displayGeometry, displayMaterial);
display.position.y = 1.35;
display.position.z = -1.39;
display.rotation.x = -Math.PI / 12; // Slight tilt for a realistic look
scene.add(display);

// Text on display
const loader = new THREE.FontLoader();
loader.load(
  "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
  function (font) {
    const textGeometry = new THREE.TextGeometry("Hey World", {
      font: font,
      size: 0.3,
      height: 0.05,
      curveSegments: 12,
    });
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(-1.5, 1.2, -1.38);
    textMesh.rotation.x = -Math.PI / 12; // Match screen tilt
    scene.add(textMesh);
  }
);

// Zoom functionality
let zoomedIn = false;
window.addEventListener("click", () => {
  if (zoomedIn) {
    camera.position.z = 5;
  } else {
    camera.position.z = 10;
  }
  zoomedIn = !zoomedIn;
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
