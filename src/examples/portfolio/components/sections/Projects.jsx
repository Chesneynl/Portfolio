import gsap from 'gsap';
import SplitType from 'split-type';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import React, { useEffect, useRef } from 'react';

import VogelsLogo from '../../../../logos/VogelsLogo';
import MobielLogo from '../../../../logos/MobielLogo';
import PrazLogo from '../../../../logos/PrazLogo';

gsap.registerPlugin(ScrollTrigger);

let mm = gsap.matchMedia();

export default function Projects() {
    const containerRef = useRef(null);
    const wrapperRef = useRef(null);
    const leftDivRef = useRef(null);
    const rightDivRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const leftDiv = leftDivRef.current;

        let ctx = gsap.context(() => {
            mm.add('(min-width: 768px)', () => {
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
            });

            const listItems = document.querySelectorAll('.project-item');
            // Projects animation
            gsap.to(listItems, {
                stagger: 0.1,
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

    const eCommerceWebsites = [
        {
            primaryColor: '#594fff',
            name: 'PRAZ',
            image: '/images/praz-image.jpeg',
            logo: <PrazLogo />,
        },
        {
            primaryColor: '#f3dccf',
            name: 'Mr-fillet',
            image: '/images/mrfillet-image.jpeg',
            logo: <VogelsLogo />,
        },
        {
            primaryColor: '#1a2b8f',
            name: 'Mobiel.nl',
            image: '/images/mobiel-image.jpeg',
            logo: <MobielLogo />,
        },
        {
            primaryColor: '#ea5733',
            name: 'Vogels',
            image: '/images/vogels-image.png',
            logo: <VogelsLogo />,
        },
    ];

    return (
        <div className="w-full" ref={wrapperRef}>
            <div
                className="container text-white relative w-full text-8xl flex flex-col lg:flex-row overflow-hidden"
                ref={containerRef}
            >
                <div className="flex items-center w-full pt-10 lg:h-screen lg:pt-0">
                    <h2 ref={leftDivRef} className="w-full uppercase">
                        Work
                    </h2>
                </div>
                <div className="w-full relative pt-10 lg:pt-36 flex gap-36 flex-col projects-list" ref={rightDivRef}>
                    <div className="w-full  lg:absolute top-1/2 trans right-36 h-1/2 lg:-translate-y-1/2">
                        <div className="w-full text-base text-center mb-5">E-COMMERCE</div>
                        <div className="w-full gap-4 grid grid-cols-2">
                            {eCommerceWebsites.map((website, i) => (
                                <div
                                    key={`website-${i}`}
                                    className={`project-item relative  overflow-hidden duration-500 rounded-xl  transition-all filter bg-[${website.primaryColor}] relative h-[300px] lg:h-[250px] uppercase block  w-full text-sm opacity-0 cursor-pointer`}
                                    style={{ backgroundColor: website.primaryColor }}
                                >
                                    <img
                                        src={website.image}
                                        alt="Project"
                                        className="opacity-0 transition-all duration-500"
                                        style={{
                                            objectFit: 'cover',
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    />
                                    <div className="website-logo absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] transition-all">
                                        {website.logo}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* <div className="w-full gap-4 grid grid-cols-2">
                        {Array.from({ length: 2 }, (_, i) => (
                            <div key={i} className="project-item h-[300px] block w-full text-sm opacity-0">
                                <img
                                    src="https://via.placeholder.com/300x300"
                                    alt="Project"
                                    style={{
                                        objectFit: 'cover',
                                        width: '100%',
                                        height: '100%',
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="w-full gap-4 grid grid-cols-2">
                        {Array.from({ length: 2 }, (_, i) => (
                            <div key={i} className="project-item h-[300px] block  w-full text-sm opacity-0">
                                <img
                                    src="https://via.placeholder.com/300x300"
                                    alt="Project"
                                    style={{
                                        objectFit: 'cover',
                                        width: '100%',
                                        height: '100%',
                                    }}
                                />
                            </div>
                        ))}
                    </div> */}
                </div>
            </div>
        </div>
    );
}
