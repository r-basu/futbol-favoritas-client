/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
  "./src/**/*.jsx",],
  theme: {
    extend: {
      screens :{
        'mb': '320px',
      },
      colors: {
        "light-green": '#99D692',
        "dark-green": '#355420',
        "black-green": '#0B1708',
        "white-green": '#E6F0DD'
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      spacing: {
        '36': '9rem',
        '48': '12rem',
        '60': '15rem',
        '72': '18rem', 
        '84': '21rem',
        '96': '24rem',
        '128': '32rem',
      }
    },
  },
  plugins: [],
}

