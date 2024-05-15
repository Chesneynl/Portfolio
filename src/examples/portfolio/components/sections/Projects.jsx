import gsap from 'gsap';
import SplitType from 'split-type';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import React, { useEffect, useRef, useState } from 'react';

import PROJECTS_LIST from '../../constants/constants';

import { twMerge } from 'tailwind-merge';

gsap.registerPlugin(ScrollTrigger);

// let mm = gsap.matchMedia();

export default function Projects() {
    const containerRef = useRef(null);
    const wrapperRef = useRef(null);
    const titleRef = useRef(null);
    const projectNameRef = useRef(null);
    const websiteRef = useRef(null);
    const projectImageRef = useRef(null);
    const projectDescriptionRef = useRef(null);
    const projectDescriptionWrapperRef = useRef(null);
    const [activeProject, setActiveProject] = useState(null);

    const toolsClassnames =
        'text-xs tool-item inline-flex items-center font-bold leading-sm uppercase px-3 py-1 text-black rounded-full bg-white';
    const websiteLabelClassnames =
        'absolute left-1/2 bottom-8 -translate-x-1/2 hidden md:block md:text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-black text-white rounded-full';
    const cardClassnames =
        'case-card shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] relative rounded-xl filter h-[99vh] uppercase block w-full text-sm cursor-pointer overflow-hidden';

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
                    start: 'top bottom',
                    end: `top top`,
                    scrub: 1,
                    // markers: true,
                    toggleActions: 'play none none reverse',
                },
            });

            gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: containerRef.current,
                    start: 'top top',
                    // end: `bottom top`,
                    scrub: 1,
                    // markers: true,
                    toggleActions: 'play none none reverse',
                },
            });

            const tl3 = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top+=800',
                    end: `bottom top`,
                    // markers: true,
                    toggleActions: 'play none none reverse',
                },
            });

            tl3.from(
                '.list-one .case-card',
                {
                    opacity: 0,
                    stagger: 0.2,
                    scale: 0.8,
                },
                0,
            );

            tl3.from(
                '.list-two .case-card',
                {
                    opacity: 0,
                    stagger: 0.2,
                    scale: 0.8,
                },
                0.2,
            );

            tl3.from(
                '.list-three .case-card',
                {
                    opacity: 0,
                    stagger: 0.2,
                    scale: 0.8,
                },
                0.8,
            );

            const tl2 = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top+=100',
                    end: `bottom top`,
                    scrub: 1,
                    // markers: true,
                    toggleActions: 'play none none reverse',
                },
            });

            tl2.to(
                '.list-one',
                {
                    y: '-203vh',
                },
                0,
            );

            tl2.from(
                '.list-two',
                {
                    y: '-203vh',
                },
                0.01,
            );

            tl2.to(
                '.list-three',
                {
                    y: '-203vh',
                },
                0.02,
            );
        });

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (!projectNameRef.current) return;

        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                paused: !!activeProject,
            });

            tl.from(projectDescriptionWrapperRef.current, {
                // yPercent: 100,
                opacity: 0,
                stagger: 0.1,
                duration: 0.3,
            });

            tl.from(projectNameRef.current, {
                yPercent: 100,
                opacity: 0,
                clipPath: 'inset(0 0 100% 0)', // Starting clip-path
                stagger: 0.1,
                duration: 0.4,
            });

            tl.from(websiteRef.current, {
                yPercent: 100,
                opacity: 0,
                clipPath: 'inset(0 0 100% 0)', // Starting clip-path
                duration: 0.2,
            });

            const splitText = new SplitType(projectDescriptionRef.current, {
                types: 'words',
                wordClass: '',
            });

            tl.from(splitText.words, {
                // yPercent: 100,
                opacity: 0,
                // clipPath: 'inset(0 0 100% 0)', // Starting clip-path
                stagger: 0.001,
                duration: 0.4,
            });

            tl.from('.tool-item', {
                yPercent: -100,
                opacity: 0,
                stagger: 0.1,
                duration: 0.4,
            });

            if (activeProject) {
                tl.play();
            }
        });

        return () => ctx.revert();
    }, [activeProject?.name]); // Run effect only once on component mount

    function onProjectClick(project) {
        setActiveProject(project);
        document.body.style.overflow = 'hidden';
    }

    return (
        <>
            <div
                className={twMerge(
                    'w-screen fixed flex flex-col md:flex-row h-screen top-0 left-0 z-50 transition-all bg-black duration-700',
                    activeProject ? 'pointer-events-all opacity-1' : 'pointer-events-none opacity-0',
                )}
            >
                <div
                    className="w-full h-full flex-shrink-0 md:flex-shrink bg-cover bg-center bg-no-repeat relative opacity-90"
                    ref={projectImageRef}
                    style={{ backgroundImage: `url('${activeProject?.image}')` }}
                ></div>
                <div
                    className="absolute top-0 left-0 md:relative bg-black/90 w-full h-full px-10 py-10 md:w-1/3 flex-shrink-0 text-white overflow-y-scroll shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]"
                    ref={projectDescriptionWrapperRef}
                >
                    <div
                        className="absolute right-4 top-4 cursor-pointer hover:rotate-90 transition-all"
                        onClick={() => {
                            setActiveProject(null);
                            document.body.style.overflow = 'visible';
                        }}
                    >
                        <svg
                            className="h-10 w-10"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                    <div className="flex gap-4 mb-6 projects items-center">
                        <h3 ref={projectNameRef} className="text-7xl text-white">
                            {activeProject?.name}
                        </h3>
                    </div>
                    <a
                        ref={websiteRef}
                        href={activeProject?.url}
                        className="mb-5 text-sm no-underline border-b pb-1 inline-block"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Visit website
                    </a>

                    <div>
                        {activeProject && (
                            <div
                                className="text-xl"
                                ref={projectDescriptionRef}
                                dangerouslySetInnerHTML={{ __html: activeProject?.description }}
                            />
                        )}
                        <div className="flex flex-wrap gap-2 mt-4">
                            {activeProject?.tools.map((tool, i) => (
                                <div key={`tool-${i}`} className={toolsClassnames}>
                                    {tool}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div ref={wrapperRef}>
                <div className="flex items-center w-full pt-10 lg:pt-0 header pb-10">
                    <h2
                        ref={titleRef}
                        className="w-full uppercase text-off-white text-[45vw] md:text-[26vw] text-center leading-normal"
                    >
                        Cases<span className="text-secondary">.</span>
                    </h2>
                </div>
                <div
                    className="wrapper overflow-hidden px-4 text-white relative w-full  flex flex-col h-screen"
                    ref={containerRef}
                >
                    <div className="w-full relative grid grid-cols-3 gap-[1vw]">
                        <div className="gap-[1vw] flex flex-col list-one">
                            {PROJECTS_LIST.slice(0, 3).map((project, i) => (
                                <div
                                    key={`website-${i}`}
                                    className={cardClassnames}
                                    style={{ backgroundColor: project.primaryColor }}
                                    onClick={() => onProjectClick(project)}
                                >
                                    <div className={websiteLabelClassnames}>{project.websiteType}</div>
                                    <img
                                        src={project.image}
                                        alt="Project"
                                        className="transition-all duration-500 opacity-0"
                                        style={{
                                            objectFit: 'cover',
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    />
                                    <div className="website-logo absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] transition-all">
                                        {project.logo}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="gap-[1vw] flex flex-col list-two">
                            {PROJECTS_LIST.slice(3, 6).map((project, i) => (
                                <div
                                    key={`website-${i}`}
                                    className={cardClassnames}
                                    style={{ backgroundColor: project.primaryColor }}
                                    onClick={() => onProjectClick(project)}
                                >
                                    <div className={websiteLabelClassnames}>{project.websiteType}</div>
                                    <img
                                        src={project.image}
                                        alt="Project"
                                        className="transition-all duration-500 opacity-0"
                                        style={{
                                            objectFit: 'cover',
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    />
                                    <div className="website-logo absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] transition-all">
                                        {project.logo}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="gap-[1vw] flex flex-col list-three">
                            {PROJECTS_LIST.slice(6, 9).map((project, i) => (
                                <div
                                    key={`website-${i}`}
                                    className={cardClassnames}
                                    style={{ backgroundColor: project.primaryColor }}
                                    onClick={() => onProjectClick(project)}
                                >
                                    <div className={websiteLabelClassnames}>{project.websiteType}</div>
                                    <img
                                        src={project.image}
                                        alt="Project"
                                        className="transition-all duration-500 opacity-0"
                                        style={{
                                            objectFit: 'cover',
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    />
                                    <div className="website-logo absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] transition-all">
                                        {project.logo}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
