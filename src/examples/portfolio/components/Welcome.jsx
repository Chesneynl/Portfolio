import React, { useEffect, useRef } from 'react';
import { Center, Html, Text, useScroll } from '@react-three/drei';
import gsap from 'gsap';
import { useFrame } from '@react-three/fiber';

export default function Welcome({ timeline }) {
    const hiImRef = useRef();
    const nameRef = useRef();
    const textRef = useRef();
    const data = useScroll();

    useEffect(() => {
        gsap.from(hiImRef.current.position, {
            x: 10,
            duration: 1,
            ease: 'power4.out',
        });

        gsap.from(nameRef.current.position, {
            x: 10,
            duration: 1,
            ease: 'power4.out',
        });

        timeline
            .to(
                textRef.current.position,
                {
                    y: 5,
                    ease: 'power4.out',
                    duration: 0.3,
                },
                0,
            )
            .to(hiImRef.current.material, {
                opacity: 0,
                ease: 'power4.out',
                duration: 0.1,
            })
            .to(nameRef.current.material, {
                opacity: 0,
                ease: 'power4.out',
                duration: 0.1,
            });
    }, []);

    useFrame(({ camera }) => {
        timeline.progress(data.offset);
    });

    return (
        <>
            <Text position={[-2, 0, 0]} anchorX="center" anchorY="middle" ref={textRef}>
                <Text ref={hiImRef} anchorY="bottom" anchorX="left" font={'fonts/bebas.ttf'}>
                    <meshBasicMaterial color={'white'} />
                    Chesney
                </Text>
                <Text ref={nameRef} position={[0, 0.22, 0]} anchorY="top" anchorX="left" font={'fonts/bebas.ttf'}>
                    Buitendijk
                    <meshBasicMaterial color={'white'} />
                </Text>
            </Text>
        </>
    );
}
