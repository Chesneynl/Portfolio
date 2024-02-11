import { Center, Text, Html, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { SplitText } from 'gsap/all';
import React, { useEffect, useLayoutEffect, useRef } from 'react';

export default function Projects({ timeline }) {
    const hiImRef = useRef();
    const textRef = useRef();
    const data = useScroll();

    useEffect(() => {
        if (!textRef.current) return;
        const trigger = { position: textRef.current.position };
        console.log({ textRef });

        ScrollTrigger.create({
            trigger, // Reference to the trigger element
            start: 'top center', // When to start the animation
            end: 'bottom center', // When to end the animation
            toggleActions: 'play none none none', // Actions to take when toggling
            onToggle: ({ isActive }) => {
                if (isActive) {
                    // Your animation code here
                    console.log('Text is in view');
                }
            },
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: textRef?.current,
                start: 'top top',
                end: 'bottom 10%',
                scrub: 1,
                markers: true,
            },
        });

        tl.to(textRef.current.position, {
            y: -10,
            x: -4,
            stagger: 0.1,
        });
    }, []);

    return (
        <>
            <Text position={[-2, -10, 0]} anchorX="center" anchorY="middle" ref={textRef}>
                <Text ref={hiImRef} anchorY="bottom" anchorX="left" font={'fonts/bebas.ttf'}>
                    <meshBasicMaterial color={'white'} />
                    Projects
                </Text>
            </Text>
        </>
    );
}
