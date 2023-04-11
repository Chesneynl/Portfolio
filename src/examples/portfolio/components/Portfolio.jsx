import { Suspense, useState } from "react";
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
} from "@react-three/drei";

import Lights from "./Lights";
import { StyledCanvas } from "../App.styled";

import React from "react";

import Welcome from "./Welcome";
import Tubes from "./Tubes";
import Picture from "./Picture";
import { EffectComposer, SSAO } from "@react-three/postprocessing";
import Bubbles from "./Bubbles";

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

          {/* <color attach="background" args={["#000"]} /> */}
          <fog attach="fog" args={["#4295c7", 1, 150]} />

          {/* <Picture /> */}

          <Bubbles />
          <Welcome />

          <Environment
            frames={degraded ? 1 : Infinity}
            // resolution={720}
            background
            blur={1}
          >
            <Lights />
          </Environment>

          {/* <Tubes /> */}
          {/* <PerspectiveCamera
            makeDefault
            position={[0, 0, 4]}
            rotation={[0, 0.5, 0]}
          /> */}
        </StyledCanvas>
      </Suspense>
    </>
  );
}

export default Portfolio;
