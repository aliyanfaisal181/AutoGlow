/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0a',        // page background
        charcoal: {
          DEFAULT: '#161616',  // alternate section background
          card: '#1d1d1d',     // cards
          line: '#2e2e2e',     // borders
        },
        steel: '#9a9a9a',      // secondary text
        ember: {
          DEFAULT: '#f26a21',  // the one accent colour
          soft: '#ff8a4c',
        },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'Impact', 'sans-serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
