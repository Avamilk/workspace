import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        led: ['VT323', 'monospace'],
      },
      colors: {
        led: {
          green: '#39ff14',
          amber: '#ffb000',
          red: '#ff3333',
          dim: '#4a4a5a',
        },
        panel: {
          dark: '#0a0a0f',
          light: '#1a1a24',
        },
        pitch: {
          dark: '#0f2d1f',
          light: '#1a4d2e',
        }
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}

export default config
