import * as THREE from "three";
import { Sky } from "three/examples/jsm/objects/Sky.js";

export const getSky = () => {
  const sky = new Sky();
  sky.scale.setScalar(100000);

  const skyUniforms = sky.material.uniforms;

  skyUniforms["turbidity"].value = 10;
  skyUniforms["rayleigh"].value = 2;
  skyUniforms["mieCoefficient"].value = 0.005;
  skyUniforms["mieDirectionalG"].value = 0.8;

  return sky;
};

export const placeSun = (
  { scene, pmremGenerator, sky, water },
  { elevation, azimuth }
) => {
  const phi = THREE.MathUtils.degToRad(90 - elevation);
  const theta = THREE.MathUtils.degToRad(azimuth);

  const sun = new THREE.Vector3();
  sun.setFromSphericalCoords(1, phi, theta);

  sky.material.uniforms["sunPosition"].value.copy(sun);
  water.material.uniforms["sunDirection"].value.copy(sun).normalize();

  const renderTarget = pmremGenerator.fromScene(sky);

  scene.environment = renderTarget.texture;

  renderTarget.dispose();
};
