import { Vector3 } from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";

import { setGUI } from "./gui";
import { initScene } from "./initScene";
import { getBall, getRealBoat } from "./objects";
import { getSky, placeSun } from "./sky";
import { getWater } from "./water";

export { setControls } from "./controls";

export const getSimulation = async () => {
  const { renderer, scene, camera, pmremGenerator } = initScene();

  const water = getWater();
  const sky = getSky();
  const boat1 = await getRealBoat();
  const boat2 = await getRealBoat();
  console.log(boat2);
  boat2.position.set(0, 0, 1200);
  const ball = getBall(30, "#000000");

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
    elevation: 30,
    azimuth: 3,
  });

  return simulationData;
};
