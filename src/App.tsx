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

// const DevModal

const ROUTE_INFOS = routes.map(({ path }) => {
  path = path ?? ""
  let title = path.replace(/^\d+-/, "")
  if (title === "/") {
    title = "Welcome Page"
  }
  const to = path.startsWith("/") ? path : `/${path}`
  return { title, to, path }
})

export const App = () => {
  const routerLocation = useLocation()
  const color = useColorStateValue()
  const [title, setTitle] = useTitleState()

  return (
    <Contexts>
      <Q.div data-theme={color} class="ds-drawer-mobile ds-drawer ">
        <Q.input id="toggle-drawer" type="checkbox" class="ds-drawer-toggle" />
        <Q.div class="ds-drawer-content relative ">
          {/* ヘッダー */}
          <Q.div class="sticky top-4 left-0 m-4 mt-0">
            <Q.div class="ds-navbar navbar bg-base-100 shadow-xl rounded-box bg-opacity-60 backdrop-blur ">
              <Q.div class="flex-none">
                <Q.label htmlFor="toggle-drawer" class="ds-btn ds-btn-square ds-btn-ghost">
                  <IconList className="w-6 h-6" />
                </Q.label>
              </Q.div>
              <Q.div class="flex-1">
                <Q.a class="ds-btn ds-btn-ghost normal-case text-xl">TITLE</Q.a>
              </Q.div>
              {/* <Q.div class="flex-none">
                <Q.button class="ds-btn ds-btn-square ds-btn-ghost">

                </Q.button>
              </Q.div> */}
            </Q.div>
          </Q.div>

          {/* ページの内容 */}
          <Q.div class="pt-16 p-6">
            <RouterView />
          </Q.div>
        </Q.div>
        <Q.div class="ds-drawer-side">
          {/* NOTE: スマホでdrawer表示時、右側に表示される薄いグレーのoverlay、onPress時labelの効果によりinputのチェックが外される */}
          <Q.label htmlFor="toggle-drawer" class="ds-drawer-overlay" />
          <Q.div class="p-4 text-base-content w-80 overflow-y-auto bg-base-200">
            <Q.div class="h-14 bg-base-300 rounded-box flex justify-center items-center text-lg">
              <IconReact className="w-8 h-8 text-primary" />
              <Q.span class="ml-2 space-x-1">
                <Q.span class="text-base-content">My</Q.span>
                <Q.span class="text-primary">React</Q.span>
                <Q.span class="text-base-content">Samples</Q.span>
              </Q.span>
            </Q.div>
            {/* <Q.label htmlFor="toggle-drawer" class="ds-drawer-overlay" /> */}
            <Q.ul class="ds-menu mt-2">
              {ROUTE_INFOS.map(({ title, to, path }) => {
                const isActive = path === "/" ? routerLocation.pathname === "/" : routerLocation.pathname.includes(path)
                if (isActive) {
                  setTitle(title)
                }
                return (
                  <Q.li class="mt-2 " key={to}>
                    {/* TODO: <Q as={Link} /> */}
                    <Link className={clsx("rounded-lg", isActive && "ds-active")} to={to}>
                      {title}
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
