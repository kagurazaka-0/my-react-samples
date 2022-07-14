// TODO:GitHub Actionsで自動化する

import { join } from "https://deno.land/std@0.142.0/path/mod.ts";

const PAGE_URL = "https://kagurazaka-0.github.io/my-react-samples";
const TARGET_PATH = "./src/samples";
const REPLACE_TARGET = "<!-- INSERT SAMPLES -->";
const TEMPLATE_README_PATH = "./README.template.md";
const README_PATH = "./README.md";

function logObject(obj: {}) {
  Object.entries(obj).forEach(([key, value]) =>
    console.log(`${key}: ${JSON.stringify(value)}`)
  );
  console.log();
}

type PageInfo = {
  title: string;
  description: string;
  path: string;
  readmeFilePath: string
};
const pageInfos: PageInfo[] = [];

for await (const item of Deno.readDir(TARGET_PATH)) {
  const title = item.name.replace(/^\d{6}-/, "");

  const markdownPath = join(TARGET_PATH, item.name, `README.md`);
  const description = await Deno.readTextFile(markdownPath)
    .then((markdownText) => markdownText.split("\n")[2] ?? "")
    .catch(() => "");

  const path = `${PAGE_URL}/${item.name}/`;
  const readmeFilePath = `./src/samples/${item.name}/README.md`;

  const pageInfo = { title, description, path,readmeFilePath };
  logObject(pageInfo);
  pageInfos.push(pageInfo);
}

const markdownTableValueText = pageInfos
  .reverse()
  .map((it) => `|[${it.title}](${it.path}) [ℹ️](${it.readmeFilePath})|${it.description}|`)
  .join("\n");

const markdownTableText = `
<!-- prettier-ignore -->
|名称|概要|
|-|-|
${markdownTableValueText}
`;



await writeFromTemplateFile({
  templatePath: TEMPLATE_README_PATH,
  writePath: README_PATH,
  searchText: REPLACE_TARGET,
  replaceText: markdownTableText,
});

type Option = {
  templatePath: string;
  writePath: string;
  searchText: string;
  replaceText: string;
};

async function writeFromTemplateFile(option: Option) {
  const templateText = await Deno.readTextFile(option.templatePath);
  await Deno.writeTextFile(
    option.writePath,
    templateText.replace(option.searchText, option.replaceText),
  );
  await Deno.run({ cmd: `npx prettier --write ${option.writePath}`.split(" ") })
    .status();
}
