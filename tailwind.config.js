/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#971313',
          light: '#c22e2e',
          dark: '#6b0d0d',
        },
        accent: '#ff4757',
        bg: {
          DEFAULT: '#0a0a0a',
          surface: '#161616',
          card: '#1a1a1a',
        },
        border: {
          DEFAULT: '#333333',
          light: '#444444',
        },
      },
      fontFamily: {
        main: ['Poppins', 'sans-serif'],
      },
      animation: {
        spin: 'spin 1s linear infinite',
        gradient: 'gradient 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        blink: 'blink 1s infinite',
        pulse: 'pulse 2s ease-in-out infinite',
        bounce: 'bounce 2s ease-in-out infinite',
        orbit: 'orbit 8s linear infinite',
        glowPulse: 'glowPulse 3s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite',
        fadeInUp: 'fadeInUp 0.6s ease forwards',
        slideIn: 'slideIn 0.3s ease forwards',
        slideOut: 'slideOut 0.3s ease forwards',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.3', transform: 'translate(-50%, -50%) scale(1)' },
          '50%': { opacity: '0.5', transform: 'translate(-50%, -50%) scale(1.05)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { transform: 'translateX(100%)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        slideOut: {
          from: { transform: 'translateX(0)', opacity: '1' },
          to: { transform: 'translateX(100%)', opacity: '0' },
        },
      },
      backgroundSize: {
        '200': '200% auto',
      },
      boxShadow: {
        'primary': '0 0 20px rgba(151, 19, 19, 0.5)',
        'primary-md': '0 4px 16px rgba(151, 19, 19, 0.3)',
      },
    },
  },
  plugins: [],
}
