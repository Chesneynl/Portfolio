import React, { useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";

export default function Camera({ pages }) {
  const ref = useRef();
  const data = useScroll();

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
      cameraPosition: new THREE.Vector3(2, 2, -1),
      cameraLookAt: new THREE.Vector3(
        chairPosition.x - 0.4,
        chairPosition.y + 0.3,
        chairPosition.z - 0.4
      ),
      object: "chair",
    },
    {
      cameraPosition: new THREE.Vector3(0, 1.8, 0.4),
      cameraLookAt: new THREE.Vector3(
        potPosition.x - 0.4,
        potPosition.y - 0.3,
        potPosition.z - 2
      ),
      object: "plant",
    },
    {
      cameraPosition: new THREE.Vector3(0.5, 1.2, 1),
      cameraLookAt: new THREE.Vector3(
        donutPosition.x + 0.2,
        donutPosition.y - 0.1,
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
