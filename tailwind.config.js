/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      darkMode: 'class',
      colors:{
        'primary-color':"#80B3FF",
        'primary-color-dark':"#687EFF",
        'primary-color-light':"#98E4FF",
        'primary-color-extra-light':"#B6FFFA",
        'secondary-color-extra-dark':"#222831",//body
        'secondary-color-dark':"#64686f",//navbar / sidebbar
        "secondary-color":"#4d525a",//dropdown
        "secondary-color-light":"#ffe6ad",//button
        "secondary-color-extra-light":"#95989d"//text
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

