module.exports = {
  plugins: [require("prettier-plugin-tailwindcss")],
  tabWidth: 2,
  semi: false,
  printWidth: 120,
  arrowParens: "always",
  importOrder: ["^[~/]", "^[../]", "^[./]"],
  importOrderSeparation: true,
}
