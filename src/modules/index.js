import { Vector3 } from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";

import { setGUI } from "./gui";
import { initScene } from "./initScene";
import { getBall, getRealBoat, getExplosion } from "./objects";
import { getSky, placeSun } from "./sky";
import { getWater } from "./water";

export { setControls } from "./controls";

export const getSimulation = async () => {
  const { renderer, scene, camera, pmremGenerator } = initScene();

  const water = getWater();
  const sky = getSky();
  const boat1 = await getRealBoat();
  const boat2 = await getRealBoat();
  boat2.position.set(0, 0, 1200);
  const ball = getBall(30, "#000000");
  const explosion1 = await getExplosion();
  const explosion2 = await getExplosion();

  scene.add(water);
  scene.add(sky);
  scene.add(boat1);
  scene.add(boat2);
  scene.add(ball);
  scene.add(explosion1.scene);
  scene.add(explosion2.scene);

  explosion1.action.play();
  explosion2.action.play();

  const stats = new Stats();

  const { parameters, gui } = setGUI();

  const initialSpeed = new Vector3();
  initialSpeed.setFromSphericalCoords(parameters.v0, Math.PI / 4, Math.PI / 4);

  const tracks = explosion1.animation.tracks;
  const res = [];
  for (let i = 0; i < tracks.length; i++) {
    res.push(tracks[i]);
    const x = { ...tracks[i] };
    x.values = [1e-10, 1e-10, 1e-10, 1e-10, 1e-10, 1e-10, 1e-10, 1e-10, 1e-10];
    res.push(x);
  }
  explosion1.animation.tracks = res;
  console.log(explosion1.animation.tracks.map((x) => x.times));
  console.log(explosion1.animation.tracks.map((x) => x.values));

  const simulationData = {
    renderer,
    scene,
    camera,
    stats,
    pmremGenerator,
    water,
    sky,
    mixers: {
      explosion1: explosion1.mixer,
      explosion2: explosion2.mixer,
    },
    objects: {
      boat1,
      boat2,
      ball,
      explosion1: explosion1.scene,
      explosion2: explosion2.scene,
    },
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
