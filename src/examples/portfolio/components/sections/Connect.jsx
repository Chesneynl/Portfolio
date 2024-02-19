import { Center, Text, Html, useScroll, Scroll } from '@react-three/drei';
import SplitType from 'split-type';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import React, { useEffect, useLayoutEffect, useRef } from 'react';

export default function Connect() {
    const containerRef = useRef();
    const textRef = useRef();

    useLayoutEffect(() => {
        if (!containerRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef?.current,
                start: 'top 20%',
                markers: true,
            },
        });

        const splitText = new SplitType(textRef.current, {
            types: 'words',
        });

        tl.from(splitText.words, {
            yPercent: 100,
            color: 'red',
            opacity: 0,
            clipPath: 'inset(0 0 100% 0)', // Starting clip-path
            stagger: 0.1,
        });
    }, []);

    return (
        <div
            className="container text-white flex h-screen bg-red w-full justify-center items-center text-8xl"
            ref={containerRef}
        >
            <h3 ref={textRef}>
                Let's
                <br />
                Connect
            </h3>
        </div>
    );
}
