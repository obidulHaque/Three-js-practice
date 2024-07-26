import * as THREE from "three";
import GUI from "lil-gui";

// const gui = new GUI();
const loader = new THREE.TextureLoader();
const painting = loader.load("new.jpg");
painting.wrapS = painting.wrapT = THREE.RepeatWrapping;
painting.repeat.set(100, 1);

const createPaintingFram = (scene) => {
  const paintingFram = (size, position, rotation) => {
    const Fram = new THREE.Mesh(
      new THREE.BoxGeometry(...size),
      new THREE.MeshBasicMaterial({
        // color: "red",
        side: THREE.DoubleSide,
        map: painting,
      })
    );
    Fram.position.set(...position);
    Fram.rotation.set(...rotation);
    Fram.geometry.computeBoundingBox();
    return Fram;
  };
  /// leftWall
  const fFram = paintingFram([20, 10, 15], [-47, 15, 0], [0, Math.PI / 2, 0]);
  const sFram = paintingFram([20, 10, 15], [-47, 15, 35], [0, Math.PI / 2, 0]);
  const tFram = paintingFram([20, 10, 15], [-47, 15, -40], [0, Math.PI / 2, 0]);
  const foFram = paintingFram(
    [20, 10, 15],
    [-47, 15, -80],
    [0, Math.PI / 2, 0]
  );
  ////RightWall
  const fiFram = paintingFram([20, 10, 15], [47, 15, 0], [0, -Math.PI / 2, 0]);
  const siFram = paintingFram([20, 10, 15], [47, 15, 35], [0, -Math.PI / 2, 0]);
  const seFram = paintingFram(
    [20, 10, 15],
    [47, 15, -40],
    [0, -Math.PI / 2, 0]
  );
  const eiFram = paintingFram(
    [20, 10, 15],
    [47, 15, -80],
    [0, -Math.PI / 2, 0]
  );

  ///fontwall
  const niFram = paintingFram([20, 10, 15], [17, 15, -107], [0, 0, 0]);
  const tenFram = paintingFram([20, 10, 15], [-17, 15, -107], [0, 0, 0]);

  //// Backwall
  const elFram = paintingFram([20, 10, 15], [17, 15, 61], [0, 0, 0]);
  const twoelFram = paintingFram([20, 10, 15], [-17, 15, 61], [0, 0, 0]);

  // paingtiong Image Geromertry

  // gui.add(fistImage.position, "z");
  // gui.add(fistImage.position, "x");
  scene.add(
    fFram,
    sFram,
    tFram,
    foFram,
    fiFram,
    siFram,
    seFram,
    eiFram,
    niFram,
    tenFram,
    elFram,
    twoelFram
  );
};

export { createPaintingFram };
