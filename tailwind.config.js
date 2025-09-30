/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B3B66',
          light: '#E6F0FF',
          dark: '#082A4D'
        },
        accent: {
          DEFAULT: '#C1440E',
          dark: '#A63A0C'
        },
        success: {
          DEFAULT: '#2A9D8F',
          dark: '#238B7A'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out'
      },
      keyframes: {
        slideUp: {
          '0%': {
            transform: 'translateY(100%)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1'
          }
        }
      }
    },
  },
  plugins: [],
};