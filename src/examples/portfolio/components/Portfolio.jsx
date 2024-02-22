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
    Scroll,
    PerspectiveCamera,
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
import Connect from './sections/Connect';
import FlowField from './FlowField';
import Projects from './sections/Projects';
import { useTrailTexture } from './useTrailTexture';

const AnimatedMaterial = a(MeshDistortMaterial);

const PAGES = 5;

function Loader() {
    const { progress } = useProgress();
    return <Html center>{progress} % loaded</Html>;
}

function Portfolio() {
    return (
        <>
            <div id="main-wrapper" className="relative z-10">
                <Welcome />
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
                    {/* <Effects /> */}

                    <Stats />
                    {/* <group rotation-x={Math.PI} position={[0, 0, zIndex]}>
                        <Thing scale={3} />
                    </group> */}

                    <Boxes />
                    {/* <FlowField width={5} height={5} segments={100} /> */}

                    <BackgroundAndLights />

                    {/* <Scroll html className="w-full"></Scroll> */}

                    {/* <Tubes /> */}
                    <Environment preset="warehouse" />
                </StyledCanvas>
            </Suspense>
        </>
    );
}

const ParticleSystem = () => {
    const splineRef = useRef();
    const particlesRef = useRef();

    useEffect(() => {
        // Create a spline curve
        const spline = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-5, 0, 0),
            new THREE.Vector3(-2, 2, 0),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(2, -2, 0),
            new THREE.Vector3(5, 0, 0),
        ]);

        splineRef.current = spline;

        // Create particles along the spline
        const particles = new Array(1000).fill().map(() => {
            const position = new THREE.Vector3();
            const tangent = new THREE.Vector3();
            const axis = new THREE.Vector3(0, 1, 0);

            return { position, tangent, axis };
        });

        particlesRef.current = particles;
    }, []);

    useEffect(() => {
        // Update particles along the spline
        if (splineRef.current && particlesRef.current) {
            const spline = splineRef.current;
            const particles = particlesRef.current;

            particles.forEach((particle, index) => {
                const t = index / particles.length;
                spline.getPointAt(t, particle.position);
                spline.getTangentAt(t, particle.tangent);
                particle.axis.crossVectors(particle.tangent, axis).normalize();
            });
        }
    }, [splineRef, particlesRef]);

    return (
        <>
            <mesh>
                <tubeBufferGeometry args={[splineRef.current, 100, 0.1, 8, false]} />
                <meshStandardMaterial color="blue" />
            </mesh>

            {particlesRef.current.map((particle, index) => (
                <Html key={index} center>
                    <div style={{ position: 'absolute', transform: `translate(-50%, -50%)` }}>•</div>
                </Html>
            ))}
        </>
    );
};

function Bg({ timeline }) {
    const mesh = useRef();
    const data = useScroll();

    const lerpedColorRef = useRef(new THREE.Color());

    const colorPallete = colors[67];
    const colorStart = useMemo(() => new THREE.Color('black'), []);
    const colorEnd = useMemo(() => new THREE.Color('#290345'), []);
    const colorStart2 = useMemo(() => new THREE.Color('black'), []);
    const colorEnd2 = useMemo(() => new THREE.Color('#450027'), []);

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

const DisplaceMaterial = shaderMaterial(
    { map: null, color: new THREE.Color('black'), color2: new THREE.Color('white'), amount: 1 },
    /* glsl */ `
      uniform sampler2D map;
      uniform float amount;
  
      varying float vDisplace;
      void main() {
        float displace = texture2D(map, uv).r;
        vDisplace = displace;
  
        vec3 pos = position;
        pos.z += displace * amount;
  
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    /* glsl */ `
      uniform vec3 color;
      uniform vec3 color2;
  
      varying float vDisplace;
      void main() {
        vec3 col = mix(color, color2, vDisplace);
        gl_FragColor.rgba = vec4(col, 1.0);
      }
    `,
);
extend({ DisplaceMaterial });

function Thing(props) {
    const { debug, ease, zIndex, ...conf } = useControls('Trail', {
        size: { value: 64, min: 8, max: 256, step: 8 },
        radius: { value: 0.3, min: 0, max: 1 },
        maxAge: { value: 750, min: 300, max: 1000 },
        interpolate: { value: 0, min: 0, max: 2, step: 1 },
        smoothing: { value: 0, min: 0, max: 0.99, step: 0.01 },
        minForce: { value: 0.3, min: 0, max: 1, step: 0.1 },
        intensity: { value: 0.2, min: 0, max: 1, step: 0.1 },
        blend: { value: 'screen', options: ['source-over', 'screen'] },
        ease: { value: 'easeCircleOut', options: Object.keys(easings) },
        debug: false,
    });
    const disp = useControls('Displacement', {
        amount: { value: 0.1, min: 0, max: 0.5 },
    });

    const { texture, onMove } = useTrailTexture({ ...conf, ease: easings[ease] });

    return (
        <>
            <mesh onPointerMove={onMove} {...props}>
                <planeGeometry args={[1, 1, 10, 10]} />
                {debug && <meshBasicMaterial map={texture} />}
                <displaceMaterial
                    key={DisplaceMaterial.key}
                    map={texture}
                    side={THREE.DoubleSide}
                    {...disp}
                    wireframe
                />
            </mesh>
        </>
    );
}

function Boxes() {
    const timeline = gsap.timeline();
    const box1 = useRef();
    const box2 = useRef();
    const box3 = useRef();
    const box4 = useRef();

    const { color } = useControls('boxes', {
        color: '#111d2e',
    });

    // useLayoutEffect(() => {
    //     gsap.from(box1.current.scale, {
    //         x: 0,
    //         y: 0,
    //         z: 0,
    //         duration: 5,
    //         ease: 'power4.out',
    //     });
    //     gsap.from(box2.current.scale, {
    //         x: 0,
    //         y: 0,
    //         z: 0,
    //         duration: 2,
    //         ease: 'power4.out',
    //     });
    //     gsap.from(box3.current.scale, {
    //         x: 0,
    //         y: 0,
    //         z: 0,
    //         duration: 2.5,
    //         ease: 'power4.out',
    //     });
    //     gsap.from(box4.current.scale, {
    //         x: 0,
    //         y: 0,
    //         z: 0,
    //         duration: 4,
    //         ease: 'power4.out',
    //     });

    //     timeline
    //         .to(
    //             box1.current.position,
    //             {
    //                 y: 10,
    //                 ease: 'power4.out',
    //                 duration: 0.3,
    //             },
    //             0,
    //         )
    //         .to(
    //             box2.current.position,
    //             {
    //                 y: 10,
    //                 ease: 'power4.out',
    //                 duration: 0.3,
    //             },
    //             0,
    //         )
    //         .to(
    //             box3.current.position,
    //             {
    //                 y: 10,
    //                 ease: 'power4.out',
    //                 duration: 0.3,
    //             },
    //             0,
    //         )
    //         .to(
    //             box4.current.position,
    //             {
    //                 y: 10,
    //                 ease: 'power4.out',
    //                 duration: 0.3,
    //             },
    //             0,
    //         );
    // }, []);

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
    return (
        <>
            <Bg />
            {/* <fog attach="fog" args={[color, 10, 50]} /> */}
            <RandomizedLight castShadow amount={8} frames={100} position={[5, 5, -10]} />
            {/* <Sparkles count={50} scale={10} size={6} color="#14396c" speed={0.4} /> */}

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

    const { smoothness, radius, bevelSegments, roughness, creaseAngle, emissiveIntensity } = useControls({
        smoothness: { value: 10, min: 0, max: 100, step: 1 },
        bevelSegments: { value: 10, min: 0, max: 100, step: 1 },
        creaseAngle: { value: 0.4, min: 0, max: 2, step: 0.1 },
        roughness: { value: 0.3, min: 0, max: 2, step: 0.1 },
        emissiveIntensity: { value: 0.5, min: 0, max: 2, step: 0.1 },
        radius: { value: 0.05, min: 0, max: 0.5, step: 0.01 },
    });

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
                    radius={radius} // Radius of the rounded corners. Default is 0.05
                    smoothness={smoothness} // The number of curve segments. Default is 4
                    bevelSegments={bevelSegments} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
                    creaseAngle={creaseAngle} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
                >
                    <meshStandardMaterial
                        emissive={hovered ? 'red' : 'blue'}
                        color={color}
                        roughness={roughness}
                        emissiveIntensity={emissiveIntensity}
                    />
                    {/* <meshPhongMaterial color={hovered ? 'red' : color} /> */}
                </RoundedBox>
            </Float>
        </mesh>
    );
});

export default Portfolio;
