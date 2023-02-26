import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water.js";

export const getWater = () => {
  const waterGeometry = new THREE.PlaneGeometry(40000, 40000);
  const waterNormal = new THREE.TextureLoader().load(
    "waternormals.jpg",
    function (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    }
  );

  const water = new Water(waterGeometry, {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: waterNormal,
    sunDirection: new THREE.Vector3(),
    sunColor: 0xffffff,
    waterColor: 0x001e0f,
    distortionScale: 3.7,
    fog: false,
  });

  water.rotation.x = -Math.PI / 2;

  return water;
};
