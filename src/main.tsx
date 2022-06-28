import React, { Suspense } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, useRoutes } from "react-router-dom"

import _routes from "~react-pages"

console.log(_routes)

const routes = [..._routes, {}]

const App = () => <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
