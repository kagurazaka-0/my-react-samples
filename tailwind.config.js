const daisy = require("daisyui")
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", "*.html"],
  theme: {
    extend: {},
  },
  plugins: [daisy],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "ds-",
    darkTheme: "light",
  },
}
