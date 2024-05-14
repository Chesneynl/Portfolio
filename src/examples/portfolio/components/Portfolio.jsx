import { useSpring } from '@react-spring/core';
import { a } from '@react-spring/three';
import {
    Backdrop,
    Environment,
    Float,
    Html,
    Instance,
    Instances,
    MeshDistortMaterial,
    RandomizedLight,
    RoundedBox,
    ScrollControls,
    Sparkles,
    Stars,
    Line,
    useProgress,
    useScroll,
    shaderMaterial,
    Stats,
    Edges,
    Scroll,
    PerspectiveCamera,
    OrbitControls,
} from '@react-three/drei';
import { useFrame, extend } from '@react-three/fiber';
import { Bloom, DepthOfField, EffectComposer, SSAO, Vignette } from '@react-three/postprocessing';
import gsap from 'gsap';
import { DebugLayerMaterial, Gradient, LayerMaterial, Noise, Normal } from 'lamina';
import { useControls } from 'leva';
import colors from 'nice-color-palettes/200';
import { forwardRef, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import React, { useLayoutEffect } from 'react';
import * as easings from 'd3-ease';
import * as THREE from 'three';

import { StyledCanvas } from '../App.styled';
import Tubes from './Tubes';

import Welcome from './sections/Welcome';
import About from './sections/About';
import Connect from './sections/Connect';
import FlowField from './FlowField';
import Floor from './Floor';
import Projects from './sections/Projects';
import { useTrailTexture } from './useTrailTexture';

const AnimatedMaterial = a(MeshDistortMaterial);

const PAGES = 5;

function Loader() {
    const { progress } = useProgress();
    return <Html center>{progress} % loaded</Html>;
}

function Portfolio() {
    const cameraRef = useRef();

    useEffect(() => {
        if (!cameraRef.current) return;

        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '#root',
                    start: 'top top',
                    end: `bottom top`,
                    scrub: 1,
                    markers: false,
                    toggleActions: 'play none none reverse',
                },
            });

            tl.to(
                cameraRef.current.position,
                {
                    y: -17,
                },
                0,
            );
        });

        return () => ctx.revert();
    }, [cameraRef.current]);

    return (
        <>
            <div id="main-wrapper" className="relative z-10">
                <Welcome />
                <About />
                <Projects />
                <Connect />
            </div>
            <Suspense fallback={<span>loading...</span>}>
                <StyledCanvas
                    className="absolute left-0 top-0"
                    shadows
                    dpr={[1, 2]}
                    // gl={{ antialias: false }}
                    // camera={{ position: [-0.1, 0, 8], fov: 50 }}
                >
                    <CustomCamera />
                    {/* <Stats /> */}
                    {/* <OrbitControls /> */}

                    <Boxes />
                    <Floor />

                    {/* <FlowField width={5} height={5} segments={100} /> */}

                    <BackgroundAndLights />

                    {/* <Tubes /> */}
                    <Environment preset="warehouse" />
                </StyledCanvas>
            </Suspense>
        </>
    );
}

function CustomCamera() {
    const cameraRef = useRef();

    return (
        <PerspectiveCamera
            makeDefault
            ref={cameraRef}
            gl={{ antialias: true }}
            position={[0, 0, 8]}
            fov={40}
            near={0.1}
            far={1000}
        />
    );
}

const MeshEdgesMaterial = shaderMaterial(
    {
        color: new THREE.Color('blue'),
        size: new THREE.Vector3(1, 1, 1),
        thickness: 0.01,
        smoothness: 0.2,
    },
    /*glsl*/ `varying vec3 vPosition;
    void main() {
      vPosition = position;
      gl_Position = projectionMatrix * viewMatrix * instanceMatrix * vec4(position, 1.0);
    }`,
    /*glsl*/ `varying vec3 vPosition;
    uniform vec3 size;
    uniform vec3 color;
    uniform float thickness;
    uniform float smoothness;
    void main() {
      vec3 d = abs(vPosition) - (size * 0.5);
      float a = smoothstep(thickness, thickness + smoothness, min(min(length(d.xy), length(d.yz)), length(d.xz)));
      gl_FragColor = vec4(0.0, 1.0, 0.0, 0.0);
    }`,
);

extend({ MeshEdgesMaterial });

function Bg({ timeline }) {
    const mesh = useRef();

    const colorStart = useMemo(() => new THREE.Color('black'), []);
    const colorEnd = useMemo(() => new THREE.Color('#290345'), []);
    // const colorEnd = useMemo(() => new THREE.Color('#073B4C'), []);

    const materialRef = useRef();
    const gradientRef = useRef();

    useFrame((state, delta) => {
        mesh.current.rotation.x = mesh.current.rotation.y = mesh.current.rotation.z += delta * 0.4;

        let lerpColor = colorStart;
        let lerpColor2 = colorEnd;

        // const lerpFactor = Math.sin(data.offset, 0.2);
        // lerpColor = new THREE.Color().lerpColors(colorStart, colorStart2, lerpFactor);
        // lerpColor2 = new THREE.Color().lerpColors(colorEnd, colorEnd2, lerpFactor);

        gradientRef.current.colorA = lerpColor;
        gradientRef.current.colorB = lerpColor2;
    });

    return (
        <mesh ref={mesh} scale={30}>
            <meshBasicMaterial ref={materialRef} />
            <sphereGeometry args={[1, 64, 64]} />
            <LayerMaterial attach="material" reflectivity={0} side={THREE.BackSide}>
                <Gradient ref={gradientRef} />
            </LayerMaterial>
        </mesh>
    );
}

function Boxes() {
    const box1 = useRef();
    const box2 = useRef();
    const box3 = useRef();
    const movingBoxRef = useRef();
    const groupRef = useRef();

    // const color = '#111d2e';

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '#root',
                    start: 'top top',
                    end: `bottom top`,
                    scrub: 1,
                    markers: false,
                    toggleActions: 'play none none reverse',
                },
            });

            // tl.to(
            //     movingBoxRef.current.position,
            //     {
            //         y: -4,
            //         x: -2,
            //     },
            //     0,
            // );

            tl.to(
                groupRef.current.position,
                {
                    y: 10,
                },
                0,
            );

            tl.to(
                box1.current.position,
                {
                    y: 9,
                },
                0,
            );

            tl.to(
                box2.current.position,
                {
                    y: 6,
                },
                0,
            );
            tl.to(
                box3.current.position,
                {
                    y: 3,
                },
                0,
            );
        });

        return () => ctx.revert();
    }, []);

    const color = '#ef476f';

    return (
        <>
            {/* <Box ref={movingBoxRef} position={[0, 0, 1.1]} rotation={[0, 2, 1]} scale={1.5} color="#FF6363" /> */}
            <group ref={groupRef}>
                <Box ref={box1} position={[-3.4, -3.2, 2.8]} rotation={[2, 2, 1]} scale={3.5} color={color} />
                <Box ref={box2} position={[6.4, -2.2, 2.8]} rotation={[1, 2, 1]} scale={1} color={color} />
                <Box ref={box3} position={[-6.4, 1.8, 1.1]} rotation={[0, 2, 1]} scale={1.5} color={color} />
                <Box position={[3.4, 5.5, 1.1]} rotation={[0, 2, 1]} scale={1.5} color={color} />
                <Box position={[4.8, -16.5, 1.1]} rotation={[0, 2, 1]} scale={1} color={color} />
                <Box position={[-3.8, -13.5, 1.1]} rotation={[0, 2, 1]} scale={0.3} color={color} />
                <Box position={[-3.8, -19.5, 1.1]} rotation={[0, 2, 1]} scale={0.9} color={color} />
                <Box position={[-3.8, -8.5, 1.1]} rotation={[0, 2, 1]} scale={0.8} color={color} />
                <Box position={[3.8, -6.2, 1.1]} rotation={[0, 2, 1]} scale={0.7} color={color} />

                {/* 
                <mesh position={[-13, 10, -8]}>
                    <meshStandardMaterial color={color} roughness={0.3} />
                    <Box position={[0, 4, -8]} scale={3} color={'#FF6363'} />
                </mesh> */}
            </group>
        </>
    );
}

function BackgroundAndLights() {
    return (
        <>
            <Bg />
            {/* <fog attach="fog" args={[color, 10, 50]} /> */}
            {/* <RandomizedLight castShadow amount={8} frames={100} position={[5, 5, -10]} /> */}
            {/* <Sparkles count={50} scale={10} size={6} color="#14396c" speed={0.4} /> */}

            <Environment preset="studio" />
            {/* <ambientLight /> */}
        </>
    );
}

const Box = forwardRef(({ color, scale, ...props }, ref) => {
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    // useFrame(({ clock }) => {
    //     const t = Math.sin(clock.getElapsedTime()) * scale + 0.5;

    //     ref?.current.scale.set(t, t, t);
    // });

    return (
        <mesh
            {...props}
            ref={ref}
            scale={active ? 1.5 : scale}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}
        >
            <Float
                speed={3} // Animation speed, defaults to 1
                rotationIntensity={3} // XYZ rotation intensity, defaults to 1
                floatIntensity={0.1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
                floatingRange={[0, 1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
            >
                <RoundedBox
                    args={[1, 1, 1]} // Width, height, depth. Default is [1, 1, 1]
                    radius={hovered ? 0.5 : 0.05} // Radius of the rounded corners. Default is 0.05
                    smoothness={4} // The number of curve segments. Default is 4
                    bevelSegments={30} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
                    creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
                >
                    <meshStandardMaterial
                        emissive={hovered ? 'red' : ''}
                        color={hovered ? '#290345' : color}
                        roughness={0.3}
                        // emissiveIntensity={0.5}
                    />
                </RoundedBox>
            </Float>
        </mesh>
    );
});

export default Portfolio;
