const pluginSortImports = require("@trivago/prettier-plugin-sort-imports")
const pluginTailwindcss = require("prettier-plugin-tailwindcss")

/** @type {import("prettier").Parser}  */
const hackParser = {
  ...pluginSortImports.parsers.typescript,
  parse: pluginTailwindcss.parsers.typescript.parse,
}

/** @type {import("prettier").Plugin}  */
const hackedPlugin = {
  parsers: {
    typescript: hackParser,
  },
}

module.exports = {
  plugins: [hackedPlugin],
  tabWidth: 2,
  semi: false,
  printWidth: 120,
  arrowParens: "always",
  importOrder: ["^~icons", "^[~/]", "^[../]", "^[./]"],
  importOrderSeparation: true,
}
