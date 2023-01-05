const REPO_URL = "https://github.com/kagurazaka-0/my-react-samples"

export function getGitHubSourceUrl(path: string) {
  return [REPO_URL, "blob/main", path].join("/")
  // return `${REPO_URL}/blob/main${path}`
}
