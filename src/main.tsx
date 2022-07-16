import React, { PropsWithChildren, Suspense } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, RouteObject, useRoutes, Link } from "react-router-dom"
import { RecoilRoot } from "recoil"

import "~/init-tailwind.css"
import baseRoutes from "~react-pages"

import { Q } from "./_common/Q"

const routes = [
  ...baseRoutes,
  {
    path: "/",
    element: (
      <div>
        <h2>my-react-samples</h2>
        <ul>
          {baseRoutes.map(({ path }) => {
            const title = path?.replace(/^\d{6}-/, "")
            return (
              <li key={path}>
                <Link to={`/${path}`}>{title}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    ),
  } as RouteObject,
]

const Contexts = ({ children }: PropsWithChildren) => {
  return <RecoilRoot>{children}</RecoilRoot>
}

const App = () => {
  return (
    <Contexts>
      <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>
    </Contexts>
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.VITE_BASEURL}>
      <App />
      <Q.div class="ds-modal ds-modal-open">
        <Q.div class="ds-modal-box">
          <Q.h3 class="font-bold text-lg">Congratulations random Internet user!</Q.h3>
          <Q.p class="py-4">
            You've been selected for a chance to get one year of subscription to use Wikipedia for free!
          </Q.p>
          <Q.div class="ds-modal-action">
            <Q.label htmlFor="my-modal" class="ds-btn">
              Yay!
            </Q.label>
          </Q.div>
        </Q.div>
      </Q.div>
    </BrowserRouter>
  </React.StrictMode>
)
