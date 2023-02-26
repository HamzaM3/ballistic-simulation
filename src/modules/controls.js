import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export const setControls = ({ camera, renderer }) => {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.maxPolarAngle = Math.PI * 2;
  controls.target.set(500, 0, 1000);
  controls.minDistance = 40.0;
  controls.maxDistance = 10000;
  controls.update();
  return controls;
};
