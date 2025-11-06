/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        robo: ['"Roboto"'],
        mac: ['"Macondo"']
      },
      keyframes: {
        'once-spin': {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.1)'},
          '100%': { transform: 'rotate(360deg) scale(1)' },
        }
      },
      animation: {
        'spin-once': 'once-spin 0.3s ease-in-out 1 forwards', 
      }
    },
  },
  plugins: [],
}