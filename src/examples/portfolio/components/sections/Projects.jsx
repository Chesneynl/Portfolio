import gsap from 'gsap';
import SplitType from 'split-type';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import React, { useEffect, useRef } from 'react';

import VogelsLogo from '../../../../logos/VogelsLogo';
import MobielLogo from '../../../../logos/MobielLogo';
import PrazLogo from '../../../../logos/PrazLogo';
import MrFilletLogo from '../../../../logos/MrFilletLogo';
import SolarNRGLogo from '../../../../logos/SolarNRGLogo';
import HillhoutLogo from '../../../../logos/HillhoutLogo';
import LeadHealthcareLogo from '../../../../logos/LeadHealthcareLogo';
import SyncVrLogo from '../../../../logos/SyncVrLogo';
import AinablersLogo from '../../../../logos/AinablersLogo';

gsap.registerPlugin(ScrollTrigger);

let mm = gsap.matchMedia();

export default function Projects() {
    const containerRef = useRef(null);
    const wrapperRef = useRef(null);
    const titleRef = useRef(null);
    const casesRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const titleDiv = titleRef.current;

        let ctx = gsap.context(() => {
            const splitText = new SplitType(titleDiv, {
                types: 'chars',
                wordClass: 'large-highlight-word',
            });
            gsap.from(splitText.chars, {
                yPercent: 100,
                clipPath: 'inset(0 0 100% 0)', // Starting clip-path
                stagger: 0.1,
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: 'top center',
                    end: `top top`,
                    scrub: 1,
                    markers: true,
                    toggleActions: 'play none none reverse',
                },
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: containerRef.current,
                    start: 'top top',
                    end: `bottom top`,
                    scrub: 1,
                    markers: true,
                    toggleActions: 'play none none reverse',
                },
            });

            tl.to(
                '.list-one',
                {
                    y: '-180vh',
                },
                0,
            );

            tl.from(
                '.list-two',
                {
                    y: '-180vh',
                },
                0.01,
            );

            tl.to(
                '.list-three',
                {
                    y: '-180vh',
                },
                0.02,
            );
        });

        return () => ctx.revert();
    }, []);

    const firstList = [
        {
            primaryColor: '#594fff',
            name: 'PRAZ',
            websiteType: 'E-COMMERCE',
            image: '/images/praz-image.jpeg',
            logo: <PrazLogo />,
        },
        {
            primaryColor: '#c61717',
            name: 'Mr-fillet',
            websiteType: 'E-COMMERCE',
            image: '/images/mrfillet-image.jpeg',
            logo: <MrFilletLogo />,
        },
        // {
        //     primaryColor: '#09361b',
        //     name: 'Hillhout',
        //     websiteType: 'Configurator',
        //     image: '/images/vogels-image.png',
        //     logo: <HillhoutLogo />,
        // },
        {
            primaryColor: '#09361b',
            name: 'Methinks',
            websiteType: 'Website',
            image: '/images/vogels-image.png',
            logo: <HillhoutLogo />,
        },
    ];

    const secondList = [
        {
            primaryColor: '#ea5733',
            name: 'Vogels',
            websiteType: 'E-COMMERCE',
            image: '/images/vogels-image.png',
            logo: <VogelsLogo />,
        },
        {
            primaryColor: '#ffb914',
            name: 'SolarNRG',
            websiteType: 'CONFIGURATOR',
            image: '/images/solarnrg-image.jpeg',
            logo: <SolarNRGLogo fill="#161414" />,
        },
        // {
        //     primaryColor: '#09361b',
        //     name: 'Hillhout',
        //     websiteType: 'Website',
        //     image: '/images/vogels-image.png',
        //     logo: <HillhoutLogo />,
        // },
        {
            primaryColor: '#fffced',
            name: 'Ainablers',
            websiteType: 'Website',
            image: '/images/vogels-image.png',
            logo: <AinablersLogo />,
        },
    ];

    const thirdList = [
        {
            primaryColor: '#e57300',
            name: 'Lead Healthcare',
            websiteType: 'Website',
            image: '/images/leadhealthcare-image.png',
            logo: <LeadHealthcareLogo />,
        },
        {
            primaryColor: '#1a2b8f',
            name: 'Mobiel.nl',
            websiteType: 'E-COMMERCE',
            image: '/images/mobiel-website.png',
            logo: <MobielLogo />,
        },
        {
            primaryColor: '#346FF6',
            name: 'SyncVR',
            websiteType: '2x VR Applications',
            image: '/images/mobiel-website.png',
            logo: <SyncVrLogo />,
        },
    ];

    const websiteLabelClassnames =
        'absolute left-1/2 bottom-8 -translate-x-1/2 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-black text-white rounded-full';
    const cardClassnames =
        'case-card relative rounded-xl filter h-[90vh] uppercase block w-full text-sm cursor-pointer overflow-hidden';

    return (
        <div ref={wrapperRef}>
            <div className="flex items-center w-full pt-10 lg:pt-0 header h-screen">
                <h2 ref={titleRef} className="w-full uppercase text-white text-[29vw] text-center">
                    Cases<span className="text-secondary">.</span>
                </h2>
            </div>
            <div
                className="wrapper overflow-hidden px-4 text-white relative w-full  flex flex-col h-screen"
                ref={containerRef}
            >
                <div className="w-full relative grid grid-cols-3 gap-10" ref={casesRef}>
                    <div className="gap-10 flex flex-col list-one">
                        {firstList.map((website, i) => (
                            <div
                                key={`website-${i}`}
                                className={cardClassnames}
                                style={{ backgroundColor: website.primaryColor }}
                            >
                                <div className={websiteLabelClassnames}>{website.websiteType}</div>
                                <img
                                    src={website.image}
                                    alt="Project"
                                    className="transition-all duration-500 opacity-0"
                                    style={{
                                        objectFit: 'cover',
                                        width: '100%',
                                        height: '100%',
                                    }}
                                />
                                <div className="website-logo absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] transition-all">
                                    {website.logo}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="gap-10 flex flex-col list-two">
                        {secondList.map((website, i) => (
                            <div
                                key={`website-${i}`}
                                className={cardClassnames}
                                style={{ backgroundColor: website.primaryColor }}
                            >
                                <div className={websiteLabelClassnames}>{website.websiteType}</div>
                                <img
                                    src={website.image}
                                    alt="Project"
                                    className="transition-all duration-500 opacity-0"
                                    style={{
                                        objectFit: 'cover',
                                        width: '100%',
                                        height: '100%',
                                    }}
                                />
                                <div className="website-logo absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] transition-all">
                                    {website.logo}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="gap-10 flex flex-col list-three">
                        {thirdList.map((website, i) => (
                            <div
                                key={`website-${i}`}
                                className={cardClassnames}
                                style={{ backgroundColor: website.primaryColor }}
                            >
                                <div className={websiteLabelClassnames}>{website.websiteType}</div>
                                <img
                                    src={website.image}
                                    alt="Project"
                                    className="transition-all duration-500 opacity-0"
                                    style={{
                                        objectFit: 'cover',
                                        width: '100%',
                                        height: '100%',
                                    }}
                                />
                                <div className="website-logo absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] transition-all">
                                    {website.logo}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
