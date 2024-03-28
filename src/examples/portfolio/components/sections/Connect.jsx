import SplitType from 'split-type';
import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';

import { Resend } from 'resend';

const resend = new Resend('re_KTr3ooUh_FWT9nDBRHVPFmRgx65KCfuC6');

const EmailTemplate = ({ firstName, lastName, email, company, message }) => (
    <div>
        <div>{firstName}</div>
        <div>{lastName}</div>
        <div>{email}</div>
        <div>{company}</div>
        <div>{message}</div>
    </div>
);

export default function Connect() {
    const containerRef = useRef();
    const titleRef = useRef();
    const [formdata, setFormdata] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        message: '',
    });

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
            subject: `Bericht van ${formdata.firstName} ${formdata.lastName} via de website`,
            react: EmailTemplate(formdata),
        });

        console.log({ data });

        if (error) {
            console.log({ error });
        }
    }

    const inputClassNames =
        'block py-2.5 px-0 h-20 text-5xl w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0 focus:border-secondary peer';
    const textAreaClassNames =
        'block py-2.5 mt-1.5 px-0 h-[200px] w-full text-5xl text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary focus:outline-none focus:ring-0 focus:border-secondary peer';
    const labelClassnames =
        'peer-focus:font-medium whitespace-nowrap absolute text-3xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-50 top-0 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-secondary peer-focus:dark:text-secondary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50 peer-focus:-translate-y-6';

    return (
        <>
            <h3 ref={titleRef} className="uppercase text-[19vw] text-center text-white pb-10">
                Let's Talk<span className="text-secondary">.</span>
            </h3>
            <div
                className="container text-white flex flex-col lg:gap-10 bg-red w-full justify-center items-center text-8xl pb-[40vh] lg:max-w-[60vw]"
                ref={containerRef}
            >
                <form className="w-full">
                    <div className="flex flex-col gap-5 lg:gap-10">
                        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="text"
                                    name="floating_first_name"
                                    id="floating_first_name"
                                    className={inputClassNames}
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="floating_first_name" className={labelClassnames}>
                                    First name
                                </label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="text"
                                    name="floating_last_name"
                                    id="floating_last_name"
                                    className={inputClassNames}
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="floating_last_name" className={labelClassnames}>
                                    Last name
                                </label>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="text"
                                    name="floating_first_name"
                                    id="floating_first_name"
                                    className={inputClassNames}
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="floating_first_name" className={labelClassnames}>
                                    Email
                                </label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="text"
                                    name="floating_last_name"
                                    id="floating_last_name"
                                    className={inputClassNames}
                                    placeholder=" "
                                    required
                                />
                                <label htmlFor="floating_last_name" className={labelClassnames}>
                                    Company
                                </label>
                            </div>
                        </div>

                        <div className="relative z-0 w-full group">
                            <textarea
                                type="email"
                                name="floating_email"
                                id="floating_email"
                                className={textAreaClassNames}
                                placeholder=" "
                                required
                            />
                            <label htmlFor="floating_email" className={labelClassnames}>
                                Your message...
                            </label>
                        </div>
                    </div>
                    <div className="w-full flex justify-end pt-10">
                        <button
                            onClick={handleSubmit}
                            type="button"
                            className="text-white transition-all bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2 w-full"
                        >
                            Get in Touch
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
