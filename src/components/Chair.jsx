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

export default function Chair({
  nodes,
  color,
  materials,
  setFocusMesh,
  pillowColor,
}) {
  const data = useScroll();

  useFrame(({ camera }) => {
    const scrollAmount = data.scroll.current;
    if (scrollAmount > 0.32 && scrollAmount < 0.55) {
      setFocusMesh("pot");
    } else {
      setFocusMesh(null);
    }
  });

  return (
    <>
      <group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Chair.geometry}
          material={materials.Material}
          position={[-0.91, 0.55, 0.24]}
          rotation={[0, Math.PI / 2, 0]}
          scale={0.95}
        >
          <meshStandardMaterial color={color} />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Couch_legs001.geometry}
            material={materials.Table}
            position={[-0.39, 0, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cushion002.geometry}
            material={materials.Material}
            position={[-0.39, 0.59, -0.08]}
            rotation={[1.15, 0, 0]}
            scale={[0.35, 0.13, 0.32]}
          >
            <meshStandardMaterial color={color} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Pillow002.geometry}
            material={
              new THREE.MeshLambertMaterial({
                color: pillowColor,
              })
            }
            position={[-0.15, 0.47, 0.19]}
            rotation={[-2.67, -1.25, 2.51]}
          />
        </mesh>
      </group>
    </>
  );
}
