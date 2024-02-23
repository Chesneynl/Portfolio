import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Vector3 } from 'three';
import { gsap } from 'gsap';

export default function FlowField({ width, height, segments }) {
    const flowFieldRef = useRef();

    useEffect(() => {
        const flowField = flowFieldRef.current;
        const points = flowField.geometry.attributes.position.array;

        // Create a flow field pattern
        for (let i = 0; i < points.length; i += 3) {
            const x = points[i];
            const y = points[i + 1];

            const angle = Math.atan2(y, x);
            const radius = Math.sqrt(x ** 2 + y ** 2);

            const distortion = Math.sin(angle * segments * 0.1) * 10;

            points[i] = (radius + distortion) * Math.cos(angle);
            points[i + 1] = (radius + distortion) * Math.sin(angle);
        }

        flowField.geometry.attributes.position.needsUpdate = true;
    }, [segments]);

    useFrame(() => {
        // Rotate the flow field over time
        flowFieldRef.current.rotation.z += 0.005;
    });

    return (
        <points ref={flowFieldRef}>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attachObject={['attributes', 'position']}
                    count={(segments + 1) ** 2}
                    array={new Float32Array((segments + 1) ** 2 * 3)}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={0.02} color={0x9900ff} />
        </points>
    );
}
