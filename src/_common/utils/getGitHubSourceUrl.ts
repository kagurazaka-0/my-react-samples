import { join } from "path-browserify"

const REPO_URL = "https://github.com/kagurazaka-0/my-react-samples"

export function getGitHubSourceUrl(path: string) {
  return join(REPO_URL, "blob/main", path)
  // return `${REPO_URL}/blob/main${path}`
}
