/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        revolt: {
          primary: '#667eea',
          secondary: '#764ba2',
          red: '#ff6b6b',
          green: '#4ecdc4',
          orange: '#f39c12',
          blue: '#3498db',
        }
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-out': 'fadeInOut 2s ease-in-out infinite',
        'sound-wave': 'soundWave 1s ease-in-out infinite',
        'recording-pulse': 'recordingPulse 1s ease-in-out infinite',
      },
      keyframes: {
        fadeInOut: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        soundWave: {
          '0%, 100%': { height: '8px' },
          '50%': { height: '24px' },
        },
        recordingPulse: {
          '0%': { boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)' },
          '50%': { boxShadow: '0 8px 25px rgba(255, 107, 107, 0.8)' },
          '100%': { boxShadow: '0 4px 15px rgba(255, 107, 107, 0.4)' },
        }
      }
    },
  },
  plugins: [],
}
