import clsx from "clsx"
import { PropsWithChildren, Suspense, useEffect, useRef } from "react"
import { useLocation, useRoutes, Link } from "react-router-dom"
import { RecoilRoot } from "recoil"

import IconList from "~icons/bi/list"
import IconReact from "~icons/simple-icons/react"

import { Q } from "~/_common/Q"
import routes from "~react-pages"

import { SettingModal } from "./SettingModal"
import { useColorStateValue } from "./_common/daisyui/color-state"
import { useTitleState } from "./_common/title-state"

const ROUTE_INFOS = routes
  .map(({ path }) => {
    path = path ?? ""
    /** 画面上部や左のドロワーに表示するタイトル */
    let title = path.replace(/^\d+-/, "")
    if (title === "/") {
      title = "Welcome Page"
    }
    const to = path.startsWith("/") ? path : `/${path}`

    const isActive = (path: string) => {
      if (to === "/") {
        return path === "/"
      } else {
        return path.includes(to)
      }
    }

    return { title, to, isActive }
  })
  .sort((a, b) => {
    // Welcomeを一番上に、それ以外は日付順(toの辞書並び順)
    if (a.to === "/" || b.to === "/") return 1
    return a.to < b.to ? 1 : -1
  })

export const App = () => {
  const routerLocation = useLocation()

  const color = useColorStateValue()
  const [title, setTitle] = useTitleState()

  // ページ遷移時、タイトルを更新
  useEffect(() => {
    const maybeTitle = ROUTE_INFOS.find((it) => it.isActive(routerLocation.pathname))?.title
    if (!maybeTitle) {
      console.warn('⚠️  maybeTitle is `"" | undefined`.', { maybeTitle })
      return
    }
    setTitle(maybeTitle)
    document.title = `${maybeTitle} - my-react-app`
  }, [routerLocation.pathname])

  return (
    <Contexts>
      <Q.div data-theme={color} class="ds-drawer-mobile ds-drawer ">
        <Q.input id="toggle-drawer" type="checkbox" class="ds-drawer-toggle" />
        <Q.div class="ds-drawer-content relative ">
          {/* ヘッダー */}
          <Q.div class="sticky top-4 left-0 m-4 mt-0">
            <Q.div class="ds-navbar bg-base-100 shadow-xl lg:center rounded-box bg-opacity-60 backdrop-blur">
              <Q.div class="lg:hidden flex-none">
                <Q.label htmlFor="toggle-drawer" class="ds-btn ds-btn-square ds-btn-ghost">
                  <IconList className="w-6 h-6" />
                </Q.label>
              </Q.div>
              <Q.div class="flex-1 text-xl font-semibold text-center">{title}</Q.div>
            </Q.div>
          </Q.div>

          {/* ページの内容 */}
          <Q.div class="pt-4 p-6">
            <RouterView />
          </Q.div>
        </Q.div>
        <Q.div class="ds-drawer-side">
          {/* NOTE: スマホでdrawer表示時、右側に表示される薄いグレーのoverlay、onPress時labelの効果によりinputのチェックが外される */}
          <Q.label htmlFor="toggle-drawer" class="ds-drawer-overlay" />
          <Q.div class="p-4 text-base-content w-80 overflow-y-auto bg-base-200">
            <Q.div class="h-14 bg-base-300 rounded-box flex justify-center items-center text-lg">
              <IconReact className="w-8 h-8 text-primary" />
              <Q.span class="ml-2 space-x-1 font-semibold">
                <Q.span class="text-base-content">My</Q.span>
                <Q.span class="text-primary">React</Q.span>
                <Q.span class="text-base-content">Samples</Q.span>
              </Q.span>
            </Q.div>
            {/* <Q.label htmlFor="toggle-drawer" class="ds-drawer-overlay" /> */}
            <Q.ul class="ds-menu mt-2">
              {ROUTE_INFOS.map((routeInfo) => {
                const isActive = routeInfo.isActive(routerLocation.pathname)
                return (
                  <Q.li class="mt-2 " key={routeInfo.to}>
                    {/* TODO: <Q as={Link} /> */}
                    <Link className={clsx("rounded-lg", isActive && "ds-active")} to={routeInfo.to}>
                      {routeInfo.title}
                    </Link>
                  </Q.li>
                )
              })}
            </Q.ul>
          </Q.div>
        </Q.div>
        {IS_DEV && <SettingModal />}
      </Q.div>
    </Contexts>
  )
}

const Contexts = ({ children }: PropsWithChildren) => {
  return <RecoilRoot>{children}</RecoilRoot>
}

const RouterView = () => {
  return <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>
}
