import clsx from "clsx"
import { lazy, PropsWithChildren, Suspense } from "react"
import { useLocation, useRoutes, Link } from "react-router-dom"
import { RecoilRoot } from "recoil"

import { Q } from "~/_common/Q"
import routes from "~react-pages"

import { useColorStateValue } from "./_common/daisyui/color-state"

const DevModal = lazy(() => import("./DevModal"))

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

  return (
    <Contexts>
      <Q.div data-theme={color} class="ds-drawer-mobile ds-drawer ">
        <Q.input id="toggle-drawer" type="checkbox" class="ds-drawer-toggle" />
        <Q.div class="ds-drawer-content ">
          <RouterView />
          {/* <Q.label htmlFor="toggle-drawer" class="ds-btn ds-btn-primary ds-drawer-button lg:hidden">
            Open drawer
          </Q.label> */}
        </Q.div>
        <Q.div class="ds-drawer-side">
          {/* NOTE: スマホでdrawer表示時、右側に表示される薄いグレーのoverlay、onPress時labelの効果によりinputのチェックが外される */}
          <Q.label htmlFor="toggle-drawer" class="ds-drawer-overlay" />
          <Q.ul class="ds-menu w-80 overflow-y-auto bg-base-200 p-4 text-base-content">
            {ROUTE_INFOS.map(({ title, to, path }) => {
              const isActive = path === "/" ? routerLocation.pathname === "/" : routerLocation.pathname.includes(path)

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
        {IS_DEV && <DevModal />}
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
