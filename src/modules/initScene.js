import * as THREE from "three";

export const initScene = () => {
  const renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    1,
    20000
  );
  camera.position.set(-600, 600, -300);

  const pmremGenerator = new THREE.PMREMGenerator(renderer);

  return { renderer, scene, camera, pmremGenerator };
};
