/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      darkMode: 'class',
      colors:{
        'primary-color-orange':"#E28413",
        'primary-color-dark':"#003F91",
        'primary-color-light':"#DCEDFF",
        'primary-color-yellow':"#CFD11A",
        'primary-color-red':"#A4031F",
        'secondary-color-extra-dark':"#222831",//body
        'secondary-color-dark':"#220C10",//navbar / sidebbar
        "secondary-color":"#35524A",//dropdown
        "secondary-color-light":"#FFBA08",//button
        "secondary-color-extra-light":"#95989d",//text
        "secondary-color-red":"#EF233C",
        "secondary-color-blue":"#00ABE7",
        "selected-page-color":"#ffa500"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

