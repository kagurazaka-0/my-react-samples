import clsx from "clsx"
import { PropsWithChildren, Suspense, useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import { Link, useLocation, useRoutes } from "react-router-dom"
import { RecoilRoot } from "recoil"

import IconGithub from "~icons/ant-design/github-outlined"
import IconList from "~icons/bi/list"
import IconReact from "~icons/simple-icons/react"

import { Q } from "~/_common/Q"
import ROUTES from "~react-pages"

import { SettingModal } from "./SettingModal"
import { useColorStateValue } from "./_common/daisyui/color-state"
import { useTitleState } from "./_common/title-state"
import { getGitHubSourceUrl } from "./_common/utils/getGitHubSourceUrl"
import { ROUTE_INFOS } from "./_constants"

export function App() {
  const routerLocation = useLocation()
  const { pathname } = routerLocation

  const color = useColorStateValue()
  const [title, setTitle] = useTitleState()

  const { register, setValue } = useForm<{ isOpenDrawer: boolean }>()

  const onClickLink = () => {
    setValue("isOpenDrawer", false)
  }

  const currentRouteInfo = useMemo(() => {
    const maybeRouteInfo = ROUTE_INFOS.find((it) => it.isActive(pathname))
    if (!maybeRouteInfo) {
      console.warn("⚠️  404", { pathname })
      return { isNotFound: true as const }
    }
    const sourceUrl =
      maybeRouteInfo.to === "/" ? undefined : getGitHubSourceUrl(`/src/samples/2022/${maybeRouteInfo.to}/index.tsx`)

    return {
      ...maybeRouteInfo,
      isNotFound: false as const,
      sourceUrl,
    }
  }, [pathname])

  useEffect(() => {
    if (currentRouteInfo.isNotFound) {
      return
    }
    const { title } = currentRouteInfo
    setTitle(title)
    document.title = `${title} - my-react-app`
  }, [currentRouteInfo])

  return (
    <Contexts>
      <Q.div data-theme={color} class="ds-drawer">
        <Q.input {...register("isOpenDrawer")} id="toggle-drawer" type="checkbox" class="ds-drawer-toggle" />
        <Q.div class="ds-drawer-content relative ">
          {/* ヘッダー */}
          <Q.div class="sticky top-4 left-0 m-4 mt-0">
            <Q.div class="ds-navbar rounded-box bg-base-100 bg-opacity-60 shadow-xl backdrop-blur">
              <Q.div class="flex-0">
                <Q.label htmlFor="toggle-drawer" class="ds-btn-ghost ds-btn-square ds-btn">
                  <IconList className="h-6 w-6" />
                </Q.label>
              </Q.div>
              <Q.div class="flex-1" />
              <Q.div class="text-center text-xl font-semibold">{title}</Q.div>
              <Q.div class="flex-1" />
              <Q.div class="flex-0 w-12">
                {!currentRouteInfo.isNotFound && currentRouteInfo.sourceUrl && (
                  <Q.a href={currentRouteInfo.sourceUrl} target="_blank" class="ds-btn-ghost ds-btn-square ds-btn">
                    <IconGithub className="h-6 w-6" />
                  </Q.a>
                )}
              </Q.div>
            </Q.div>
          </Q.div>

          {/* ページの内容 */}
          <Q.div class="p-6 pt-4">
            <RouterView />
          </Q.div>
        </Q.div>
        <Q.div class="ds-drawer-side">
          {/* NOTE: スマホでdrawer表示時、右側に表示される薄いグレーのoverlay、onClick時labelの効果によりinputのチェックが外される */}
          <Q.label htmlFor="toggle-drawer" class="ds-drawer-overlay" />
          <Q.div class="w-80 overflow-y-auto bg-base-200 p-4 text-base-content">
            <Q.div class="rounded-box flex h-14 items-center justify-center bg-base-300 text-lg">
              <IconReact className="h-8 w-8 text-primary" />
              <Q.span class="ml-2 space-x-1 font-semibold">
                <Q.span class="text-base-content">My</Q.span>
                <Q.span class="text-primary">React</Q.span>
                <Q.span class="text-base-content">Samples</Q.span>
              </Q.span>
            </Q.div>

            <Q.ul class="ds-menu mt-2">
              {ROUTE_INFOS.map((routeInfo) => {
                const isActive = routeInfo.isActive(pathname)
                return (
                  <Q.li class="mt-2 " key={routeInfo.to}>
                    {/* TODO: <Q as={Link} /> */}
                    <Link
                      className={clsx("rounded-lg", isActive && "ds-active")}
                      to={routeInfo.to}
                      onClick={onClickLink}
                    >
                      {routeInfo.title}
                    </Link>
                  </Q.li>
                )
              })}
            </Q.ul>
          </Q.div>
        </Q.div>
        <SettingModal />
      </Q.div>
    </Contexts>
  )
}

const Contexts = ({ children }: PropsWithChildren) => {
  return <RecoilRoot>{children}</RecoilRoot>
}

const RouterView = () => {
  return <Suspense fallback={<p>Loading...</p>}>{useRoutes(ROUTES)}</Suspense>
}
