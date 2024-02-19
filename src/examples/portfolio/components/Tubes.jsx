import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Tube, useScroll, RoundedBox } from '@react-three/drei';
import { Gradient, LayerMaterial } from 'lamina';
import { useControls, button } from 'leva';

export default function Tubes({ type }) {
    const curveRef = useRef(null);
    const objectRef = useRef(null);
    // const data = useScroll();

    const [points, setPoints] = useState([
        new THREE.Vector3(-4.4, 0, 0.1),
        new THREE.Vector3(-1, 2.2, 0),
        new THREE.Vector3(1, -3.1, 0.3),
        new THREE.Vector3(3, 0, 0),
        new THREE.Vector3(5, 0, 0),
    ]);

    const updatePoint = (index, value) => {
        setPoints((prevPoints) => {
            const newPoints = [...prevPoints];
            newPoints[index] = new THREE.Vector3(value[0], value[1], value[2]);
            return newPoints;
        });
    };

    const handleAddPoint = () => {
        const newPoint = new THREE.Vector3(5, 0, 0);
        setPoints((prevPoints) => [...prevPoints, newPoint]);
    };

    const pointControls = points.reduce((acc, item, index) => {
        acc[index] = {
            value: [points[index].x, points[index].y, points[index].z],
            min: -10,
            max: 10,
            step: 0.1,
            onChange: (index, test, hoi) => updatePoint(parseInt(hoi.key), index),
            label: `point ${index}`,
        };

        return acc;
    }, {});

    const { addPoint, movePointIndex, movePointPosition } = useControls('tube', {
        pointIndex: { value: [1, 2, 3], min: 0, max: 10, step: 1, onChange: (index) => console.log({ index }) },
        ...pointControls,
        addPoint: button(() => handleAddPoint()),
    });

    // Create a Catmull-Rom spline curve that passes through the points
    const curve = new THREE.CatmullRomCurve3(points, false, type, 0.8);

    // useFrame(({ state, camera }) => {
    //     const position = curve.getPointAt(data.offset);
    //     objectRef.current.position.copy(position);

    //     // Calculate tangent to the curve to determine rotation
    //     const tangent = curve.getTangentAt(data.offset).normalize();

    //     // Calculate a normal vector based on the tangent
    //     const normal = new THREE.Vector3().crossVectors(tangent, new THREE.Vector3(0, 0, 1)).normalize();

    //     // Use quaternion to set rotation based on tangent and normal
    //     const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
    //     objectRef.current.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeRotationFromQuaternion(quaternion));
    // });

    return (
        <group rotation={[Math.PI / 2, -Math.PI / 2, 0]} position={[2, 0, 0]}>
            {/* <mesh ref={objectRef}>
                <sphereGeometry args={[0.03, 32, 32]} />
                <meshBasicMaterial color="white" />
            </mesh> */}
            <RoundedBox
                ref={objectRef}
                args={[0.5, 0.5, 0.5]} // Width, height, depth. Default is [1, 1, 1]
                radius={0.1} // Radius of the rounded corners. Default is 0.05
                smoothness={1} // The number of curve segments. Default is 4
                bevelSegments={10} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
                creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
            >
                <meshStandardMaterial emissive={'red'} color={'#ea5733'} roughness={0.2} emissiveIntensity={0} />
                {/* <meshPhongMaterial color={hovered ? 'red' : color} /> */}
            </RoundedBox>
            <Tube args={[curve, 264, 0.01]}>
                <meshBasicMaterial attach="material" color="white" />
                <LayerMaterial attach="material" side={THREE.BackSide}>
                    <Gradient colorA={'#290345'} colorB={'#00b2ca'} />
                </LayerMaterial>
            </Tube>
            <line ref={curveRef}>
                <lineDashedMaterial attach="material" color="white" dashSize={0.1} gapSize={0.05} />
            </line>
        </group>
    );
}
