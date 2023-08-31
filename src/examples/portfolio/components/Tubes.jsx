import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Tube, useScroll } from "@react-three/drei";
import { Gradient, LayerMaterial } from "lamina";

export default function Tubes({ type }) {
  const curveRef = useRef(null);
  const objectRef = useRef(null);
  const data = useScroll();

  // Define the points that make up the spline curve
  const points = [
    new THREE.Vector3(-3, 0, 0),
    new THREE.Vector3(-1, 3, 0),
    new THREE.Vector3(1, -3.1, 0.3),
    new THREE.Vector3(3, 0, 0),
    new THREE.Vector3(5, 0, 0),
  ];

  // Create a Catmull-Rom spline curve that passes through the points
  const curve = new THREE.CatmullRomCurve3(points, false, type, 0.8);

  useFrame(({ camera }) => {
    const position = curve.getPointAt(data.offset);
    objectRef.current.position.copy(position);
  });

  return (
    <group rotation={[Math.PI / 2, -Math.PI / 2, 0]} position={[2, 0, 0]}>
      <mesh ref={objectRef}>
        <sphereGeometry args={[0.03, 32, 32]} />
        <meshBasicMaterial color="white" />
      </mesh>
      <Tube args={[curve, 264, 0.01]}>
        <meshBasicMaterial attach="material" color="black" />
        {/* <LayerMaterial attach="material" side={THREE.BackSide}>
          <Gradient colorA={"#1d4e89"} colorB={"#00b2ca"} />
        </LayerMaterial> */}
      </Tube>
      <line ref={curveRef}>
        <lineDashedMaterial
          attach="material"
          color="white"
          dashSize={0.1}
          gapSize={0.05}
        />
      </line>
    </group>
  );
}
