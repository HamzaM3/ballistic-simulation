import * as THREE from "three";
import { setControls, getSimulation } from "./modules";

function onWindowResize({ camera, renderer }) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

const CENTERS = ["boat1", "boat2", "ball"];

const centerCamera = ({ controls, parameters: { center }, objects }) => {
  center = CENTERS[center];
  const pos = objects[center].position;
  controls.target.set(pos.x, pos.y, pos.z);
  controls.update();
};

const calculateV0 = ({ parameters: { vB, v0, xB }, initialSpeed }) => {
  xB = xB * 1000;
  v0 = (v0 * 1000) / 3600;
  vB = (vB * 1000) / 3600;
  const b = v0 ** 2 - vB ** 2;
  const c = (9.81 * xB) / 2;
  const D = b ** 2 - 4 * c ** 2;

  initialSpeed.x = Math.sqrt((b + Math.sqrt(D)) / 2);
  initialSpeed.y = c / initialSpeed.x;
  {
    const t = xB / initialSpeed.x;
    const x = initialSpeed.x * t - xB;
    const z = initialSpeed.z * t - vB * t;
    const y = initialSpeed.y * t - (9.81 / 2) * t ** 2;
    console.log(x, y, z);
  }
  initialSpeed.z = vB;

  console.log(initialSpeed);
};

const scaleObject = (scale, object) => {
  const s = 10 ** scale;
  object.position.x = s * object.position.x;
  object.position.y = s * object.position.y;
  object.position.z = s * object.position.z;

  object.scale.x = s;
  object.scale.y = s;
  object.scale.z = s;
};

const scaleEverything = ({ parameters: { scale }, objects }) => {
  for (const obj in objects) {
    scaleObject(scale, objects[obj]);
  }
};

const stepSimulation = ({
  initialSpeed,
  t0,
  water,
  parameters: { vB, xB },
  objects: { boat1, boat2, ball },
}) => {
  const t = (performance.now() - t0) * 0.001;
  const g = 9.81;

  xB = xB * 1000;
  vB = (vB * 1000) / 3600;

  const v0x = initialSpeed.x,
    v0y = initialSpeed.y,
    v0z = initialSpeed.z;

  boat1.position.y = Math.sin(t) * 1;

  boat2.position.x = xB;
  boat2.position.y = Math.sin(t) * 1;
  boat2.position.z = vB * t;

  ball.position.set(v0x * t, v0y * t - (g / 2) * t ** 2, v0z * t);

  water.material.uniforms["time"].value += 1.0 / 60.0;
};

function render({ renderer, scene, camera }) {
  renderer.render(scene, camera);
}

const initState = (data) => {
  data.t0 = performance.now();
  const { ball, boat1, boat2 } = data.objects;
  boat1.position.copy(new THREE.Vector3());
  boat2.position.copy(new THREE.Vector3(data.parameters.xB * 1000, 0, 0));
  ball.position.copy(new THREE.Vector3());
};

const animate = (data) => {
  requestAnimationFrame(() => animate(data));
  if (data.launched) {
    stepSimulation(data);
  } else {
    initState(data);
  }
  scaleEverything(data);
  centerCamera(data);
  render(data);
  data.stats.update();
};

const main = (container) => {
  const simulationData = getSimulation();
  simulationData.launched = false;

  container.appendChild(simulationData.renderer.domElement);
  container.appendChild(simulationData.stats.dom);

  const controls = setControls(simulationData);
  simulationData.controls = controls;

  calculateV0(simulationData);

  window.addEventListener("resize", () => onWindowResize(simulationData));

  window.addEventListener("keydown", (e) => {
    if (e.key === " ") {
      simulationData.launched = !simulationData.launched;
      if (simulationData.launched) {
        calculateV0(simulationData);
        simulationData.gui.hide();
      } else {
        simulationData.gui.show();
      }
    }
  });

  animate(simulationData);
};

main(document.getElementById("container"));
