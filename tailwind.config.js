/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '16px',
                md: '0',
            },
            screens: {
                '2xl': '1400px',
                lg: '984px',
                md: '728px',
                sm: '600px',
                xl: '1240px',
            },
        },
        extend: {},
    },
    plugins: [],
};
