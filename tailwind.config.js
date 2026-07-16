/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eefcfb',
          100: '#d3f8f4',
          200: '#abf0ea',
          300: '#73e3dc',
          400: '#38cdc6',
          500: '#14b3ad',
          600: '#0c908b',
          700: '#0d726f',
          800: '#115b59',
          900: '#134c4b',
          950: '#042f2e',
        },
        accent: {
          50: '#fff5ed',
          100: '#ffe8d4',
          200: '#ffcda8',
          300: '#ffa970',
          400: '#ff7c38',
          500: '#fb5c11',
          600: '#ec4209',
          700: '#c4310a',
          800: '#9c2910',
          900: '#7e2511',
          950: '#431006',
        },
        ink: {
          50: '#f6f7f9',
          100: '#eceef2',
          200: '#d5d9e2',
          300: '#b0b8c8',
          400: '#8591a8',
          500: '#67738f',
          600: '#525c76',
          700: '#434a60',
          800: '#3a4052',
          900: '#0f1422',
          950: '#080b14',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(20,179,173,0.25), 0 10px 40px -10px rgba(20,179,173,0.45)',
        'glow-accent': '0 0 0 1px rgba(251,92,17,0.25), 0 10px 40px -10px rgba(251,92,17,0.45)',
        soft: '0 10px 40px -12px rgba(15,20,34,0.18)',
        'soft-dark': '0 10px 40px -12px rgba(0,0,0,0.55)',
      },
      backgroundImage: {
        'grid-light':
          'linear-gradient(to right, rgba(15,20,34,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,20,34,0.05) 1px, transparent 1px)',
        'grid-dark':
          'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fade-in 0.6s ease both',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 18s linear infinite',
        shimmer: 'shimmer 2s linear infinite',
        marquee: 'marquee 28s linear infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.4,0,0.2,1) infinite',
      },
    },
  },
  plugins: [],
};
