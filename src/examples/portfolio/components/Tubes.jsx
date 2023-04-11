import React, { useRef, useState } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Tube } from "@react-three/drei";

export default function Tubes() {
  const curveRef = useRef(null);
  const objectRef = useRef(null);
  const [time, setTime] = useState(0);
  const [direction, setDirection] = useState(1);

  // Define the points that make up the spline curve
  const points = [
    new THREE.Vector3(-2, 0, 0),
    new THREE.Vector3(-1, 0.1, 0),
    new THREE.Vector3(1, -0.1, 0.3),
    new THREE.Vector3(2, 0, 0),
  ];

  // Create a Catmull-Rom spline curve that passes through the points
  const curve = new THREE.CatmullRomCurve3(points);

  // Animate the object along the spline curve
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    const position = curve.getPointAt((time % 4) / 4);
    objectRef.current.position.copy(position);

    const tangent = curve.getTangentAt((time % 4) / 4).normalize();
    objectRef.current.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      tangent
    );
  });

  return (
    <group rotation={[Math.PI / 2, Math.PI / 2, 0]} position={[0, 0, 0.3]}>
      <mesh ref={objectRef}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshBasicMaterial color="white" />
      </mesh>
      <Tube args={[curve, 264, 0.01]}>
        <meshBasicMaterial attach="material" color="white" />
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
