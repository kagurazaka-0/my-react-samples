const pluginSortImports = require("@ianvs/prettier-plugin-sort-imports")
const pluginOrganizeImports = require("prettier-plugin-organize-imports")
const pluginTailwindcss = require("prettier-plugin-tailwindcss")

const { parsers: parsersTypescript } = require("prettier/parser-typescript")
const { parsers: parsersHtml } = require("prettier/parser-html")

/** @type {import("prettier").Plugin}  */
const myPlugin = {
  parsers: {
    typescript: {
      ...parsersTypescript.typescript,
      preprocess(text, options) {
        let it = text
        try {
          it = pluginOrganizeImports.parsers?.typescript.preprocess?.(it, options) ?? it
          it = pluginSortImports.parsers?.typescript.preprocess(it, options)
        } catch (error) {
          console.warn(`⚠️ plugin error`, error)
        }
        return it
      },
      parse: pluginTailwindcss.parsers.typescript.parse,
    },
    html: {
      ...parsersHtml.html,
      parse: pluginTailwindcss.parsers.html.parse,
    },
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
  trailingComma: "all",
}
