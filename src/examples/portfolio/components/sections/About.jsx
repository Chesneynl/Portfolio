import SplitType from 'split-type';
import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

export default function About() {
    const textRef = useRef();
    const containerRef = useRef();

    useEffect(() => {
        if (!textRef.current) return;

        let ctx = gsap.context(() => {
            const tl = gsap.timeline();

            const splitText = new SplitType(textRef.current, {
                types: 'words',
            });

            tl.from(splitText.words, {
                opacity: 0,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'center bottom',
                    scrub: 1,
                    end: `bottom bottom`,
                    markers: true,
                },
            });
        });

        return () => ctx.revert();
    }, [containerRef?.current]);

    return (
        <div
            className="container text-white flex flex-col-reverse lg:flex-row-reverse h-screen w-full justify-center gap-4 lg:gap-8 lg:items-center"
            ref={containerRef}
        >
            <div ref={textRef} className="text-7xl lg:text-4xl pt-1  lg:text-center lg:pt-0 lg:max-w-[60vw]">
                I'm a Dutch front-end developer with over 5 years of expertise. I've refined my skills on a variety of
                projects, including <span className="text-secondary">e-commerce</span> websites, standard{' '}
                <span className="text-secondary">websites</span>, and{' '}
                <span className="text-secondary">configurators</span>.
            </div>
        </div>
    );
}
