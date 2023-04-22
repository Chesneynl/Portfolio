import React, { useRef } from "react";
import { Instance, Instances, Text } from "@react-three/drei";
import { SuggestMe } from "../App.styled";
import { MathUtils } from "three";
import { useFrame } from "@react-three/fiber";
import {
  Color,
  DebugLayerMaterial,
  Noise,
  Depth,
  LayerMaterial,
  Displace,
} from "lamina";
import * as THREE from "three";

const particles = Array.from({ length: 25 }, () => ({
  factor: MathUtils.randInt(0.1, 8),
  speed: MathUtils.randFloat(0.01, 0.4),
  xFactor: MathUtils.randFloatSpread(5),
  yFactor: MathUtils.randFloatSpread(5),
  zFactor: MathUtils.randFloatSpread(15),
}));

export default function Bubbles() {
  const ref = useRef();
  useFrame(
    (state, delta) =>
      void (ref.current.rotation.y = MathUtils.damp(
        ref.current.rotation.y,
        (-state.mouse.x * Math.PI) / 6,
        2.75,
        delta
      ))
  );

  return (
    <Instances
      limit={particles.length}
      ref={ref}
      castShadow
      receiveShadow
      position={[0, 0, 0]}
    >
      <sphereGeometry args={[1, 32, 32]} />

      {particles.map((data, i) => {
        const colorPallete = [
          "#7dcfb6",
          "#1d4e89",
          "#00b2ca",
          "#fbd1a2",
          "#f79256",
        ];
        const color =
          colorPallete[Math.floor(Math.random() * colorPallete.length)];
        return (
          <>
            {/* <meshStandardMaterial roughness={0.1} color={color} /> */}
            <meshPhysicalMaterial
              transmission={1}
              thickness={10}
              roughness={0.5}
            />
            <Bubble key={i} {...data} color={color} />
          </>
        );
      })}
    </Instances>
  );
}

function Bubble({ factor, speed, xFactor, yFactor, zFactor, color }) {
  const ref = useRef();
  useFrame((state) => {
    const t = factor + state.clock.elapsedTime * (speed / 2);
    ref.current.scale.setScalar(Math.max(0.2, Math.cos(t) * 0.5));
    ref.current.position.set(
      Math.cos(t) +
        Math.sin(t * 1) / 10 +
        xFactor +
        Math.cos((t / 10) * factor) +
        (Math.sin(t * 1) * factor) / 10,
      Math.sin(t) +
        Math.cos(t * 2) / 10 +
        yFactor +
        Math.sin((t / 10) * factor) +
        (Math.cos(t * 2) * factor) / 10,
      Math.sin(t) +
        Math.cos(t * 2) / 10 +
        zFactor +
        Math.cos((t / 10) * factor) +
        (Math.sin(t * 3) * factor) / 10
    );
  });
  return <Instance ref={ref} color={color} />;
}
