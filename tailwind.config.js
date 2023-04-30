const { plugin } = require('twrnc');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./routes/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        lightText: `text-black`,
        darkText: `text-white`,
        lightBG: `bg-white`,
        darkBG: `bg-[#141414]`,
        darkSecondaryBG: `bg-[#262628]`,
        lightSecondaryBG: `bg-gray-200`,
      });
    }),
  ],
}
