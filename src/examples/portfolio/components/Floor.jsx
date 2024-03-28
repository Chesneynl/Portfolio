import * as THREE from 'three';
import { Suspense, useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Instances, Instance, Line } from '@react-three/drei';
// import { Outlines } from '@react-three/postprocessing';

function Box({ id, object, temp = new THREE.Object3D(), ...props }) {
    const ref = useRef();
    console.log(object);

    useEffect(() => {
        if (!ref.current) return;

        ref.current.position.copy(object.position);
    }, [object]);

    useFrame((state) => {
        if (!ref.current || !object.shouldMove) return;

        const displacement = ((Math.sin(state.clock.getElapsedTime() + id) + 1) / 2) * object.maxZ;

        ref.current.position.z = displacement;
    });

    return (
        <group {...props}>
            <Instance ref={ref} />
        </group>
    );
}

function Boxes({ count = 50, objects, temp = new THREE.Object3D() }) {
    return (
        <group>
            <Instances range={1000}>
                <boxGeometry />
                <meshStandardMaterial color="black" roughness={0.8} emissiveIntensity={0.5} />
                {objects.map((obj, i) => (
                    <instancedMesh>
                        <Line
                            points={[
                                [-i, -1, -1],
                                [-i, -1, 1],
                                [-i, 1, 1],
                                [-1, 1, -1],
                                [-1, -1, -1],
                            ]}
                            color="white"
                            lineWidth={2}
                        />
                        <Line
                            points={[
                                [1, -1, -1],
                                [1, -1, 1],
                                [1, 1, 1],
                                [1, 1, -1],
                                [1, -1, -1],
                            ]}
                            color="white"
                            lineWidth={2}
                        />
                        <Line
                            points={[
                                [-1, -1, -1],
                                [1, -1, -1],
                                [1, -1, 1],
                                [-1, -1, 1],
                                [-1, -1, -1],
                            ]}
                            color="white"
                            lineWidth={2}
                        />
                        <Line
                            points={[
                                [-1, 1, -1],
                                [1, 1, -1],
                                [1, 1, 1],
                                [-1, 1, 1],
                                [-1, 1, -1],
                            ]}
                            color="white"
                            lineWidth={2}
                        />
                        <Box key={i} id={i} object={obj} />
                    </instancedMesh>
                ))}
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

    console.log({ trees });

    return (
        <group
            // rotation-x={-Math.PI / 4}
            rotation-x={-Math.PI / 4}
            position={[-4, -1.8, 1]}
        >
            <Boxes objects={trees} count={count} />
        </group>
    );
}
