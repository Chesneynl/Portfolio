import { Center, Text, Html, useScroll, Scroll } from '@react-three/drei';
import SplitType from 'split-type';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import React, { useEffect, useLayoutEffect, useRef } from 'react';

export default function Connect() {
    const containerRef = useRef();
    const textRef = useRef();

    // useLayoutEffect(() => {
    //     if (!containerRef.current) return;

    //     const tl = gsap.timeline({
    //         scrollTrigger: {
    //             trigger: containerRef?.current,
    //             start: 'top 20%',
    //             markers: true,
    //         },
    //     });

    //     const splitText = new SplitType(textRef.current, {
    //         types: 'words',
    //     });

    //     tl.from(splitText.words, {
    //         yPercent: 100,
    //         color: 'red',
    //         opacity: 0,
    //         clipPath: 'inset(0 0 100% 0)', // Starting clip-path
    //         stagger: 0.1,
    //     });
    // }, []);

    const inputClassNames =
        'appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none';
    const inputWrapperClassNames = 'border-b border-secondary py-2 gap-10 w-full';

    const groupClassNames = 'flex flex-row gap-10';

    return (
        <div
            className="container text-white flex flex-col h-screen gap-10 bg-red w-full justify-center items-center text-8xl"
            ref={containerRef}
        >
            <h3 ref={textRef} className="uppercase">
                Let's Connect
            </h3>
            <div>
                <form className="w-full flex flex-col gap-10">
                    <div className={groupClassNames}>
                        <div className={inputWrapperClassNames}>
                            <input
                                className={inputClassNames}
                                autoComplete="given-name"
                                type="text"
                                placeholder="Jane"
                                aria-label="First name"
                            />
                        </div>
                        <div className={inputWrapperClassNames}>
                            <input
                                className={inputClassNames}
                                autoComplete="family-name"
                                type="text"
                                placeholder="Doe"
                                aria-label="Last name"
                            />
                        </div>
                    </div>
                    <div className={groupClassNames}>
                        <div className={inputWrapperClassNames}>
                            <input
                                className={inputClassNames}
                                autoComplete="email"
                                type="text"
                                placeholder="jane-doe@gmail.com"
                                aria-label="email"
                            />
                        </div>
                    </div>
                    <div className={groupClassNames}>
                        <div className={inputWrapperClassNames}>
                            <textarea className={inputClassNames} placeholder="Leave a message" aria-label="email" />
                        </div>
                    </div>
                    <button
                        className="flex-shrink-0 border-transparent border-4 hover:text-primary text-sm py-5 px-2 rounded bg-secondary max-w-md"
                        type="button"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
