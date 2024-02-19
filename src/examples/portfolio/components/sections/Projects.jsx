import { Center, Text, Html, useScroll, Scroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import SplitType from 'split-type';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { SplitText } from 'gsap/all';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
    const containerRef = useRef();
    const textRef = useRef();

    useEffect(() => {
        if (!containerRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef?.current,
                start: 'top center', // Change the start position if needed
                pin: textRef.current,
                end: '+=200',
            },
        });

        const splitText = new SplitType(textRef.current, {
            types: 'chars',
            wordClass: 'large-highlight-word',
        });

        tl.from(splitText.chars, {
            yPercent: 100,
            color: 'red',
            opacity: 0,
            clipPath: 'inset(0 0 100% 0)', // Starting clip-path
            stagger: 0.1,
        });
    }, []);

    return (
        <div
            className="container text-white bg-[red] flex h-screen bg-red w-full justify-center items-center text-8xl test"
            ref={containerRef}
        >
            <h2 ref={textRef} id="test">
                Projects
            </h2>
        </div>
    );
}
