import format from "https://deno.land/x/date_fns@v2.22.1/format/index.js"
import { exec } from "https://raw.githubusercontent.com/kagurazaka-0/deno-scripts/main/utils/exec.ts"

const name = Deno.args[0] || prompt("sample name?")
if (!name) {
  console.warn("⚠️  name is empty.")
  Deno.exit(1)
}

const description = prompt("description? (optional)") ?? ""
const isPrivate = (prompt("private? (y/N)") ?? "n").toLowerCase() === "y"

const dirName = `${format(new Date(), "yyyyMMdd", {})}-${name}`
const dirPath = `src/samples/${isPrivate ? "_" : ""}${dirName}`

Deno.mkdir(dirPath)

Deno.writeTextFile(`${dirPath}/index.tsx`, `export default function Page() { return <div></div> }`)

// prettier-ignore
Deno.writeTextFile(`${dirPath}/README.md`,`
# ${name}

${description}

`)

await exec(`npx prettier --write ${dirPath}/*`)
await exec(`npm run generate-readme`)
