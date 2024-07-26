import * as THREE from "three";

const loader = new THREE.TextureLoader();

const createObjects = (scene) => {
  // Object
  // const Box = new THREE.Mesh(
  //   new THREE.BoxGeometry(2, 2, 2),
  //   new THREE.MeshBasicMaterial({ color: "yellow" })
  // );
  // scene.add(Box);

  // Floor
  const floorTexture = loader.load("Fimage.jpg");
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(100, 1);

  const Floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 170),
    new THREE.MeshBasicMaterial({ map: floorTexture })
  );
  Floor.rotation.x = -Math.PI / 2;
  Floor.position.y = -10;
  Floor.position.z = -20;
  scene.add(Floor);

  // Textures for walls
  const normalTexture = loader.load("leather_white_nor_gl_4k.jpg");
  const RoughnessTexture = loader.load("leather_white_rough_4k.jpg");
  normalTexture.wrapS = normalTexture.wrapT = THREE.RepeatWrapping;
  RoughnessTexture.wrapS = RoughnessTexture.wrapT = THREE.RepeatWrapping;

  // Create walls
  const createWall = (geometry, material, position, rotation, name) => {
    const wall = new THREE.Mesh(geometry, material);
    wall.position.set(...position);
    wall.rotation.set(...rotation);
    wall.geometry.computeBoundingBox();
    wall.name = name;
    return wall;
  };

  const frontWall = createWall(
    new THREE.PlaneGeometry(85, 50),
    new THREE.MeshBasicMaterial({ color: "#8c8c8c" }),
    [0, 0, -100],
    [Math.PI / 150, 0, 0],
    "frontWall"
  );

  const BackWall = createWall(
    new THREE.BoxGeometry(85, 50, 2),
    new THREE.MeshBasicMaterial({ color: "#8c8c8c" }),
    [0, 0, 55],
    [0, 0, 0],
    "BackWall"
  );

  const leftWall = createWall(
    new THREE.PlaneGeometry(170, 50),
    new THREE.MeshBasicMaterial({
      color: 0xadadae,
      normalMap: normalTexture,
      roughnessMap: RoughnessTexture,
      side: THREE.DoubleSide,
    }),
    [-40, 0, -20],
    [0, Math.PI / 2, 0],
    "leftWall"
  );

  const rightWall = createWall(
    new THREE.PlaneGeometry(170, 50),
    new THREE.MeshBasicMaterial({
      color: 0xadadae,
      normalMap: normalTexture,
      roughnessMap: RoughnessTexture,
      side: THREE.DoubleSide,
    }),
    [40, 0, -20],
    [0, -Math.PI / 2, 0],
    "rightWall"
  );

  const CellingTexture = loader.load("Celling.webp");
  CellingTexture.wrapS = CellingTexture.wrapT = THREE.RepeatWrapping;
  CellingTexture.repeat.set(20, 20);

  const ceiling = createWall(
    new THREE.PlaneGeometry(100, 170),
    new THREE.MeshBasicMaterial({ map: CellingTexture }),
    [0, 25, -20],
    [Math.PI / 2, 0, 0],
    "ceiling"
  );

  scene.add(frontWall, BackWall, leftWall, rightWall, ceiling);
};

export { createObjects };
