import {
  Float,
  Lightformer,
  PivotControls,
  RandomizedLight,
  useHelper,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Color, DebugLayerMaterial, Noise, Depth, LayerMaterial } from "lamina";
import React, { useRef } from "react";
import * as THREE from "three";

export default function Lights() {
  const v = new THREE.Vector3();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    state.camera.position.lerp(
      v.set(Math.sin(t / 5), 0, 12 + Math.cos(t / 5) / 2),
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });

  return <Lightformers />;
}

function Lightformers({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
  const group = useRef();
  const bg = useRef();
  const ceilingRef = useRef();

  useFrame((state, delta) => {
    (group.current.position.z += delta * 10) > 20 &&
      (group.current.position.z = -60);

    ceilingRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 2;
  });

  return (
    <>
      {/* Ceiling */}

      <Lightformer
        intensity={3.75}
        rotation-x={Math.PI / 2}
        position={[0, 1, -9]}
        scale={[3, 10, 1]}
      />

      <Lightformer
        intensity={0.75}
        rotation-x={Math.PI / 3}
        position={[0, 1, 0]}
        scale={[3, 10, 3]}
      />

      <Lightformer
        intensity={4.75}
        rotation-x={Math.PI / 2}
        position={[0, -30, 0]}
        scale={[3, 10, 3]}
      />

      <Lightformer
        ref={ceilingRef}
        form="circle"
        intensity={3}
        color={"white"}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 4, -3]}
        scale={[3, 1, 3]}
      />

      {/* Floor */}
      <Float speed={5} floatIntensity={2} rotationIntensity={2}>
        <Lightformer
          intensity={0.15}
          position={[0, -1, -4]}
          scale={[8, 2, 1]}
          // rotation-x={Math.PI / 2}
          form={"ring"}
          color={"white"}
        />
      </Float>

      <group rotation={[0, 0, 0]}>
        <group ref={group}>
          {positions.map((x, i) => (
            <Lightformer
              key={i}
              color={"white"}
              form="circle"
              intensity={2}
              rotation={[Math.PI / 2, 0, 0]}
              position={[x, 4, i * 4]}
              scale={[6, 1, 1]}
            />
          ))}
        </group>
      </group>

      {/* Accent (red) */}
      <Float speed={5} floatIntensity={2} rotationIntensity={2}>
        <Lightformer
          form="ring"
          color="white"
          intensity={1}
          scale={1}
          position={[0, 0, 0]}
          target={[0, 0, 0]}
        />
      </Float>
    </>
  );
}
