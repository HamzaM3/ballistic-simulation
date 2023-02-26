import { Vector3 } from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";

import { setGUI } from "./gui";
import { initScene } from "./initScene";
import { getBall, getBoat } from "./objects";
import { getSky, placeSun } from "./sky";
import { getWater } from "./water";

export { setControls } from "./controls";

export const getSimulation = () => {
  const { renderer, scene, camera, pmremGenerator } = initScene();

  const water = getWater();
  const sky = getSky();
  const boat1 = getBoat("#ff00ef");
  const boat2 = getBoat("#00efff");
  boat2.position.set(0, 0, 1200);
  const ball = getBall();

  scene.add(water);
  scene.add(sky);
  scene.add(boat1);
  scene.add(boat2);
  scene.add(ball);

  const stats = new Stats();

  const { parameters, gui } = setGUI();

  const initialSpeed = new Vector3();
  initialSpeed.setFromSphericalCoords(parameters.v0, Math.PI / 4, Math.PI / 4);

  const simulationData = {
    renderer,
    scene,
    camera,
    stats,
    pmremGenerator,
    water,
    sky,
    objects: { boat1, boat2, ball },
    parameters,
    initialSpeed,
    gui,
  };

  placeSun(simulationData, {
    elevation: 8.1,
    azimuth: 3,
  });

  return simulationData;
};
