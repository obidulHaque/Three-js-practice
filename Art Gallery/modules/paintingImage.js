import * as THREE from "three";

const createPiantingImage = (scene, renderer) => {
  /// painting image map

  const imageCrate = (imageName, size, position, rotation) => {
    const paintiingImage = new THREE.TextureLoader().load(imageName);
    const imageMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(...size),
      new THREE.MeshBasicMaterial({
        map: paintiingImage,
        side: THREE.DoubleSide,
      })
    );
    imageMesh.castShadow = true;
    imageMesh.receiveShadow = true;
    imageMesh.position.set(...position);
    imageMesh.rotation.set(...rotation);
    return imageMesh;
  };

  const fistImage = imageCrate("Real.jpg", [19, 8], [17, 14.5, 53], [0, 0, 0]);

  //   let paintiingImage = new THREE.TextureLoader().load("Real.jpg");

  //   const fistImage = new THREE.Mesh(
  //     new THREE.PlaneGeometry(19, 8),
  //     new THREE.MeshBasicMaterial({
  //       map: paintiingImage,
  //       side: THREE.DoubleSide,
  //       color: 0xffffff,
  //     })
  //   );
  //   fistImage.position.set(17, 14.5, 53);
  //   fistImage.wrapS = fistImage.wrapT = THREE.RepeatWrapping;
  //   fistImage.repeat.set(1, 1);
  //   fistImage.anisotropy = renderer.capabilities.getMaxAnisotropy();
  //   fistImage.minFilter = THREE.LinearMipMapLinearFilter;
  //   fistImage.magFilter = THREE.LinearFilter;
  //   fistImage.wrapS = THREE.ClampToEdgeWrapping;
  //   fistImage.wrapT = THREE.ClampToEdgeWrapping;
  //   fistImage.encoding = THREE.sRGBEncoding;
  scene.add(fistImage);
};

export { createPiantingImage };
