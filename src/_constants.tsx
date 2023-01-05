import { capitalCase } from "change-case"

import { TITLE_REGEX } from "~common/title-regex"
import ROUTES from "~react-pages"

export const ROUTE_INFOS = ROUTES.map(({ path }) => {
  path ??= ""
  /** 画面上部や左のドロワーに表示するタイトル */
  const title = path === "/" ? "Welcome Page" : capitalCase(path.replace(TITLE_REGEX, ""))

  const to = path.startsWith("/") ? path : `/${path}`

  const isActive = (path: string) => {
    if (to === "/") {
      return path === "/"
    } else {
      return path.includes(to)
    }
  }

  return { title, to, isActive }
}).sort((a, b) => {
  // Welcomeを一番上に、それ以外は日付順(toの辞書並び順)
  if (a.to === "/" || b.to === "/") return 1
  return a.to < b.to ? 1 : -1
})
