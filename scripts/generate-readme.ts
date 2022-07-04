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
};
const pageInfos: PageInfo[] = [];

for await (const item of Deno.readDir(TARGET_PATH)) {
  const title = item.name.replace(/^\d{6}-/, "");

  const markdownPath = join(TARGET_PATH, item.name, `README.md`);
  const description = await Deno.readTextFile(markdownPath)
    .then((markdownText) => markdownText.split("\n")[2] ?? "")
    .catch(() => "");

  const path = `${PAGE_URL}/samples/${item.name}/`;

  const pageInfo = { title, description, path };
  logObject(pageInfo);
  pageInfos.push(pageInfo);
}

const markdownTableValueText = pageInfos
  .map((it) => `|[${it.title}](${it.path})|${it.description}|`)
  .join("\n");

const markdownTableText = `
<!-- prettier-ignore -->
|名称|概要|
|-|-|
${markdownTableValueText}
`;

const templateText = await Deno.readTextFile(TEMPLATE_README_PATH);
await Deno.writeTextFile(
  README_PATH,
  templateText.replace(REPLACE_TARGET, markdownTableText),
);
await Deno.run({ cmd: `npx prettier --write ${README_PATH}`.split(" ") })
  .status();
