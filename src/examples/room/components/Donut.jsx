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

export default function Donut({
  nodes,
  donutColor,
  sprinkleColor,
  color,
  setFocusMesh,
}) {
  const data = useScroll();

  useFrame(({ camera }) => {
    const scrollAmount = data.scroll.current;
    if (scrollAmount > 0.95) {
      setFocusMesh("donut");
    }
  });

  return (
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Donut.geometry}
      position={[0.8, 0.79, 0.59]}
      rotation={[-0.03, 0.07, 0.14]}
      scale={0.7}
    >
      <meshStandardMaterial color={color} />
      <mesh castShadow receiveShadow geometry={nodes.Torus016.geometry}>
        <meshStandardMaterial color={donutColor} />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015_2.geometry}
          position={[0.12, 0.04, -0.05]}
          rotation={[1.22, -0.71, -2.41]}
          scale={0.01}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube016_2.geometry}
          position={[0.13, 0.03, -0.01]}
          rotation={[1.38, -1.1, -2.71]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube017_2.geometry}
          position={[0.14, 0.02, -0.01]}
          rotation={[1.02, -1.36, -2.05]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          geometry={nodes.Cube015_3.geometry}
          position={[0.12, 0.04, -0.05]}
          rotation={[1.22, -0.71, 2.26]}
          scale={0.01}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          geometry={nodes.Cube016_3.geometry}
          position={[0.13, 0.03, -0.01]}
          rotation={[1.38, -1.1, 2.11]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          geometry={nodes.Cube017_3.geometry}
          position={[0.11, 0.05, -0.01]}
          rotation={[1.54, -0.34, 1.31]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          geometry={nodes.Cube015_4.geometry}
          position={[0.07, 0.05, -0.03]}
          rotation={[1.7, 0.32, -0.49]}
          scale={0}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          geometry={nodes.Cube016_4.geometry}
          position={[0.09, 0.05, -0.01]}
          rotation={[1.57, 0.04, -1.55]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          geometry={nodes.Cube017_4.geometry}
          position={[0.11, 0.05, -0.01]}
          rotation={[1.54, -0.34, 1.23]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          geometry={nodes.Cube015_5.geometry}
          position={[0.04, 0.02, -0.02]}
          rotation={[2.28, 1.01, 0.74]}
          scale={0.01}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          geometry={nodes.Cube016_5.geometry}
          position={[0.11, 0.03, -0.08]}
          rotation={[0.72, -0.81, 0.18]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          geometry={nodes.Cube017_5.geometry}
          position={[0.09, 0.05, -0.07]}
          rotation={[1.37, -0.27, -2.63]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          geometry={nodes.Cube015_6.geometry}
          position={[0.05, 0.05, -0.06]}
          rotation={[1.84, 0.21, -2.98]}
          scale={0.01}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          geometry={nodes.Cube016_6.geometry}
          position={[0.08, 0.05, -0.05]}
          rotation={[1.59, 0.03, 1.3]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          geometry={nodes.Cube017_6.geometry}
          position={[0.09, 0.05, -0.07]}
          rotation={[1.37, -0.27, -1.62]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          geometry={nodes.Cube015_7.geometry}
          position={[0.05, 0.05, -0.06]}
          rotation={[1.84, 0.21, 0.64]}
          scale={0.01}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          geometry={nodes.Cube016_7.geometry}
          position={[0.08, 0.05, -0.05]}
          rotation={[1.59, 0.03, 1.28]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          geometry={nodes.Cube017_7.geometry}
          position={[0.09, 0.05, -0.07]}
          rotation={[1.37, -0.27, -0.67]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          geometry={nodes.Cube015_8.geometry}
          position={[0.05, 0.05, -0.06]}
          rotation={[1.84, 0.21, 0.61]}
          scale={0.01}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          geometry={nodes.Cube016_8.geometry}
          position={[0.06, 0.03, -0.12]}
          rotation={[0.5, -0.38, 1.25]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          geometry={nodes.Cube017_8.geometry}
          position={[0.05, 0.05, -0.1]}
          rotation={[1.26, -0.14, -0.76]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          geometry={nodes.Cube015_9.geometry}
          position={[0.01, 0.05, -0.08]}
          rotation={[1.91, 0.05, 1.22]}
          scale={0.01}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube016_9.geometry}
          position={[0.04, 0.05, -0.09]}
          rotation={[1.61, 0.02, 0.93]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube017_9.geometry}
          position={[0.05, 0.05, -0.1]}
          rotation={[1.26, -0.14, 0.4]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015_10.geometry}
          position={[-0.05, 0.04, -0.12]}
          rotation={[0.83, 0.27, 2.39]}
          scale={0.01}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube016_10.geometry}
          position={[-0.01, 0.03, -0.13]}
          rotation={[0.47, 0.09, 2.23]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube017_10.geometry}
          position={[-0.01, 0.02, -0.14]}
          rotation={[0.22, 0.09, 1.13]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015_11.geometry}
          position={[-0.03, 0.05, -0.07]}
          rotation={[1.89, -0.13, 0.62]}
          scale={0.01}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube016_11.geometry}
          position={[-0.01, 0.05, -0.09]}
          rotation={[1.61, 0, -0.96]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube017_11.geometry}
          position={[-0.01, 0.04, -0.06]}
          rotation={[2.26, -0.06, -2.4]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015_12.geometry}
          position={[-0.1, 0.04, -0.08]}
          rotation={[1.03, 0.59, 2.05]}
          scale={0.01}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube016_12.geometry}
          position={[-0.08, 0.03, -0.11]}
          rotation={[0.55, 0.55, 2.64]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube017_12.geometry}
          position={[-0.08, 0.02, -0.11]}
          rotation={[0.23, 0.63, 2.76]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015_13.geometry}
          position={[-0.1, 0.04, -0.08]}
          rotation={[1.03, 0.59, 0.98]}
          scale={0.01}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube016_13.geometry}
          position={[-0.08, 0.03, -0.11]}
          rotation={[0.55, 0.55, 2.63]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube017_13.geometry}
          position={[-0.08, 0.02, -0.11]}
          rotation={[0.23, 0.63, 3.1]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015_14.geometry}
          position={[-0.1, 0.04, -0.08]}
          rotation={[1.03, 0.59, -1.95]}
          scale={0.01}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube016_14.geometry}
          position={[-0.05, 0.05, -0.08]}
          rotation={[1.6, -0.02, 2.85]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube017_14.geometry}
          position={[-0.07, 0.05, -0.09]}
          rotation={[1.29, 0.19, 1.25]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015_15.geometry}
          position={[-0.06, 0.05, -0.05]}
          rotation={[1.79, -0.27, 0.91]}
          scale={0.01}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube016_15.geometry}
          position={[-0.05, 0.05, -0.08]}
          rotation={[1.6, -0.02, 0.74]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube017_15.geometry}
          position={[-0.07, 0.05, -0.09]}
          rotation={[1.29, 0.19, 0.37]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015_16.geometry}
          position={[-0.06, 0.05, -0.05]}
          rotation={[1.79, -0.27, -3.02]}
          scale={0.01}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube016_16.geometry}
          position={[-0.03, 0.03, -0.04]}
          rotation={[2.43, -0.5, 1.37]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube017_16.geometry}
          position={[-0.13, 0.02, -0.06]}
          rotation={[0.49, 1.09, -0.08]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015_17.geometry}
          position={[-0.12, 0.04, -0.02]}
          rotation={[1.44, 0.77, -2.47]}
          scale={0.01}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube016_17.geometry}
          position={[-0.12, 0.03, -0.06]}
          rotation={[0.89, 0.95, 2.06]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube017_17.geometry}
          position={[-0.13, 0.02, -0.06]}
          rotation={[0.49, 1.09, 0.66]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015_18.geometry}
          position={[-0.08, 0.05, -0.01]}
          rotation={[1.62, -0.34, -2.03]}
          scale={0.01}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube016_18.geometry}
          position={[-0.09, 0.05, -0.04]}
          rotation={[1.59, -0.04, 2.89]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube017_18.geometry}
          position={[-0.14, 0.02, 0.01]}
          rotation={[2.12, 1.35, -1.24]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015_19.geometry}
          position={[-0.12, 0.04, 0.05]}
          rotation={[1.93, 0.71, 0.62]}
          scale={0.01}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube016_19.geometry}
          position={[-0.13, 0.03, 0.01]}
          rotation={[1.77, 1.1, -2.6]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube017_19.geometry}
          position={[-0.14, 0.02, 0.01]}
          rotation={[2.12, 1.35, -1.58]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015_20.geometry}
          position={[-0.12, 0.04, 0.05]}
          rotation={[1.93, 0.71, 0.9]}
          scale={0.01}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube016_20.geometry}
          position={[-0.13, 0.03, 0.01]}
          rotation={[1.77, 1.1, -2.46]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube017_20.geometry}
          position={[-0.14, 0.02, 0.01]}
          rotation={[2.12, 1.35, -2.29]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015_21.geometry}
          position={[-0.07, 0.05, 0.03]}
          rotation={[1.44, -0.32, -1.3]}
          scale={0.01}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube016_21.geometry}
          position={[-0.09, 0.05, 0.01]}
          rotation={[1.57, -0.04, 3.07]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube017_21.geometry}
          position={[-0.11, 0.05, 0.01]}
          rotation={[1.6, 0.34, -1.21]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015_22.geometry}
          position={[-0.04, 0.02, 0.02]}
          rotation={[0.86, -1.01, -1.44]}
          scale={0.01}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube016_22.geometry}
          position={[-0.05, 0.03, 0]}
          rotation={[1.43, -0.95, -2.05]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube017_22.geometry}
          position={[-0.11, 0.02, 0.08]}
          rotation={[2.79, 0.92, -2.66]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015_23.geometry}
          position={[-0.08, 0.04, 0.1]}
          rotation={[2.23, 0.45, 1.5]}
          scale={0.01}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube016_23.geometry}
          position={[-0.11, 0.03, 0.08]}
          rotation={[2.43, 0.81, -1.65]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube017_23.geometry}
          position={[-0.11, 0.02, 0.08]}
          rotation={[2.79, 0.92, 2.88]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015_24.geometry}
          position={[-0.05, 0.05, 0.06]}
          rotation={[1.3, -0.21, 2.08]}
          scale={0.01}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube016_24.geometry}
          position={[-0.04, 0.03, 0.03]}
          rotation={[0.88, -0.73, -0.09]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube017_24.geometry}
          position={[-0.06, 0.02, 0.13]}
          rotation={[2.95, 0.41, 0.96]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015_25.geometry}
          position={[-0.02, 0.04, 0.13]}
          rotation={[2.34, 0.14, 1.31]}
          scale={0.01}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube016_25.geometry}
          position={[-0.06, 0.03, 0.12]}
          rotation={[2.64, 0.39, 2.8]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube017_25.geometry}
          position={[-0.06, 0.02, 0.13]}
          rotation={[2.95, 0.41, 0.98]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015_26.geometry}
          position={[-0.02, 0.04, 0.13]}
          rotation={[2.34, 0.14, 2.58]}
          scale={0.01}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube016_26.geometry}
          position={[-0.04, 0.05, 0.09]}
          rotation={[1.53, -0.02, 0.74]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube017_26.geometry}
          position={[-0.03, 0.04, 0.06]}
          rotation={[0.93, -0.27, 3.07]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015_27.geometry}
          position={[0.06, 0.04, 0.11]}
          rotation={[2.28, -0.33, 1.11]}
          scale={0.01}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube016_27.geometry}
          position={[0.04, 0.03, 0.13]}
          rotation={[2.65, -0.26, -0.95]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube017_27.geometry}
          position={[0.08, 0.02, 0.11]}
          rotation={[2.95, -0.69, -1.58]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015_28.geometry}
          position={[0.1, 0.04, 0.08]}
          rotation={[2.11, -0.59, -0.41]}
          scale={0.01}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube016_28.geometry}
          position={[0.06, 0.05, 0.08]}
          rotation={[1.54, 0.03, 2.88]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube017_28.geometry}
          position={[0.07, 0.05, 0.09]}
          rotation={[1.83, -0.21, 0]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015_29.geometry}
          position={[0.06, 0.05, 0.05]}
          rotation={[1.36, 0.27, -0.78]}
          scale={0.01}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube016_29.geometry}
          position={[0.06, 0.05, 0.08]}
          rotation={[1.54, 0.03, 2.85]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube017_29.geometry}
          position={[0.07, 0.05, 0.09]}
          rotation={[1.83, -0.21, -2.07]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015_30.geometry}
          position={[0.06, 0.05, 0.05]}
          rotation={[1.36, 0.27, -2.14]}
          scale={0.01}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube016_30.geometry}
          position={[0.12, 0.03, 0.06]}
          rotation={[2.26, -0.95, 0.92]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube017_30.geometry}
          position={[0.13, 0.02, 0.06]}
          rotation={[2.66, -1.09, 0.06]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015_31.geometry}
          position={[0.12, 0.04, 0.02]}
          rotation={[1.71, -0.77, -2.9]}
          scale={0.01}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube016_31.geometry}
          position={[0.12, 0.03, 0.06]}
          rotation={[2.26, -0.95, 1.65]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube017_31.geometry}
          position={[0.1, 0.05, 0.05]}
          rotation={[1.72, -0.31, 2.35]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015_32.geometry}
          position={[0.11, 0.01, 0.09]}
          rotation={[-2.79, -0.81, -1.19]}
          scale={0.01}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube016_32.geometry}
          position={[-0.05, 0, 0.13]}
          rotation={[-2.12, 0.06, -2.28]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube017_32.geometry}
          position={[-0.1, 0, 0.08]}
          rotation={[-0.54, -0.7, 0.65]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015_33.geometry}
          position={[-0.1, -0.01, 0.09]}
          rotation={[-2.56, 0.78, -0.66]}
          scale={0.01}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube016_33.geometry}
          position={[0, 0.03, 0.05]}
          rotation={[0.62, 0, 2.11]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube017_33.geometry}
          position={[0, 0.05, 0.11]}
          rotation={[1.9, 0, 0.93]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015_34.geometry}
          position={[0.02, 0.05, 0.08]}
          rotation={[1.24, 0.07, -1.26]}
          scale={0.01}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube016_34.geometry}
          position={[0, 0.05, 0.1]}
          rotation={[1.53, 0, 0.72]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube017_34.geometry}
          position={[0, 0.02, 0.14]}
          rotation={[2.96, 0, 0.34]}
          scale={[0, 0.01, 0]}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015_35.geometry}
          position={[0.02, 0.04, 0.13]}
          rotation={[2.33, -0.15, 1.44]}
          scale={0.01}
        >
          <meshStandardMaterial color={sprinkleColor} />
        </mesh>
      </mesh>
    </mesh>
  );
}
