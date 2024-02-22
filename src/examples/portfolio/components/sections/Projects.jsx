import gsap from 'gsap';
import SplitType from 'split-type';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import React, { useEffect, useRef } from 'react';
gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
    const containerRef = useRef(null);
    const wrapperRef = useRef(null);
    const leftDivRef = useRef(null);
    const rightDivRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const leftDiv = leftDivRef.current;

        let ctx = gsap.context(() => {
            // Left div animation
            const splitText = new SplitType(leftDiv, {
                types: 'words',
                wordClass: 'large-highlight-word',
            });

            gsap.from(splitText.words, {
                yPercent: 100,
                clipPath: 'inset(0 0 100% 0)', // Starting clip-path
                stagger: 0.1,
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: 'top top',
                    end: `bottom top`,
                    pin: containerRef.current,
                    markers: true,
                    toggleActions: 'play none none reverse',
                },
            });

            const listItems = document.querySelectorAll('.project-item');
            // Projects animation
            gsap.to(listItems, {
                // yPercent: -100,
                stagger: 0.3,
                opacity: 1,
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: 'top top',
                    end: `bottom top`,

                    markers: true,
                },
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="w-full" ref={wrapperRef}>
            <div className="container text-white relative w-full text-8xl overflow-hidden flex" ref={containerRef}>
                <div className="flex items-center w-full h-screen">
                    <h2 ref={leftDivRef} className="w-full">
                        Projects
                    </h2>
                </div>
                <div className="w-full gap-4 grid grid-cols-3 pt-36" ref={rightDivRef}>
                    {Array.from({ length: 20 }, (_, i) => (
                        <div key={i} className="project-item h-[300px] block bg-green-300 w-full text-sm opacity-0">
                            Project {i}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
