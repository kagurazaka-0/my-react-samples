import React, { PropsWithChildren, Suspense } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, RouteObject, useRoutes, Link } from "react-router-dom"
import { RecoilRoot } from "recoil"

import baseRoutes from "~react-pages"

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
    </BrowserRouter>
  </React.StrictMode>
)
