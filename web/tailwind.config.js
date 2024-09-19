const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"TT2020 Base"', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [
    require('@tailwind-plugin/expose-colors')({
      extract: ['yellow', 'blue', 'midnight', 'tahiti', "slate", "purple", "red", "white"],
    }),
  ],
}

