import SplitType from 'split-type';
import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

let mm = gsap.matchMedia();

export default function Welcome() {
    const nameRef = useRef();
    const functionGroupRef = useRef();
    const lineRef = useRef();
    const functionsRef = useRef();

    // useEffect(() => {
    //     if (!nameRef.current) return;

    //     let ctx = gsap.context(() => {
    //         const tl = gsap.timeline();

    //         const splitText = new SplitType(nameRef.current, {
    //             types: 'words',
    //         });

    //         tl.from(splitText.words, {
    //             yPercent: 100,
    //             opacity: 0,
    //             color: '#290345',
    //             delay: 0.5,
    //             clipPath: 'inset(0 0 100% 0)', // Starting clip-path
    //             // stagger: 0.1,
    //         });

    //         tl.to(lineRef.current, {
    //             width: '10%',
    //             duration: 0.3,
    //             delay: 0.05,
    //         });

    //         tl.from(functionGroupRef.current, {
    //             duration: 1,
    //             opacity: 0,
    //         });
    //     });

    //     const words = functionsRef.current.querySelectorAll('.job-title');

    //     const slotTl = gsap.timeline({ repeat: -1 });

    //     const height = 32;

    //     slotTl
    //         .to(functionsRef.current, {
    //             duration: 1,
    //             delay: 1,
    //             y: `-=${height}`,
    //             ease: 'none',
    //         })
    //         .to(
    //             words[1],
    //             {
    //                 opacity: 0,
    //                 duration: 0.5,
    //                 ease: 'none',
    //             },
    //             '-=0.5',
    //         )
    //         .to(
    //             words[2],
    //             {
    //                 opacity: 1,
    //                 duration: 0.5,
    //                 ease: 'none',
    //             },
    //             '-=0.5',
    //         )
    //         .to(functionsRef.current, {
    //             duration: 0.5,
    //             y: `-=${height}`,
    //             ease: 'none',
    //             delay: 1.5,
    //         })
    //         .to(
    //             words[2],
    //             {
    //                 opacity: 0,
    //                 duration: 0.5,
    //                 ease: 'none',
    //             },
    //             '-=0.5',
    //         )
    //         .to(
    //             words[3],
    //             {
    //                 opacity: 1,
    //                 duration: 0.5,
    //                 ease: 'none',
    //             },
    //             '-=0.5',
    //         )
    //         .to(functionsRef.current, {
    //             duration: 0.5,
    //             y: `-=${height}`,
    //             ease: 'none',
    //             delay: 1,
    //         })
    //         .to(
    //             words[3],
    //             {
    //                 opacity: 0,
    //                 duration: 0.5,
    //                 ease: 'none',
    //             },
    //             '-=0.5',
    //         )
    //         .to(
    //             words[4],
    //             {
    //                 opacity: 1,
    //                 duration: 0.5,
    //                 ease: 'none',
    //             },
    //             '-=0.5',
    //         )
    //         .to(functionsRef.current, {
    //             duration: 0,
    //             y: `-=${height}`,
    //             ease: 'none',
    //             delay: 1,
    //         });

    //     return () => ctx.revert();
    // }, [nameRef?.current]);

    return (
        <div className="text-white flex flex-col h-screen w-full justify-center gap-0 items-end pr-20">
            <h1 ref={nameRef} className="text-[11vw] leading-none uppercase lg:pt-0 drop-shadow-lg">
                Chesney<span className="text-primary">.</span>
                <span className="text-primary">DEV</span>
            </h1>
            {/* <div ref={lineRef} className="w-0 h-[1px]  bg-white flex-grow-0 flex-shrink-0" /> */}
            <div
                className="text-2xl pb-3 font-micro uppercase lg:pb-0 text-secondary flex items-center justify-center gap-4"
                ref={functionGroupRef}
            >
                <div className="overflow-hidden">
                    <div className="whitespace-nowrap drop-shadow-lg" ref={functionsRef}>
                        <div className="job-title opacity-0">Next.js | React | Node.js | Headless</div>
                    </div>
                </div>
                <div>
                    Next.js <span className="text-white">|</span> React <span className="text-white">|</span> Node.js{' '}
                    <span className="text-white">|</span> Headless
                </div>
            </div>
        </div>
    );
}
