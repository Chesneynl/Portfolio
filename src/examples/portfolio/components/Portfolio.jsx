import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import {
  Html,
  useProgress,
  PerformanceMonitor,
  Environment,
  Stats,
  Text,
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
import Projects from "./Projects";
import { useControls } from "leva";

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
            <Projects timeline={timeline} />
            {/* <Input
              scale={2}
              position={[0.4, 0.25, -1]}
              rotation={[0.5, -0.5, -0.5]}
            /> */}

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

  const colorPallete2 = colors[5];
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

export const ControlledInput = (props) => {
  const { value, onChange, ...rest } = props;
  const [cursor, setCursor] = useState(null);
  const ref = useRef(null);
  useEffect(() => {
    const input = ref.current;
    if (input) input.setSelectionRange(cursor, cursor);
  }, [ref, cursor, value]);
  const handleChange = (e) => {
    setCursor(e.target.selectionStart);
    onChange && onChange(e);
  };
  return <input ref={ref} value={value} onChange={handleChange} {...rest} />;
};

function Input(props) {
  const [text, set] = useState("hello world ...");
  return (
    <group {...props}>
      <Text
        position={[-1.2, -0.022, 0]}
        anchorX="0px"
        font="/Inter-Regular.woff"
        fontSize={0.335}
        letterSpacing={-0.0}
      >
        {text}
        <meshStandardMaterial color="black" />
      </Text>
      <mesh position={[0, -0.022, 0]} scale={[2.5, 0.48, 1]}>
        <planeGeometry />
        <meshBasicMaterial transparent opacity={0.3} depthWrite={false} />
      </mesh>
      <Html transform>
        <ControlledInput
          type={text}
          onChange={(e) => set(e.target.value)}
          value={text}
        />
      </Html>
    </group>
  );
}

export default Portfolio;
