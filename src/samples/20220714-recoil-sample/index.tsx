import { Link } from "react-router-dom"
import { useRecoilValue } from "recoil"

import { countState } from "./state/count"

export default function Page() {
  const count = useRecoilValue(countState)

  return (
    <div>
      <h2>recoil-sample</h2>
      <p>countState = {count}</p>
      <ul>
        <li>
          <Link to="./count">count</Link>
          <Link to="./todo-list">todo-list</Link>
        </li>
      </ul>
    </div>
  )
}
