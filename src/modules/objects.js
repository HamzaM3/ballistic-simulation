import * as THREE from "three";

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
