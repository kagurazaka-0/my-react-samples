const daisy = require("daisyui")

const { COLORS } = require("./src/_common/daisyui/color.json")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", "*.html"],
  theme: {
    extend: {},
  },
  plugins: [daisy],
  daisyui: {
    styled: true,
    themes: COLORS,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "ds-",
    darkTheme: "light",
  },
}
