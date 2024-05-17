import SplitType from 'split-type';
import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

let mm = gsap.matchMedia();

export default function Welcome({ loaded }) {
    const nameRef = useRef();
    const functionGroupRef = useRef();
    const lineRef = useRef();
    const functionsRef = useRef();

    useEffect(() => {
        if (!nameRef.current) return;

        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                paused: !loaded,
            });

            const splitText = new SplitType(nameRef.current, {
                types: 'words',
            });

            tl.from(splitText.words, {
                yPercent: 100,
                opacity: 0,
                color: '#290345',
                delay: 0.5,
                clipPath: 'inset(0 0 100% 0)', // Starting clip-path
                // stagger: 0.1,
            });

            tl.to(lineRef.current, {
                width: '10%',
                duration: 0.3,
                delay: 0.05,
            });

            tl.from(functionGroupRef.current, {
                duration: 1,
                opacity: 0,
            });
        });

        const words = functionsRef.current.querySelectorAll('.job-title');

        const slotTl = gsap.timeline({ repeat: -1, paused: !loaded });

        const height = 32;

        slotTl
            .to(functionsRef.current, {
                duration: 1,
                delay: 1,
                y: `-=${height}`,
                ease: 'none',
            })
            .to(
                words[1],
                {
                    opacity: 0,
                    duration: 0.5,
                    ease: 'none',
                },
                '-=0.5',
            )
            .to(
                words[2],
                {
                    opacity: 1,
                    duration: 0.5,
                    ease: 'none',
                },
                '-=0.5',
            )
            .to(functionsRef.current, {
                duration: 0.5,
                y: `-=${height}`,
                ease: 'none',
                delay: 1.5,
            })
            .to(
                words[2],
                {
                    opacity: 0,
                    duration: 0.5,
                    ease: 'none',
                },
                '-=0.5',
            )
            .to(
                words[3],
                {
                    opacity: 1,
                    duration: 0.5,
                    ease: 'none',
                },
                '-=0.5',
            )
            .to(functionsRef.current, {
                duration: 0.5,
                y: `-=${height}`,
                ease: 'none',
                delay: 1,
            })
            .to(
                words[3],
                {
                    opacity: 0,
                    duration: 0.5,
                    ease: 'none',
                },
                '-=0.5',
            )
            .to(
                words[4],
                {
                    opacity: 1,
                    duration: 0.5,
                    ease: 'none',
                },
                '-=0.5',
            )
            .to(functionsRef.current, {
                duration: 0,
                y: `-=${height}`,
                ease: 'none',
                delay: 1,
            });

        return () => ctx.revert();
    }, [nameRef?.current]);

    return (
        <div className="text-white flex flex-col min-h-screen w-full justify-center gap-2 items-center">
            <h1 ref={nameRef} className="text-[27vw] leading-none uppercase lg:pt-0 drop-shadow-lg">
                Chesney Buitendijk
            </h1>
            <div ref={lineRef} className="w-0 h-[1px]  bg-white flex-grow-0 flex-shrink-0" />
            <div
                className="text-2xl pb-3 font-micro uppercase lg:pb-0 text-secondary flex items-center justify-center gap-4"
                ref={functionGroupRef}
            >
                <div className="h-[96px] overflow-hidden">
                    <div className="whitespace-nowrap drop-shadow-lg" ref={functionsRef}>
                        <div className="job-title opacity-0">Front-end</div>
                        <div className="job-title opacity-1">Creative</div>
                        <div className="job-title opacity-0">Freelance</div>
                        <div className="job-title opacity-0">Front-end</div>
                        <div className="job-title opacity-0">Creative</div>
                        <div className="job-title opacity-0">Freelance</div>
                    </div>
                </div>
                <div>developer</div>
            </div>
        </div>
    );
}
