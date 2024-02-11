import { Center, Text, Html, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import React, { useEffect, useLayoutEffect, useRef } from 'react';

export default function Welcome({ timeline }) {
    const hiImRef = useRef();
    const nameRef = useRef();
    const textRef = useRef();
    const data = useScroll();

    useEffect(() => {
        if (!nameRef.current) return;
        console.log('yoyoyo');
        // const tl = gsap.timeline({
        //     scrollTrigger: {
        //         trigger: nameRef.current,
        //         start: 'top bottom',
        //         end: 'bottom 10%',
        //         scrub: 1,
        //     },
        // });

        timeline
            // .to(
            //     textRef.current.position,
            //     {
            //         y: 5,
            //         ease: 'power4.out',
            //         duration: 0.3,
            //     },
            //     0,
            // )
            .to(hiImRef.current.material, {
                opacity: 0,
                ease: 'power4.out',
                duration: 0.1,
            })
            .to(nameRef.current.material, {
                opacity: 0,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: textRef.current,
                    start: 'top 50%',
                    end: 'top 20%',
                    scrub: true,
                },
                duration: 0.1,
            });
    }, [nameRef?.current]);

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
