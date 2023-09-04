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
  ContactShadows,
  RandomizedLight,
  AccumulativeShadows,
  MeshDistortMaterial, PivotControls, OrbitControls, Plane, Sphere
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
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/three'
import { useControls } from "leva";
const AnimatedMaterial = a(MeshDistortMaterial)

const PAGES = 5;

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

function Portfolio() {
  const [degraded, degrade] = useState(false);
  const timeline = gsap.timeline();

  const sphere = useRef()
  const light = useRef()
  const shadowsRef = useRef()
  const [mode, setMode] = useState(false)
  const [down, setDown] = useState(false)
  const [hovered, setHovered] = useState(false)

  const [{ wobble, coat, color, ambient, env }] = useSpring(
      {
        wobble: down ? 1.2 : hovered ? 1.05 : 1,
        coat: mode && !hovered ? 0.04 : 1,
        ambient: mode && !hovered ? 1.5 : 0.5,
        env: mode && !hovered ? 0.4 : 1,
        color: hovered ? '#E8B059' : mode ? '#202020' : 'white',
        config: (n) => n === 'wobble' && hovered && { mass: 2, tension: 1000, friction: 10 }
      },
      [mode, hovered, down]
  )

  return (
    <>
      <Suspense fallback={<span>loading...</span>}>
        <StyledCanvas
          shadows
          dpr={[1, 2]}
          // gl={{ antialias: false }}
          // camera={{ fov: 30, position: [5, 0, 15] }}
          camera={{ position: [-0.1, 0, 8], fov: 50 }}
        >
          {/*<PerformanceMonitor onDecline={() => degrade(true)} />*/}
          {/*/!* <OrbitControls /> *!/*/}
          {/*<Stats />*/}
          <ScrollControls pages={1}>
            {/*<Bubbles />*/}
            <Welcome timeline={timeline} />
            {/*<Frontend timeline={timeline} />*/}
            {/*<Skills timeline={timeline} />*/}
            {/*<Projects timeline={timeline} />*/}

            <a.mesh
                ref={sphere}
                scale={wobble}
                position={[3, 0, 0]}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onPointerDown={() => setDown(true)}
                onPointerUp={() => {
                  setDown(false)
                  // Toggle mode between dark and bright
                  setMode(!mode)
                  setBg({ background: !mode ? '#202020' : '#f0f0f0', fill: !mode ? '#f0f0f0' : '#202020' })
                }}>
              <sphereBufferGeometry args={[1, 64, 64]} />
              <AnimatedMaterial color={color} envMapIntensity={env} clearcoat={coat} clearcoatRoughness={0} metalness={0.1} />
            </a.mesh>
            <Environment preset="warehouse" />
          <ContactShadows rotation-x={Math.PI / 2} position={[0, -1.8, 0]} opacity={1} width={20} height={10} blur={1} far={9} />

<Sphere args={[1, 32, 32]} position={[0, -1.42, 2]} scale={0.2} castShadow>
  <meshPhysicalMaterial color="hotpink" metalness={0.1}/>
</Sphere>




            {/* <Input
              scale={2}
              position={[0.4, 0.25, -1]}
              rotation={[0.5, -0.5, -0.5]}
            /> */}

            {/*<Tubes type="catmullrom" />*/}
            {/*<Tubes type="centripetal" />*/}
            {/*<Tubes type="chordal" />*/}
            <Bg timeline={timeline} />


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
