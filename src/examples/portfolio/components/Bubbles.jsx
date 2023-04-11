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

const particles = Array.from({ length: 50 }, () => ({
  factor: MathUtils.randInt(2, 80),
  speed: MathUtils.randFloat(0.01, 1),
  xFactor: MathUtils.randFloatSpread(30),
  yFactor: MathUtils.randFloatSpread(40),
  zFactor: MathUtils.randFloatSpread(90),
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
      position={[0, 10, 0]}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial roughness={0} color="#000" />
      {particles.map((data, i) => (
        <Bubble key={i} {...data} />
      ))}
    </Instances>
  );
}

function Bubble({ factor, speed, xFactor, yFactor, zFactor }) {
  const ref = useRef();
  useFrame((state) => {
    const t = factor + state.clock.elapsedTime * (speed / 3);
    ref.current.scale.setScalar(Math.max(1.0, Math.cos(t) * 3));
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
  return <Instance ref={ref} />;
}
