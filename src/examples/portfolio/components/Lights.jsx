import { Environment, Float, Lightformer } from "@react-three/drei";
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
  useFrame((state, delta) => {
    (group.current.position.z += delta * 10) > 20 &&
      (group.current.position.z = -60);

    bg.current.offset.x = state.clock.elapsedTime * 0.1;
    bg.current.offset.y = state.clock.elapsedTime * 0.1;
    // bg.offset.z = state.clock.elapsedTime * 0.1;
  });
  return (
    <>
      {/* Ceiling */}
      <Lightformer
        intensity={0.75}
        rotation-x={Math.PI / 2}
        position={[0, 5, -9]}
        scale={[10, 10, 1]}
      />
      <group rotation={[0, 0.5, 0]}>
        <group ref={group}>
          {positions.map((x, i) => (
            <Lightformer
              key={i}
              form="circle"
              intensity={2}
              rotation={[Math.PI / 2, 0, 0]}
              position={[x, 4, i * 4]}
              scale={[3, 1, 1]}
            />
          ))}
        </group>
      </group>
      {/* Sides */}
      {/* <Lightformer
        intensity={4}
        rotation-y={Math.PI / 2}
        position={[-5, 1, -1]}
        scale={[20, 0.1, 1]}
      />
      <Lightformer
        rotation-y={Math.PI / 2}
        position={[-5, -1, -1]}
        scale={[20, 0.5, 1]}
      />
      <Lightformer
        rotation-y={-Math.PI / 2}
        position={[10, 1, 0]}
        scale={[20, 1, 1]}
      /> */}
      {/* Accent (red) */}
      <Float speed={5} floatIntensity={2} rotationIntensity={2}>
        <Lightformer
          form="ring"
          color="white"
          intensity={1}
          scale={10}
          position={[0, 0, 0]}
          target={[0, 0, 0]}
        />
      </Float>
      {/* Background */}
      <mesh scale={10}>
        <sphereGeometry args={[1, 220, 220]} />
        <DebugLayerMaterial side={THREE.BackSide}>
          <Color color="#000" alpha={0.1} mode="multiply" />
          <Noise
            ref={bg}
            colorA={"#1A5276"}
            colorB={"#2E86C1"}
            colorC={"#0E4D92"}
            colorD={"#5499C7"}
            alpha={1}
            mode="normal"
            near={0}
            offset={[0, 0, 0]}
            far={300}
            origin={[100, 100, 100]}
          />
        </DebugLayerMaterial>
      </mesh>
    </>
  );
}
