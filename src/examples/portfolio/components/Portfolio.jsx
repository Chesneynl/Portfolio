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
    useProgress,
    useScroll,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Bloom, DepthOfField, EffectComposer, SSAO, Vignette } from '@react-three/postprocessing';
import gsap from 'gsap';
import { DebugLayerMaterial, Gradient, LayerMaterial, Noise, Normal } from 'lamina';
import { useControls } from 'leva';
import colors from 'nice-color-palettes/200';
import { forwardRef, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import React from 'react';
import * as THREE from 'three';

import { StyledCanvas } from '../App.styled';
import Tubes from './Tubes';
import Welcome from './Welcome';
const AnimatedMaterial = a(MeshDistortMaterial);

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
                    shadows
                    dpr={[1, 2]}
                    // gl={{ antialias: false }}
                    // camera={{ fov: 30, position: [5, 0, 15] }}
                    camera={{ position: [-0.1, 0, 8], fov: 50 }}
                >
                    {/* <Effects /> */}
                    <BackgroundAndLights />

                    <Boxes timeline={timeline} />

                    {/*<PerformanceMonitor onDecline={() => degrade(true)} />*/}
                    {/*/!* <OrbitControls /> *!/*/}
                    {/*<Stats />*/}
                    <ScrollControls pages={1}>
                        {/*<Bubbles />*/}
                        <Welcome timeline={timeline} />

                        <Environment preset="warehouse" />
                    </ScrollControls>
                </StyledCanvas>
            </Suspense>
        </>
    );
}

function Bg({ timeline }) {
    const mesh = useRef();
    // const data = useScroll();

    const lerpedColorRef = useRef(new THREE.Color());

    const colorPallete = colors[67];
    const colorStart = useMemo(() => new THREE.Color('black'), []);
    const colorEnd = useMemo(() => new THREE.Color('#290345'), []);

    const materialRef = useRef();
    const gradientRef = useRef();

    useFrame((state, delta) => {
        mesh.current.rotation.x = mesh.current.rotation.y = mesh.current.rotation.z += delta * 0.4;

        let lerpColor = colorStart;
        let lerpColor2 = colorEnd;

        // if (data.offset > 0.2) {
        //     const lerpFactor = Math.sin(data.offset, 0.2);
        //     lerpColor = new THREE.Color().lerpColors(colorStart, colorStart2, lerpFactor);
        //     lerpColor2 = new THREE.Color().lerpColors(colorEnd, colorEnd2, lerpFactor);
        // }

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

function Boxes({ timeline }) {
    const box1 = useRef();
    const box2 = useRef();
    const box3 = useRef();
    const box4 = useRef();

    const { color } = useControls({
        color: '#111d2e',
    });

    useEffect(() => {
        gsap.from(box1.current.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 5,
            ease: 'power4.out',
        });
        gsap.from(box2.current.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 2,
            ease: 'power4.out',
        });
        gsap.from(box3.current.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 2.5,
            ease: 'power4.out',
        });
        gsap.from(box4.current.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 4,
            ease: 'power4.out',
        });

        timeline
            .to(
                box1.current.position,
                {
                    y: 10,
                    ease: 'power4.out',
                    duration: 0.3,
                },
                0,
            )
            .to(
                box2.current.position,
                {
                    y: 10,
                    ease: 'power4.out',
                    duration: 0.3,
                },
                0,
            )
            .to(
                box3.current.position,
                {
                    y: 10,
                    ease: 'power4.out',
                    duration: 0.3,
                },
                0,
            )
            .to(
                box4.current.position,
                {
                    y: 10,
                    ease: 'power4.out',
                    duration: 0.3,
                },
                0,
            );
    }, []);

    return (
        <>
            <Box ref={box1} position={[-3.4, -3.2, 2.8]} rotation={[2, 2, 1]} scale={3.5} color="#290345" />
            <Box ref={box2} position={[3.9, -2.2, 1.8]} rotation={[1, 2, 1]} scale={1} color="green" />
            <Box ref={box3} position={[3.4, 2.5, 1.1]} rotation={[0, 2, 1]} scale={1.5} color="red" />

            <Box ref={box4} position={[-5, 4, -8]} rotation={[0, 5.3, 5]} scale={1.5} color={color} />
            {/* <Instances limit={particles.length} castShadow receiveShadow position={[0, 0, 0]}>
                <sphereGeometry args={[1, 32, 32]} />

                {particles.map((data, i) => {
                    console.log({ data });
                    return (
                        <>
                            <meshStandardMaterial color="hotpink" />

                            <Box
                                {...data}
                                position={[data.xFactor, data.yFactor, data.zFactor]}
                                scale={data.factor}
                                color="#4B0082"
                            />
                        </>
                    );
                })}
            </Instances> */}
        </>
    );
}

const particles = Array.from({ length: 20 }, () => ({
    factor: THREE.MathUtils.randInt(0.1, 8),
    speed: THREE.MathUtils.randFloat(0.01, 0.4),
    xFactor: THREE.MathUtils.randFloatSpread(5),
    yFactor: THREE.MathUtils.randFloatSpread(6),
    zFactor: THREE.MathUtils.randFloatSpread(15),
}));

function BackgroundAndLights() {
    const { color } = useControls({
        color: '#111d2e',
    });

    return (
        <>
            {/* <Tubes /> */}
            <Bg />
            {/* <fog attach="fog" args={[color, 10, 50]} /> */}
            <RandomizedLight castShadow amount={8} frames={100} position={[5, 5, -10]} />
            <Sparkles count={50} scale={10} size={6} color="#14396c" speed={0.4} />
            <Stars radius={100} depth={50} count={100} factor={4} saturation={0} fade speed={1} />
            <Environment preset="studio" />
            <ambientLight />
            <pointLight position={[15, 15, 15]} intensity={1} />
        </>
    );
}

function Effects() {
    const { focusDistance, focalLength, bokehScale, height } = useControls({
        focusDistance: {
            min: 0,
            max: 4,
            value: 2,
        },
        focalLength: {
            min: 0,
            max: 1,
            value: 0.1,
        },
        bokehScale: {
            min: 0,
            max: 10,
            value: 2,
        },
    });

    return (
        <EffectComposer multisampling={0} disableNormalPass={true}>
            <DepthOfField focusDistance={10} focalLength={focalLength} bokehScale={bokehScale} />
            {/* <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} opacity={3} /> */}
            {/* <Vignette eskil={false} offset={0.2} darkness={0.5} /> */}
        </EffectComposer>
    );
}

const Box = forwardRef(({ color, scale, ...props }, ref) => {
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);
    // Subscribe this component to the render-loop, rotate the mesh every frame

    // Return view, these are regular three.js elements expressed in JSX
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
                speed={1} // Animation speed, defaults to 1
                rotationIntensity={5} // XYZ rotation intensity, defaults to 1
                floatIntensity={0.1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
                floatingRange={[0, 1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
            >
                <RoundedBox
                    args={[1, 1, 1]} // Width, height, depth. Default is [1, 1, 1]
                    radius={0.1} // Radius of the rounded corners. Default is 0.05
                    smoothness={10} // The number of curve segments. Default is 4
                    bevelSegments={10} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
                    creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
                >
                    <meshStandardMaterial
                        emissive={hovered ? 'red' : 'blue'}
                        color={color}
                        roughness={0}
                        emissiveIntensity={0.5}
                    />
                    {/* <meshPhongMaterial color={hovered ? 'red' : color} /> */}
                </RoundedBox>
            </Float>
        </mesh>
    );
});

export default Portfolio;
