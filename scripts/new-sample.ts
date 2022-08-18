import format from "https://deno.land/x/date_fns@v2.22.1/format/index.js"
import { exec } from "https://raw.githubusercontent.com/kagurazaka-0/deno-scripts/main/utils/exec.ts"

const name = prompt("sample name?")
if (!name) {
  console.warn("⚠️  name is empty.")
  Deno.exit(1)
}

const description = prompt("description? (optional)") ?? ""

const dirName = `${format(new Date(), "yyyyMMdd", {})}-${name}`
const dirPath = `src/samples/${dirName}`

Deno.mkdir(dirPath)

Deno.writeTextFile(`${dirPath}/index.tsx`, `export default function Page() { return <div></div> }`)

// prettier-ignore
Deno.writeTextFile(`${dirPath}/README.md`,`
# ${name}

${description}

`)

exec(`npx prettier --write ${dirPath} && npm run generate-readme`)
