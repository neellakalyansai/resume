/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary": "#091830",
        "secondary": "#F97316",
        "tertiary": "#5DC1C6",
      }
    },
    screens: {
      'lg': {'max': '2023px'},
      
      'sm': {'max': '1000px'},
      
    }
  },
  plugins: [],
}