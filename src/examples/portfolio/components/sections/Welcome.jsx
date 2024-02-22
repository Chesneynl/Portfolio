import SplitType from 'split-type';
import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

export default function Welcome() {
    const nameRef = useRef();
    const lineRef = useRef();
    const functionRef = useRef();

    useEffect(() => {
        if (!nameRef.current) return;

        let ctx = gsap.context(() => {
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

            tl.to(lineRef.current, {
                width: '100%',
                duration: 1,
                delay: 0.1,
            });

            tl.to(functionRef.current, {
                opacity: 1,
                duration: 1,
                delay: 0.2,
            });
        });

        return () => ctx.revert();
    }, [nameRef?.current]);

    return (
        <div className="container text-white flex flex-col md:flex-row-reverse h-screen w-full justify-center gap-4 md:items-center">
            <h1 ref={nameRef} className="text-7xl md:text-8xl pb-3 font-micro uppercase">
                Chesney
                <br />
                Buitendijk
            </h1>
            <div ref={lineRef} className="w-0 h-1 rounded-full bg-white md:h-full flex-grow-0" />
            <h2 ref={functionRef} className="text-3xl md:text-8xl opacity-0 pt-1">
                Freelance developer
            </h2>
        </div>
    );
}
