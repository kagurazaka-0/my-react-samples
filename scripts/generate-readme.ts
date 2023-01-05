// TODO:GitHub Actionsで自動化する
import { walk } from "https://deno.land/std@0.127.0/fs/walk.ts"
import { join } from "https://deno.land/std@0.142.0/path/mod.ts"

import { TITLE_REGEX } from "../src-common/title-regex.ts"

const PAGE_URL = "https://kagurazaka-0.github.io/my-react-samples"
const TARGET_PATH = "./src/samples"
const REPLACE_TARGET = "<!-- INSERT SAMPLES -->"
const TEMPLATE_README_PATH = "./README.template.md"
const README_PATH = "./README.md"

function logObject(obj: {}) {
  Object.entries(obj).forEach(([key, value]) => console.log(`${key}: ${JSON.stringify(value)}`))
  console.log()
}

type PageInfo = {
  title: string
  description: string
  path: string
  readmeFilePath: string
}
const pageInfos: PageInfo[] = []

async function hasFile(path: string | URL) {
  try {
    await Deno.readFile(path)
    return true
  } catch (error) {
    return false
  }
}

for await (const item of walk(TARGET_PATH)) {
  const isTarget = /^_?\d{6}/.test(item.name)
  if (!isTarget) continue

  console.group(item.name)
  const result = await hasFile(`${item.path}/index.tsx`)
  console.log(result)

  if (!result) continue

  logObject(item)

  const title = item.name.replace(TITLE_REGEX, "")

  const markdownPath = join(item.path, `README.md`)
  const description = await Deno.readTextFile(markdownPath)
    .then((markdownText) => markdownText.split("\n")[2] ?? "")
    .catch(() => "")

  const path = `${PAGE_URL}/${item.name}/`
  const readmeFilePath = `./src/samples/${item.name}`

  const pageInfo = { title, description, path, readmeFilePath }
  logObject(pageInfo)
  console.groupEnd()
  pageInfos.push(pageInfo)
}

if (pageInfos.length === 0) {
  console.log("pageInfos is empty.")
  Deno.exit(0)
}

const markdownTableValueText = pageInfos
  .reverse()
  .map((it) => `|[${it.title}](${it.path})|[ℹ️](${it.readmeFilePath})|${it.description}|`)
  .join("\n")

const markdownTableText = `
<!-- prettier-ignore -->
|名称|詳細リンク|概要|
|-|-|-|
${markdownTableValueText}
`

await writeFromTemplateFile({
  templatePath: TEMPLATE_README_PATH,
  writePath: README_PATH,
  searchText: REPLACE_TARGET,
  replaceText: markdownTableText,
})

type Option = {
  templatePath: string
  writePath: string
  searchText: string
  replaceText: string
}

async function writeFromTemplateFile(option: Option) {
  const templateText = await Deno.readTextFile(option.templatePath)
  await Deno.writeTextFile(option.writePath, templateText.replace(option.searchText, option.replaceText))
  await Deno.run({ cmd: `npx prettier --write ${option.writePath}`.split(" ") }).status()
}
