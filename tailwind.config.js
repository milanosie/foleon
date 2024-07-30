/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {
            minHeight: {
                'screen-minus-footer-header': 'calc(100vh - 120px)'
            },
            colors: {
                primary: '#37666D',
                secondary: '#7FB7BE',
                lightGray: '#F5F5F5',
                darkGray: '#333333',
                accentGreen: '#CFFFB3',
                textWhite: '#FFFFFF',
            },
            fontWeight: {
                light: '100',
                normal: '300',
                semiBold: '500',
                bold: '700',
            },
            maxWidth: {
                'page': '1200px',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Georgia', 'serif'],
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ]
};
