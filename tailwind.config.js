/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
  "./src/**/*.jsx",],
  theme: {
    extend: {
      colors: {
        "light-green": '#99D692',
        "dark-green": '#355420',
        "black-green": '#0B1708',
        "white-green": '#E6F0DD'
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

