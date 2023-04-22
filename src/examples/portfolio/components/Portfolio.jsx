import { Suspense, useRef, useState } from "react";
import {
  Html,
  useProgress,
  OrbitControls,
  PerformanceMonitor,
  Environment,
  Stats,
  PerspectiveCamera,
  Text,
  Stage,
  AsciiRenderer,
  Center,
  Sparkles,
  Points,
  PointMaterial,
} from "@react-three/drei";

import Lights from "./Lights";
import { StyledCanvas } from "../App.styled";

import React from "react";

import Welcome from "./Welcome";
import Tubes from "./Tubes";
import Picture from "./Picture";
import { EffectComposer, SSAO } from "@react-three/postprocessing";
import Bubbles from "./Bubbles";
import { useFrame } from "@react-three/fiber";
import {
  DebugLayerMaterial,
  Noise,
  LayerMaterial,
  Normal,
  Gradient,
} from "lamina";
import * as THREE from "three";
import { useControls } from "leva";

const PAGES = 5;

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

function Portfolio() {
  const [degraded, degrade] = useState(false);

  return (
    <>
      <Suspense fallback={<span>loading...</span>}>
        <StyledCanvas
          shadows
          dpr={[1, 2]}
          // gl={{ antialias: false }}
          camera={{ fov: 30, position: [5, 0, 15] }}
        >
          <PerformanceMonitor onDecline={() => degrade(true)} />
          <OrbitControls />
          <Stats />

          {/* <fog attach="fog" args={["#4295c7", 1, 150]} /> */}

          <Bubbles />
          <Welcome />

          <Bg />

          <Environment
            frames={degraded ? 1 : Infinity}
            // resolution={720}
            // background
            blur={1}
          >
            <Lights />
          </Environment>

          {/* <Tubes /> */}
        </StyledCanvas>
      </Suspense>
    </>
  );
}

function Bg() {
  const mesh = useRef();
  useFrame((state, delta) => {
    mesh.current.rotation.x =
      mesh.current.rotation.y =
      mesh.current.rotation.z +=
        delta * 0.4;
  });
  return (
    <mesh ref={mesh} scale={30}>
      <sphereGeometry args={[1, 64, 64]} />
      <DebugLayerMaterial attach="material" side={THREE.BackSide}>
        <Gradient colorA={"#00b2ca"} colorB={"#fbd1a2"} />
      </DebugLayerMaterial>
    </mesh>
  );
}

export default Portfolio;
