import {
  Html,
  OrbitControls,
  PresentationControls,
  useScroll,
} from "@react-three/drei";
import React, { Suspense, useState, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ClickToShow, ViewButton } from "../App.styled";

export default function Pot({ nodes, color, materials, setFocusMesh }) {
  const data = useScroll();

  useFrame(({ camera }) => {
    const scrollAmount = data.scroll.current;
    if (scrollAmount > 0.63 && scrollAmount < 0.75) {
      setFocusMesh("pot");
    } else {
      setFocusMesh(null);
    }
  });

  return (
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Pot.geometry}
      material={nodes.Pot.material}
      position={[-0.87, 1.32, -0.95]}
      scale={[0.11, 0.09, 0.11]}
    >
      <meshStandardMaterial color={color.pot} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube020.geometry}
        material={materials["Material.008"]}
        position={[0.02, 0.51, 0]}
        rotation={[Math.PI, -1.4, Math.PI]}
        scale={[0.22, 0.27, 0.32]}
      />
    </mesh>
  );
}
