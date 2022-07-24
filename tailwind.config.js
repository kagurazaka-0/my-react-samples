const plugin = require("tailwindcss/plugin")
const daisy = require("daisyui")

const { COLORS } = require("./src/_common/daisyui/color.json")

const myPlugin = plugin(({ addUtilities }) => {
  addUtilities({
    ".center": {
      display: "grid",
      "place-items": "center",
    },
  })
})

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", "*.html"],
  theme: {
    extend: {},
  },
  plugins: [daisy, myPlugin],
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
