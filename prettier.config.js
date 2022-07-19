module.exports = {
  plugins: [require("prettier-plugin-tailwindcss"), require("@trivago/prettier-plugin-sort-imports")],
  tabWidth: 2,
  semi: false,
  printWidth: 120,
  arrowParens: "always",
  importOrder: ["^~icons", "^[~/]", "^[../]", "^[./]"],
  importOrderSeparation: true,
}
