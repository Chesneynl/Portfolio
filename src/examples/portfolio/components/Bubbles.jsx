import React, { useEffect, useRef, useState } from "react";
import {
  Html,
  Instance,
  Instances,
  ScrollControls,
  Text,
  useScroll,
} from "@react-three/drei";
import { SuggestMe } from "../App.styled";
import { MathUtils } from "three";
import gsap from "gsap";
import { useFrame } from "@react-three/fiber";
import {
  Color,
  DebugLayerMaterial,
  Noise,
  Depth,
  LayerMaterial,
  Displace,
  Gradient,
  Fresnel,
} from "lamina";
import * as THREE from "three";
import { useControls } from "leva";
import colors from "nice-color-palettes";

const particles = Array.from({ length: 20 }, () => ({
  factor: MathUtils.randInt(0.1, 8),
  speed: MathUtils.randFloat(0.01, 0.4),
  xFactor: MathUtils.randFloatSpread(5),
  yFactor: MathUtils.randFloatSpread(6),
  zFactor: MathUtils.randFloatSpread(15),
}));

export default function Bubbles() {
  const ref = useRef();
  const data = useScroll();
  // const { transmission, roughness, envMapIntensity } = useControls({
  //   transmission: { value: 1, min: 0, max: 1 },
  //   roughness: { value: 0.23, min: 0, max: 1 },
  //   envMapIntensity: { value: 0.4, min: 0, max: 10 },
  // });

  const timeline = gsap.timeline({ paused: true }).to(ref?.current?.position, {
    duration: 1,
    y: 10,
  });

  useFrame((state, delta) => {
    ref.current.rotation.y = MathUtils.damp(
      ref.current.rotation.y,
      (-state.mouse.x * Math.PI) / 6,
      2.75,
      delta
    );

    ref.current.position.y = data.offset * 10;
  });
  const [paletteIndex, setPaletteIndex] = useState(57);

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
        const colorPallete = colors[paletteIndex];
        const color =
          colorPallete[Math.floor(Math.random() * colorPallete.length)];
        const color2 =
          colorPallete[Math.floor(Math.random() * colorPallete.length)];
        return (
          <>
            <meshPhysicalMaterial
              transmission={1}
              roughness={0.23}
              envMapIntensity={0.4}
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
