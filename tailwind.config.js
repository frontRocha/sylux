/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#19CDC2'
      },
      backgroundPosition: {
        'banner': 'left 50% bottom',
        'banner-mobile': 'center 60% center'
      },
    },
  },
  plugins: [],
}