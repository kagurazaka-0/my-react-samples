import React from "react"
import { Link } from "react-router-dom"
import { RecoilRoot, useRecoilValue } from "recoil"

import { countState } from "./state/count"

export default function Page() {
  const count = useRecoilValue(countState)

  return (
    <div>
      <h2>recoil-sample</h2>
      <p>countState = {count}</p>
      <ul>
        <li>
          <Link to="./update-count">update-count</Link>
        </li>
      </ul>
    </div>
  )
}
