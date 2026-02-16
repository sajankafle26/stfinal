/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',      // Next.js 13 app directory
    './pages/**/*.{js,ts,jsx,tsx}',    // pages directory
    './components/**/*.{js,ts,jsx,tsx}', // Components
  ],
  theme: {
    extend: {
      colors: {
        sangalo: {
          50: '#f8fbff',
          100: '#eef6ff',
          200: '#d9eaff',
          300: '#b7d8ff',
          400: '#86bcff',
          500: '#5194ff',
          600: '#2c6bff',
          700: '#1b54f1',
          800: '#1a44c3',
          900: '#004381',
          950: '#002a4d',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
