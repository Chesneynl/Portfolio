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
        extend: {
            boxShadow: {
                'custom-pink': '0 0 15px black', // Adjust the spread, blur, and offset as needed
            },
            colors: {
                primary: '#ef476f',
                secondary: '#ffd166',
                'off-white': '#F5F5F5',
                dark: '#034529',
                light: '#FFB063',
            },
        },
    },
    plugins: [],
};
