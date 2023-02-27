import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const getBoat = (color = "#ffffff") => {
  const boatGeometry = new THREE.BoxGeometry(30, 30, 300);
  const boatMaterial = new THREE.MeshBasicMaterial({
    color: color,
    roughness: 0,
    metalness: 1.0,
  });

  return new THREE.Mesh(boatGeometry, boatMaterial);
};

export const getBall = (radius = 10, color = "#ffffff") => {
  const ballGeometry = new THREE.SphereGeometry(radius);
  const ballMaterial = new THREE.MeshBasicMaterial({
    color: color,
    roughness: 1.0,
    metalness: 1.0,
  });
  return new THREE.Mesh(ballGeometry, ballMaterial);
};

export const getRealBoat = async () => {
  const loader = new GLTFLoader();
  const boat = await loader.loadAsync("./boat/scene.gltf");
  return boat.scene;
};

export const getExplosion = async () => {
  const loader = new GLTFLoader();
  const { scene, animations } = await loader.loadAsync(
    "./fixed_explosion/fixed.gltf"
  );
  const mixer = new THREE.AnimationMixer(scene);
  const clip = THREE.AnimationClip.findByName(animations, "Explosion");
  const action = mixer.clipAction(clip);
  console.log(animations);
  return { mixer, scene, animation: animations[0], action };
};
