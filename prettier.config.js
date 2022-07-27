///@ts-check

const pluginSortImports = require("@trivago/prettier-plugin-sort-imports")
const pluginOrganizeImports = require("prettier-plugin-organize-imports")
const pluginTailwindcss = require("prettier-plugin-tailwindcss")

const { parsers: typescriptParsers } = require("prettier/parser-typescript")

/** @type {import("prettier").Parser}  */
const myParser = {
  ...typescriptParsers.typescript,
  preprocess(text, options) {
    let it = text
    try {
      it = pluginOrganizeImports.parsers.typescript.preprocess(it, options)
      it = pluginSortImports.parsers.typescript.preprocess(it, options)
    } catch (error) {
      console.warn(`⚠️ plugin error`, error)
    }
    return it
  },
  parse: pluginTailwindcss.parsers.typescript.parse,
}

/** @type {import("prettier").Plugin}  */
const myPlugin = {
  parsers: {
    typescript: myParser,
  },
}

module.exports = {
  plugins: [myPlugin],
  tabWidth: 2,
  semi: false,
  printWidth: 120,
  arrowParens: "always",
  importOrder: ["^~icons", "^[~/]", "^[../]", "^[./]"],
  importOrderSeparation: true,
}
