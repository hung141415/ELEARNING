/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          darkest: '#071120',
          darker: '#0B1838',
          primary: '#112659',
          elevated: '#173571',
          card: '#1E3A6E',
          cardHover: '#26487E',
        },
        accent: {
          DEFAULT: '#C4A07C',
          light: '#E0C4A4',
          hover: '#B28F6B',
          glow: 'rgba(196, 160, 124, 0.35)',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        card: '0 10px 30px rgba(0, 0, 0, 0.25)',
        elevated: '0 16px 40px rgba(0, 0, 0, 0.35)',
        accent: '0 8px 24px rgba(196, 160, 124, 0.35)',
        accentGlow: '0 0 25px rgba(196, 160, 124, 0.45)',
      },
    },
  },
  plugins: [],
};
