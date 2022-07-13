import React from "react"
import { useRecoilState } from "recoil"

import { countState } from "./state/count"

export default function Page() {
  const [count, setCount] = useRecoilState(countState)

  return (
    <div>
      <h2>recoil-sample/update-count</h2>
      <p>countState = {count}</p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={() => setCount((it) => it + 1)}>+1</button>
        <button onClick={() => setCount((it) => it - 1)}>-1</button>
      </div>
    </div>
  )
}
