import React, {
  useRef,
  useState,
  useLayoutEffect,
  useMemo,
  useEffect,
} from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Center,
  softShadows,
  Environment,
  PresentationControls,
  Html,
  useScroll,
} from "@react-three/drei";
import Chair from "./Chair";
import { angleToRadians } from "../utils/angle";
import { ModelLabel } from "../App.tsx";

const graciousColors = {
  floor: "#0B9A74",
  donut: "#0B9A74",
  walls: "#1e3064",
  couch: "#F7BC5F",
  chair: "#F7BC5F",
  rug: "#F8CD88",
  pillow: "#0B9A74",
  plate: "#FFE8C2",
  pot: "#FFE8C2",
  lamp: "#F7BC5F",
  sideTable: "#c89e54",
};

const happyHorzionsColors = {
  floor: "#fae716",
  walls: "#050634",
  couch: "#abb8c3",
  chair: "#abb8c3",
  rug: "#F8CD88",
  pillow: "#fae716",
  plate: "#FFE8C2",
  pot: "#FFE8C2",
  lamp: "#fae716",
  sideTable: "#c89e54",
};

export default function Camera({ pages, nodes, materials }) {
  const ref = useRef();
  const data = useScroll();

  const [selectedColors, setSelectedColors] = useState(graciousColors);
  const [animationPercentage, setAnimationPercentage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const chairPosition = new THREE.Vector3(-0.91, 0.55, 0.24);
  const potPosition = new THREE.Vector3(-0.87, 1.32, -0.95);
  const donutPosition = new THREE.Vector3(0.8, 0.79, 0.59);
  const currentObjectVectors = [
    {
      cameraPosition: new THREE.Vector3(5, 5, 5),
      cameraLookAt: new THREE.Vector3(0, 1.3, 0),
      object: "startingCamera",
    },
    {
      cameraPosition: new THREE.Vector3(3, 3, 3),
      cameraLookAt: new THREE.Vector3(0, 1.3, 0),
      object: "SceneMoveIn",
    },
    {
      cameraPosition: new THREE.Vector3(2, 2, 0),
      cameraLookAt: new THREE.Vector3(
        chairPosition.x - 0.4,
        chairPosition.y + 0.3,
        chairPosition.z + 0.5
      ),
      object: "chair",
    },
    {
      cameraPosition: new THREE.Vector3(0, 2, 0.4),
      cameraLookAt: new THREE.Vector3(
        potPosition.x,
        potPosition.y + 0.05,
        potPosition.z + 0.1
      ),
      object: "plant",
    },
    {
      cameraPosition: new THREE.Vector3(0.5, 1.2, 1),
      cameraLookAt: new THREE.Vector3(
        donutPosition.x,
        donutPosition.y,
        donutPosition.z
      ),
      object: "donut",
    },
  ];

  const lerp = currentObjectVectors[currentPage - 1].cameraPosition.lerp(
    currentObjectVectors[currentPage].cameraPosition,
    animationPercentage
  );
  const lookAtCamera = currentObjectVectors[currentPage - 1].cameraLookAt.lerp(
    currentObjectVectors[currentPage].cameraLookAt,
    animationPercentage
  );
  const amountOfAnimations = pages - 1;
  const percentagePerAnimation = 1 / amountOfAnimations;

  useFrame((state) => {
    let page = currentPage;
    const scrollAmount = data.scroll.current;
    const startPercetages = [...Array(pages).keys()].map(
      (page) => page * percentagePerAnimation
    );
    const percentageOffset = startPercetages[page - 1];

    let animPercentage =
      (scrollAmount - percentageOffset) / percentagePerAnimation;

    if (animPercentage < 0) {
      page = currentPage - 1;
      animPercentage = 1;
    }

    if (animPercentage > 1 && currentPage + 1 !== pages) {
      animPercentage = 0;
      page = currentPage + 1;
    }

    setCurrentPage(Math.max(1, Math.min(pages, page)));
    setAnimationPercentage(Math.max(0, Math.min(1, animPercentage)));

    state.camera.position.set(lerp.x, lerp.y, lerp.z);
    state.camera.lookAt(lookAtCamera.x, lookAtCamera.y, lookAtCamera.z);
  });

  return <></>;
}
