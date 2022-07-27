import { useRecoilState, useRecoilValue } from "recoil"

import { countPlus1State, countState } from "./state/count"

export default function Page() {
  const [count, setCount] = useRecoilState(countState)
  const countPlus1 = useRecoilValue(countPlus1State)

  return (
    <div>
      <h2>recoil-sample/count</h2>
      <p>countState = {count}</p>
      <p>countPlus1State = {countPlus1}</p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={() => setCount((it) => it + 1)}>+1</button>
        <button onClick={() => setCount((it) => it - 1)}>-1</button>
      </div>
    </div>
  )
}
