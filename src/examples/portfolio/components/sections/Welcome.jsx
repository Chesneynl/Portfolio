import { Center, Text, Html, useScroll, Scroll } from '@react-three/drei';
import SplitType from 'split-type';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import React, { useEffect, useLayoutEffect, useRef } from 'react';

export default function Welcome() {
    const hiImRef = useRef();
    const nameRef = useRef();
    const textRef = useRef();
    const data = useScroll();

    useEffect(() => {
        if (!nameRef.current) return;
        const tl = gsap.timeline();

        const splitText = new SplitType(nameRef.current, {
            types: 'words',
        });

        tl.from(splitText.words, {
            yPercent: 100,
            opacity: 0,
            delay: 1,
            clipPath: 'inset(0 0 100% 0)', // Starting clip-path
            stagger: 0.1,
        });
    }, [nameRef?.current]);

    return (
        <div className="container bg-[blue] text-white flex h-screen bg-red w-full justify-center items-center text-8xl">
            <h1 ref={nameRef}>
                Chesney
                <br />
                Buitendijk
            </h1>
        </div>
    );
}
