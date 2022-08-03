import { useRecoilState, useRecoilValue } from "recoil"

import { Q } from "~/_common/Q"

import { countPlus1State, countState } from "./state/count"

export default function Page() {
  const [count, setCount] = useRecoilState(countState)
  const countPlus1 = useRecoilValue(countPlus1State)

  return (
    <div>
      <table className="ds-table w-full border-2">
        <tbody>
          <tr>
            <td>countState</td>
            <td>{count}</td>
          </tr>
          <tr>
            <td>countPlus1State</td>
            <td>{countPlus1}</td>
          </tr>
        </tbody>
      </table>
      <Q.div class="mt-4 flex gap-2">
        <Q.button class="ds-btn ds-btn-secondary ds-btn-square flex-1" onClick={() => setCount((it) => it + 1)}>
          +1
        </Q.button>
        <Q.button class="ds-btn ds-btn-info ds-btn-square flex-1" onClick={() => setCount((it) => it - 1)}>
          -1
        </Q.button>
      </Q.div>
    </div>
  )
}
