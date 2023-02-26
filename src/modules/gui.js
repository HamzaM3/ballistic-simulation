import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";

export const setGUI = () => {
  const gui = new GUI();
  const parameters = {
    v0: 2500,
    vB: 30,
    xB: 15,
    scale: -0.5,
    center: 0,
  };

  const folderParameters = gui.addFolder("Parameters");
  folderParameters.add(parameters, "vB", 0, 100, 1).name("vB (km/h)");
  folderParameters.add(parameters, "v0", 0, 10000, 100).name("v0 (km/h)");
  folderParameters.add(parameters, "xB", 0, 50, 1).name("xB (km)");

  folderParameters.open();

  const folderScale = gui.addFolder("Setting");
  folderScale.add(parameters, "scale", -2, -0.5, 0.1);
  folderScale.add(parameters, "center", { "Boat 1": 0, "Boat 2": 1, Ball: 2 });

  folderScale.open();

  return { parameters, gui };
};
