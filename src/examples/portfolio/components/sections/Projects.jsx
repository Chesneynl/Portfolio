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
    const titleRef = useRef(null);
    const rightDivRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const titleDiv = titleRef.current;

        let ctx = gsap.context(() => {
            // mm.add('(min-width: 768px)', () => {
            //     const splitText = new SplitType(titleDiv, {
            //         types: 'words',
            //         wordClass: 'large-highlight-word',
            //     });
            //     gsap.from(splitText.words, {
            //         yPercent: 100,
            //         clipPath: 'inset(0 0 100% 0)', // Starting clip-path
            //         stagger: 0.1,
            //         scrollTrigger: {
            //             trigger: wrapperRef.current,
            //             start: 'top top',
            //             end: `bottom top`,
            //             pin: containerRef.current,
            //             markers: true,
            //             toggleActions: 'play none none reverse',
            //         },
            //     });
            // });

            const cards = document.querySelectorAll('.card');
            const header = document.querySelector('.header');
            let cardHeight;
            const animation = gsap.timeline();
            function initCards() {
                animation.clear();
                cardHeight = cards[0].offsetHeight;
                console.log('initCards()', cardHeight);
                cards.forEach((card, index) => {
                    if (index > 0) {
                        gsap.set(card, { y: index * cardHeight });
                        animation.to(card, { y: 0, duration: index * 0.5, ease: 'none' });
                    }
                });
            }
            initCards();

            console.log(cards.length * cardHeight + header.offsetHeight);
            ScrollTrigger.create({
                trigger: '.wrapper',
                start: 'top top',
                pin: true,
                end: () => `+=${cards.length * cardHeight + header.offsetHeight}`,
                scrub: true,
                animation: animation,
                markers: true,
                invalidateOnRefresh: true,
            });
            ScrollTrigger.addEventListener('refreshInit', initCards);
            // Clean up function
            return () => {
                ScrollTrigger.removeEventListener('refreshInit', initCards);
            };
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
            image: '/images/mobiel-website.png',
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
        <div className="w-full wrapper" ref={wrapperRef}>
            <div className="container text-white relative w-full text-8xl flex flex-col" ref={containerRef}>
                <div className="flex items-center w-full pt-10 lg:pt-0 header h-[30vh]">
                    <h2 ref={titleRef} className="w-full uppercase">
                        Work
                    </h2>
                </div>
                <div className="w-full relative flex flex-col h-[70vh]" ref={rightDivRef}>
                    {/* <div className="w-full text-base text-center mb-5">E-COMMERCE</div> */}
                    {eCommerceWebsites.map((website, i) => (
                        <div
                            key={`website-${i}`}
                            className={`card absolute rounded-xl filter h-[70vh] uppercase block w-full text-sm cursor-pointer`}
                            style={{ backgroundColor: website.primaryColor }}
                        >
                            <img
                                src={website.image}
                                alt="Project"
                                className="transition-all duration-500"
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
        </div>
    );
}
