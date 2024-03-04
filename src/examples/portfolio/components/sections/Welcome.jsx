import SplitType from 'split-type';
import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

let mm = gsap.matchMedia();

export default function Welcome() {
    const nameRef = useRef();
    const functionRef = useRef();
    const lineRef = useRef();
    const functionsRef = useRef();

    useEffect(() => {
        if (!nameRef.current) return;

        let ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // const splitText = new SplitType(nameRef.current, {
            //     types: 'words',
            // });

            // tl.from(splitText.words, {
            //     yPercent: 100,
            //     opacity: 0,
            //     delay: 0.3,
            //     clipPath: 'inset(0 0 100% 0)', // Starting clip-path
            //     stagger: 0.1,
            // });

            tl.to(functionRef.current, {
                opacity: 1,
                duration: 0.3,
                delay: 0.1,
            });

            mm.add('(min-width: 768px)', () => {
                tl.to(lineRef.current, {
                    height: '300px',
                    duration: 0.3,
                    delay: 0.05,
                });
            });
            mm.add('(max-width: 767px)', () => {
                tl.to(lineRef.current, {
                    width: '100%',
                    duration: 0.3,
                    delay: 0.05,
                });
            });
        });

        const words = functionsRef.current.querySelectorAll('.job-title');

        const slotTl = gsap.timeline({ repeat: -1 });

        slotTl
            .to(functionsRef.current, {
                duration: 0.5,
                delay: 1,
                y: '-=40', // Move all words up
                ease: 'none',
            })
            .to(
                words[1],
                {
                    opacity: 0.1,
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
                y: '-=40', // Move all words up
                ease: 'none',
                delay: 1.5,
            })
            .to(
                words[2],
                {
                    opacity: 0.1,
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
                y: '-=40', // Move all words up
                ease: 'none',
                delay: 1,
            })
            .to(
                words[3],
                {
                    opacity: 0.1,
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
                y: '0', // Move all words up
                ease: 'none',
                delay: 1,
            });

        return () => ctx.revert();
    }, [nameRef?.current]);

    return (
        <div className="container text-white flex flex-col-reverse lg:flex-row-reverse h-screen w-full justify-center gap-4 lg:gap-8 lg:items-center">
            <h1
                ref={nameRef}
                className="text-3xl lg:text-4xl pb-3 font-micro uppercase lg:pb-0 text-[#8d49f7] flex items-center justify-center gap-4"
            >
                <div className="h-[120px] overflow-hidden">
                    <div className="whitespace-nowrap" ref={functionsRef}>
                        <div className="job-title opacity-10">Front-end</div>
                        <div className="job-title opacity-1">Creative</div>
                        <div className="job-title opacity-10">Freelance</div>
                        <div className="job-title opacity-10">Front-end</div>
                        <div className="job-title opacity-10">Creative</div>
                        <div className="job-title opacity-10">Freelance</div>
                    </div>
                </div>
                <div>developer</div>
            </h1>
            <div ref={lineRef} className="w-0 h-1 rounded-full bg-white lg:h-0 flex-grow-0 lg:w-1 flex-shrink-0" />
            <h2 ref={functionRef} className="text-7xl lg:text-6xl opacity-0 pt-1 uppercase lg:text-right lg:pt-0">
                Chesney
                <br />
                Buitendijk
            </h2>
        </div>
    );
}
