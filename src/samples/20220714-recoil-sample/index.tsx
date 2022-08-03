import { Link } from "react-router-dom"
import { useRecoilValue } from "recoil"

import { countState } from "./state/count"

export default function Page() {
  const count = useRecoilValue(countState)

  return (
    <div>
      <table className="ds-table w-full border-2">
        <tbody>
          <tr>
            <td>countState</td>
            <td>{count}</td>
          </tr>
        </tbody>
      </table>
      <Link className="ds-btn ds-btn-info ds-btn-block mt-4 transition-none" to="./count">
        Count Page
      </Link>
      {/* <Link to="./todo-list">todo-list</Link> */}
    </div>
  )
}
