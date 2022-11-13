import { Link } from "react-router-dom"

import { Q } from "~/_common/Q"

import { useCountStateValue } from "./state/count"
import { useTodoListTextStateValue } from "./state/todo-list"

export default function Page() {
  const count = useCountStateValue()
  const todoListText = useTodoListTextStateValue()

  return (
    <Q.div>
      <Q.table class="ds-table w-full border-2">
        <Q.tbody>
          <Q.tr>
            <Q.td>countState</Q.td>
            <Q.td class="text-right">{count}</Q.td>
          </Q.tr>
          <Q.tr>
            <Q.td>todoListTextState</Q.td>
            <Q.td class="text-right">{todoListText}</Q.td>
          </Q.tr>
        </Q.tbody>
      </Q.table>
      <Link className="ds-btn ds-btn-info ds-btn-block mt-4 transition-none" to="./count">
        Count Page
      </Link>
      {/* <Link className="ds-btn ds-btn-info ds-btn-block mt-4 transition-none" to="./todo-list">
        Todo List Page
      </Link> */}
    </Q.div>
  )
}
