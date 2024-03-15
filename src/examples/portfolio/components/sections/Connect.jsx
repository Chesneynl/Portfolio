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

    return (
        <div
            className="container text-white flex h-screen gap-10 bg-red w-full justify-center items-center text-8xl"
            ref={containerRef}
        >
            <h3 ref={textRef} className="uppercase">
                Let's
                <br />
                Connect
            </h3>
            <div>
                <form className="w-full max-w-lg">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-first-name"
                            >
                                First Name
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="grid-first-name"
                                type="text"
                                placeholder="Jane"
                            />
                            <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="grid-last-name"
                            >
                                Last Name
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-last-name"
                                type="text"
                                placeholder="Doe"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
