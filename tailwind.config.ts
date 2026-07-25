import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'orb-1': {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(60px,-40px) scale(1.1)' },
          '66%': { transform: 'translate(-30px,50px) scale(0.95)' },
        },
        'orb-2': {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(-50px,30px) scale(0.9)' },
          '66%': { transform: 'translate(40px,-60px) scale(1.05)' },
        },
      },
      animation: {
        'orb-1': 'orb-1 12s ease-in-out infinite',
        'orb-2': 'orb-2 15s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
