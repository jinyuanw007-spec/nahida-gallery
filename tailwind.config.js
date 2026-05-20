/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nahida-green': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#7cb342',
          600: '#558b2f',
          700: '#33691e',
          800: '#2e7d32',
          900: '#1b5e20',
        },
        'nahida-gold': {
          50: '#fffde7',
          100: '#fff9c4',
          200: '#fff59d',
          300: '#ffe082',
          400: '#ffd54f',
          500: '#ffca28',
          600: '#ffb300',
          700: '#ff8f00',
        },
        'nahida-dark': {
          900: '#0a1f0a',
          800: '#0d2a0d',
          700: '#123812',
        }
      },
      fontFamily: {
        'song': ['Source Han Serif SC', 'Noto Serif SC', 'SimSun', 'serif'],
        'hei': ['Source Han Sans SC', 'Noto Sans SC', 'SimHei', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(124, 179, 66, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(124, 179, 66, 0.8), 0 0 30px rgba(124, 179, 66, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
