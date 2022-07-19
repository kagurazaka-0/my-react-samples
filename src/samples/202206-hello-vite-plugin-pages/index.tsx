// https://github.com/hannoeru/vite-plugin-pages
import React from "react"

const LIST = Array.from({ length: 100 }, (_, i) => i)

export default function Page() {
  return (
    <div>
      <h2>hello-vite-plugin-pages</h2>
      <div className="mt-4 space-y-2">
        {LIST.map((i) => {
          return <div key={i}>{i}</div>
        })}
      </div>
    </div>
  )
}
