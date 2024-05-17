import SplitType from 'split-type';
import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';

export default function Connect() {
    const containerRef = useRef();
    const titleRef = useRef();
    const lineRef = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [failedToSubmit, setFailedToSubmit] = useState(false);
    const [errors, setErrors] = useState([]);
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

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.connect-wrapper',
                    start: 'top center',
                    end: `bottom bottom`,
                    scrub: 1,
                    // markers: true,
                    toggleActions: 'play none none reverse',
                },
            });

            tl.from(splitText.chars, {
                yPercent: 100,
                clipPath: 'inset(0 0 100% 0)', // Starting clip-path
                stagger: 0.1,
            });

            tl.from('.form-container', {
                opacity: 0,
            });

            tl.from('.input-wrapper', {
                opacity: 0,
                y: 20,
                stagger: 0.1,
            });

            tl.from('button', {
                opacity: 0,
                y: 20,
                stagger: 0.1,
            });

            tl.to(lineRef.current, {
                width: '60vw',
                duration: 0.3,
                delay: 0.05,
            });

            tl.from('.social-button', {
                opacity: 0,
                y: 20,
                stagger: 0.1,
            });
        });

        return () => ctx.revert();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();

        if (isSubmitting) return;

        let newErrors = [];

        setFailedToSubmit(false);

        if (!formdata.firstName) {
            newErrors.push('firstName');
        }

        if (!formdata.lastName) {
            newErrors.push('lastName');
        }

        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formdata.email);
        if (!formdata.email || !isValidEmail) {
            newErrors.push('email');
        }

        if (!formdata.message) {
            newErrors.push('message');
        }

        setErrors(newErrors);

        setIsSubmitting(true);

        try {
            const data = await fetch('http://localhost:5000/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formdata),
            });

            setIsSubmitting(false);

            if (data) {
                setIsSubmitted(true);
            } else {
                setFailedToSubmit(true);
            }
        } catch (error) {
            setIsSubmitting(false);
            setFailedToSubmit(true);
        }
    }

    function handleChange(event) {
        setErrors([]);
        setFailedToSubmit(false);
        setFormdata((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    }

    return (
        <div className="connect-wrapper">
            <h3
                ref={titleRef}
                className="uppercase text-[34vw] md:text-[19vw] text-center text-off-white drop-shadow-lg pt-40 md:pt-0"
            >
                Let's Talk<span className="text-secondary">.</span>
            </h3>
            {isSubmitted ? (
                <div className="text-off-white text-center">
                    <h3 className="text-8xl pt-10 pb-5 uppercase tracking-wide">Thank you for reaching out!</h3>
                    <p className="text-xl">I will get back to you as soon as possible.</p>
                </div>
            ) : (
                <div
                    className="container form-container text-off-white  py-10 md:py-16 md:px-8 rounded-xl flex-col lg:gap-10 bg-red w-full justify-center items-center mb-10 lg:max-w-[800px]"
                    ref={containerRef}
                >
                    <form className="w-full ">
                        <div className="flex flex-wrap mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0 input-wrapper">
                                <label
                                    className="block uppercase tracking-wide text-off-white text-xs font-bold mb-2"
                                    htmlFor="grid-first-name"
                                >
                                    First Name
                                </label>
                                <input
                                    className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                                        errors.includes('firstName') ? 'border-red-500' : 'border-gray-200'
                                    } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-off-white transition-all`}
                                    id="grid-first-name"
                                    onChange={handleChange}
                                    name="firstName"
                                    type="text"
                                    placeholder="Jane"
                                />
                                {errors.includes('firstName') && (
                                    <p className="text-red-500 text-xs italic mb-0">Please fill out this field.</p>
                                )}
                            </div>
                            <div className="w-full md:w-1/2 px-3 input-wrapper">
                                <label
                                    className="block uppercase tracking-wide text-off-white text-xs font-bold mb-2"
                                    htmlFor="grid-last-name"
                                >
                                    Last Name
                                </label>
                                <input
                                    className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                                        errors.includes('lastName') ? 'border-red-500' : 'border-gray-200'
                                    } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-off-white focus:border-gray-500 transition-all`}
                                    id="grid-last-name"
                                    onChange={handleChange}
                                    name="lastName"
                                    type="text"
                                    placeholder="Doe"
                                />
                                {errors.includes('lastName') && (
                                    <p className="text-red-500 text-xs italic mt-3 mb-0">Please fill out this field.</p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-wrap mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0 input-wrapper">
                                <label
                                    className="block uppercase tracking-wide text-off-white text-xs font-bold mb-2"
                                    htmlFor="grid-first-name"
                                >
                                    Email
                                </label>
                                <input
                                    className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                                        errors.includes('email') ? 'border-red-500' : 'border-gray-200'
                                    } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-off-white transition-all`}
                                    id="grid-first-name"
                                    onChange={handleChange}
                                    name="email"
                                    type="text"
                                    placeholder="jane-doe@gmail.com"
                                />
                                {errors.includes('email') && (
                                    <p className="text-red-500 text-xs italic mb-0">
                                        Please fill in your email so i can get back to you.
                                    </p>
                                )}
                            </div>
                            <div className="w-full md:w-1/2 px-3 input-wrapper">
                                <label
                                    className="block uppercase tracking-wide text-off-white text-xs font-bold mb-2"
                                    htmlFor="grid-last-name"
                                >
                                    Company name
                                </label>
                                <input
                                    className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                                        errors.includes('company') ? 'border-red-500' : 'border-gray-200'
                                    } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-off-white focus:border-gray-500 transition-all`}
                                    id="grid-last-name"
                                    onChange={handleChange}
                                    name="company"
                                    type="text"
                                    placeholder="Facebook Inc."
                                />
                                {errors.includes('company') && (
                                    <p className="text-red-500 text-xs italic mb-0">Please fill out this field.</p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-wrap mb-6">
                            <div className="w-full px-3 input-wrapper">
                                <label
                                    className="block uppercase tracking-wide text-off-white text-xs font-bold mb-2"
                                    htmlFor="grid-first-name"
                                >
                                    Your message for me
                                </label>
                                <textarea
                                    className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                                        errors.includes('firstName') ? 'border-red-500' : 'border-gray-200'
                                    } rounded py-3 px-4 mb-0 leading-tight focus:outline-none focus:bg-off-white h-32 md:h-40 transition-all`}
                                    id="grid-first-name"
                                    onChange={handleChange}
                                    name="message"
                                    type="text"
                                    placeholder="I would like to talk to you about..."
                                />
                                {errors.includes('message') && (
                                    <p className="text-red-500 text-xs italic mt-3">
                                        Please leave me a message so i know what you would like to discuss.
                                    </p>
                                )}
                            </div>
                        </div>
                        {failedToSubmit && (
                            <div className="pt-5 text-secondary flex gap-2 w-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6 shrink-0"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                                    />
                                </svg>
                                <div>
                                    Something went wrong, please try again. <br />
                                    If the problem persists, please contact me directly at{' '}
                                    <a href="mailto:chesneybuitendijk@gmail.com">chesneybuitendijk@gmail.com</a>.
                                </div>
                            </div>
                        )}
                        <div className="w-full flex justify-end pt-1">
                            <button
                                onClick={handleSubmit}
                                type="button"
                                className={`text-white bg-gradient-to-r outline-none focus:outline-none from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br  dark:focus:ring-purple-800 shadow-sm shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${
                                    isSubmitting ? 'opacity-80 cursor-not-allowed' : 'opacity-100 cursor-pointer'
                                }`}
                            >
                                {isSubmitting ? <>Submitting message...</> : <>Send message</>}
                            </button>
                        </div>
                    </form>
                </div>
            )}
            <div ref={lineRef} className="w-0 h-[1px]  bg-white flex-grow-0 flex-shrink-0 mx-auto mb-5 md:hidden" />
            <div className="flex gap-6 items-center w-full justify-center md:pb-20 pb-10 pt-3 md:pt-5">
                <a
                    href="https://www.linkedin.com/in/chesneybuitendijk/"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full p-4 hover:shadow-custom-pink transition-all hover:-translate-y-1.5 bg-primary social-button"
                >
                    <span className="">
                        <svg viewBox="0 0 24 24" width="26" xmlns="http://www.w3.org/2000/svg" fill="white">
                            <path d="m4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714z" />
                        </svg>
                    </span>
                </a>
                <a
                    href="mailto:chesneybuitendijk@gmail.com"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full p-4 hover:shadow-custom-pink  transition-all hover:-translate-y-1.5 bg-primary social-button"
                >
                    <span className="">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            width="26"
                            fill="white"
                            viewBox="0 0 256 256"
                            xmlSpace="preserve"
                        >
                            <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                                <path
                                    d="M 80.89 78.772 H 9.11 c -5.023 0 -9.11 -4.087 -9.11 -9.11 V 20.338 c 0 -5.023 4.087 -9.11 9.11 -9.11 h 71.78 c 5.023 0 9.11 4.087 9.11 9.11 v 49.324 C 90 74.686 85.913 78.772 80.89 78.772 z M 9.11 17.228 c -1.715 0 -3.11 1.396 -3.11 3.11 v 49.324 c 0 1.715 1.395 3.11 3.11 3.11 h 71.78 c 1.715 0 3.11 -1.396 3.11 -3.11 V 20.338 c 0 -1.715 -1.396 -3.11 -3.11 -3.11 H 9.11 z"
                                    transform=" matrix(1 0 0 1 0 0) "
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M 45 55.427 c -5.408 0 -10.599 -2.292 -14.242 -6.288 L 2.493 18.125 l 4.435 -4.042 l 28.265 31.013 c 2.545 2.792 6.028 4.331 9.807 4.331 c 3.779 0 7.262 -1.538 9.808 -4.331 l 28.266 -31.013 l 4.434 4.042 L 59.241 49.138 C 55.599 53.135 50.408 55.427 45 55.427 z"
                                    transform=" matrix(1 0 0 1 0 0) "
                                    strokeLinecap="round"
                                />
                                <rect
                                    x="-0.96"
                                    y="57.16"
                                    rx="0"
                                    ry="0"
                                    width="38.98"
                                    height="6"
                                    transform=" matrix(0.7053 -0.7089 0.7089 0.7053 -37.1881 30.8639) "
                                />
                                <rect
                                    x="68.47"
                                    y="40.67"
                                    rx="0"
                                    ry="0"
                                    width="6"
                                    height="38.98"
                                    transform=" matrix(0.709 -0.7053 0.7053 0.709 -21.628 67.9146) "
                                />
                            </g>
                        </svg>
                    </span>
                </a>
            </div>
        </div>
    );
}
