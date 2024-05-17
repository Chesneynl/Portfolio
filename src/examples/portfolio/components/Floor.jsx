import * as THREE from 'three';
import { Suspense, useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Instances, Instance, Line, Merged } from '@react-three/drei';
// import { Outlines } from '@react-three/postprocessing';

function Box({ id, object, temp = new THREE.Object3D(), ...props }) {
    const ref = useRef();
    const groupRef = useRef();
    const xPosition = object.position.x;
    const yPosition = object.position.y;
    const zPosition = object.position.z;
    const linesSize = 0.5;
    const lineWidth = 3;
    const lineColor = '#FF6363';

    useEffect(() => {
        if (!ref.current) return;

        ref.current.position.copy(object.position);
    }, [object]);

    useFrame((state) => {
        if (!ref.current || !object.shouldMove) return;

        const displacement = ((Math.sin(state.clock.getElapsedTime() + id) + 1) / 2) * object.maxZ;

        // ref.current.scale = 2;
        groupRef.current.position.z = displacement;
    });

    return (
        <group {...props} ref={groupRef}>
            <mesh ref={ref}>
                {/* <Line
                    points={[
                        [xPosition - linesSize, yPosition - linesSize, zPosition - linesSize],
                        [xPosition - linesSize, yPosition - linesSize, zPosition + linesSize],
                        [xPosition - linesSize, yPosition + linesSize, zPosition + linesSize],
                        [xPosition - linesSize, yPosition + linesSize, zPosition - linesSize],
                        [xPosition - linesSize, yPosition - linesSize, zPosition - linesSize],
                    ]}
                    color={lineColor}
                    lineWidth={lineWidth}
                />
                <Line
                    points={[
                        [xPosition + linesSize, yPosition - linesSize, zPosition - linesSize],
                        [xPosition + linesSize, yPosition - linesSize, zPosition + linesSize],
                        [xPosition + linesSize, yPosition + linesSize, zPosition + linesSize],
                        [xPosition + linesSize, yPosition + linesSize, zPosition - linesSize],
                        [xPosition + linesSize, yPosition - linesSize, zPosition - linesSize],
                    ]}
                    color={lineColor}
                    lineWidth={lineWidth}
                />
                <Line
                    points={[
                        [xPosition - linesSize, yPosition - linesSize, zPosition - linesSize],
                        [xPosition + linesSize, yPosition - linesSize, zPosition - linesSize],
                        [xPosition + linesSize, yPosition - linesSize, zPosition + linesSize],
                        [xPosition - linesSize, yPosition - linesSize, zPosition + linesSize],
                        [xPosition - linesSize, yPosition - linesSize, zPosition - linesSize],
                    ]}
                    color={lineColor}
                    lineWidth={lineWidth}
                />
                <Line
                    points={[
                        [xPosition - linesSize, yPosition + linesSize, zPosition - linesSize],
                        [xPosition + linesSize, yPosition + linesSize, zPosition - linesSize],
                        [xPosition + linesSize, yPosition + linesSize, zPosition + linesSize],
                        [xPosition - linesSize, yPosition + linesSize, zPosition + linesSize],
                        [xPosition - linesSize, yPosition + linesSize, zPosition - linesSize],
                    ]}
                    color={lineColor}
                    lineWidth={lineWidth}
                /> */}
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="black" roughness={0.8} emissiveIntensity={0.5} />
            </mesh>
            <Instance ref={ref} />
        </group>
    );
}

function Boxes({ count = 50, objects, temp = new THREE.Object3D() }) {
    console.log({ objects });

    const material = new THREE.MeshLambertMaterial({ color: 'red' });
    const boxesGeometry = new THREE.BoxBufferGeometry(0.5, 0.5, 0.5);

    return (
        <group>
            <Instances range={1000} geometry={[boxesGeometry, material]}>
                <instancedMesh args={[boxesGeometry, material]} />
                {/* {objects.map((obj, i) => (
                    <instancedMesh key={`box-${i}`}>
                        <Box id={i} object={obj} />
                    </instancedMesh>
                ))} */}
            </Instances>
        </group>
    );
}

const rand11 = () => Math.random() * 2.0 - 1.0;

export default function Floor({ count = 10, _normal = new THREE.Vector3(), _position = new THREE.Vector3(0, 0, 30) }) {
    const [trees, setTrees] = useState([]);

    useEffect(() => {
        for (let x = 0; x < count * 3; x++) {
            for (let y = 0; y < count; y++) {
                const tree = {
                    position: new THREE.Vector3(x, y, 0),
                    maxZ: Math.random(),
                    shouldMove: Math.random() < 0.5,
                };
                setTrees((prev) => [...prev, tree]);
            }

            // tree.position.set(rand11() * 30.0, rand11() * 10.0, 0.0);
        }
    }, []);

    return (
        <group
            // rotation-x={-Math.PI / 4}
            rotation-x={-Math.PI / 2}
            position={[-15, -2.8, 1]}
        >
            <Boxes objects={trees} count={count} />
        </group>
    );
}
