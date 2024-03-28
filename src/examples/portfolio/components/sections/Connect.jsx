import SplitType from 'split-type';
import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

import { Resend } from 'resend';

const resend = new Resend('re_KTr3ooUh_FWT9nDBRHVPFmRgx65KCfuC6');

const EmailTemplate = ({ firstName }) => (
    <div>
        <h1>Welcome, {firstName}!</h1>
    </div>
);

export default function Connect() {
    const containerRef = useRef();
    const textRef = useRef();
    const titleRef = useRef();

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
        });

        return () => ctx.revert();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        const { data, error } = await resend.emails.send({
            from: 'Website',
            to: ['chesneybuitendijk@gmail.com'],
            subject: 'Hello world',
            react: EmailTemplate({ firstName: 'John' }),
        });

        if (error) {
            console.log({ error });
        }
    }

    const inputClassNames =
        'appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none';
    const inputWrapperClassNames = 'border-b border-secondary py-2 gap-10 w-full';

    const groupClassNames = 'flex flex-row gap-10';

    return (
        <>
            <h3 ref={titleRef} className="uppercase text-[19vw] text-center text-white pb-10">
                Let's Talk<span className="text-secondary">.</span>
            </h3>
            <div
                className="container text-white flex flex-col gap-10 bg-red w-full justify-center items-center text-8xl pb-[40vh] lg:max-w-[60vw]"
                ref={containerRef}
            >
                <form className="w-full">
                    <div className="flex flex-col gap-10">
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="text"
                                    name="floating_first_name"
                                    id="floating_first_name"
                                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0 focus:border-secondary peer"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="floating_first_name"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    First name
                                </label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="text"
                                    name="floating_last_name"
                                    id="floating_last_name"
                                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0 focus:border-secondary peer"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="floating_last_name"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Last name
                                </label>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="text"
                                    name="floating_first_name"
                                    id="floating_first_name"
                                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0 focus:border-secondary peer"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="floating_first_name"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Email address
                                </label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="text"
                                    name="floating_last_name"
                                    id="floating_last_name"
                                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0 focus:border-secondary peer"
                                    placeholder=" "
                                    required
                                />
                                <label
                                    htmlFor="floating_last_name"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Company name
                                </label>
                            </div>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <textarea
                                type="email"
                                name="floating_email"
                                id="floating_email"
                                className="block py-2.5 px-0 h-[200px] w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0 focus:border-secondary peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="floating_email"
                                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Your message for me...
                            </label>
                        </div>
                    </div>
                    <button
                        onClick={handleSubmit}
                        type="button"
                        className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        Purple
                    </button>
                    <button
                        onClick={handleSubmit}
                        type="button"
                        className="text-white transition-all bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                        Purple to Pink
                    </button>
                </form>
            </div>
        </>
    );
}
