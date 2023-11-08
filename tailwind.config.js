/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors:{
        'primary-color':"#80B3FF",
        'primary-color-dark':"#687EFF",
        'primary-color-light':"#98E4FF",
        'primary-color-extra-light':"#B6FFFA"
      }
    },
  },
  plugins: [],
}

