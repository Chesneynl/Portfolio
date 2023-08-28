import { Suspense, useEffect, useMemo, useRef, useState } from "react";
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
  ScrollControls,
  useScroll,
} from "@react-three/drei";
import colors from "nice-color-palettes/200";

import Lights from "./Lights";
import { StyledCanvas } from "../App.styled";

import React from "react";
import gsap from "gsap";

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
import Frontend from "./Frontend";
import Skills from "./Skills";

const PAGES = 5;

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

function Portfolio() {
  const [degraded, degrade] = useState(false);
  const timeline = gsap.timeline();

  return (
    <>
      <Suspense fallback={<span>loading...</span>}>
        <StyledCanvas
          // shadows
          dpr={[1, 2]}
          // gl={{ antialias: false }}
          camera={{ fov: 30, position: [5, 0, 15] }}
        >
          <PerformanceMonitor onDecline={() => degrade(true)} />
          {/* <OrbitControls /> */}
          <Stats />
          <ScrollControls pages={1}>
            <Bubbles />
            <Welcome timeline={timeline} />
            <Frontend timeline={timeline} />
            <Skills timeline={timeline} />

            <Tubes type="catmullrom" />
            <Tubes type="centripetal" />
            <Tubes type="chordal" />
            <Bg timeline={timeline} />
            <Environment frames={degraded ? 1 : Infinity} blur={1}>
              <Lights />
            </Environment>
          </ScrollControls>
        </StyledCanvas>
      </Suspense>
    </>
  );
}

function Bg({ timeline }) {
  const mesh = useRef();
  const data = useScroll();

  const lerpedColorRef = useRef(new THREE.Color());

  const colorPallete = colors[67];
  const colorStart = useMemo(() => new THREE.Color(colorPallete[0]), []);
  const colorEnd = useMemo(() => new THREE.Color(colorPallete[1]), []);

  const colorPallete2 = colors[102];
  const colorStart2 = useMemo(() => new THREE.Color(colorPallete2[0]), []);
  const colorEnd2 = useMemo(() => new THREE.Color(colorPallete2[1]), []);

  const materialRef = useRef();
  const gradientRef = useRef();

  useFrame((state, delta) => {
    mesh.current.rotation.x =
      mesh.current.rotation.y =
      mesh.current.rotation.z +=
        delta * 0.4;

    let lerpColor = colorStart;
    let lerpColor2 = colorEnd;

    if (data.offset > 0.2) {
      const lerpFactor = Math.sin(data.offset - 0.2);
      lerpColor = new THREE.Color().lerpColors(
        colorStart,
        colorStart2,
        lerpFactor
      );
      lerpColor2 = new THREE.Color().lerpColors(
        colorEnd,
        colorEnd2,
        lerpFactor
      );
    }

    gradientRef.current.colorA = lerpColor;
    gradientRef.current.colorB = lerpColor2;
  });

  return (
    <mesh ref={mesh} scale={30}>
      {/* <Html>
        <div onClick={() => setPaletteIndex(paletteIndex - 1)}>
          background -1
        </div>
        <div>{paletteIndex}</div>
        <div onClick={() => setPaletteIndex(paletteIndex + 1)}>
          background = 1
        </div>
      </Html> */}
      <meshBasicMaterial ref={materialRef} />
      <sphereGeometry args={[1, 64, 64]} />
      <LayerMaterial attach="material" reflectivity={0} side={THREE.BackSide}>
        <Gradient ref={gradientRef} />
      </LayerMaterial>
    </mesh>
  );
}

export default Portfolio;
