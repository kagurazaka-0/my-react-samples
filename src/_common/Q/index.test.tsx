import { render } from "@testing-library/react"
import React from "react"
import { describe, it } from "vitest"

import { Q } from "./index"

// TODO: prettier-plugin-organize-imports が Reactを消すのでどうにかする
React

describe("Q/index.tsx", () => {
  it("work class attr", () => {
    const { container } = render(
      <Q.div class={["foo", true && "bar", "baz"]}>
        <Q.ul class="static-class">
          <Q.li class={["foo", 0, false, "bar"]}>hello react-q!</Q.li>
          <Q.li class={{ foo: true, bar: false, "--foobar": "hello" }}>powered by clsx</Q.li>
        </Q.ul>
      </Q.div>
    )

    const [divTag] = container.getElementsByTagName("div")
    const [ulTag] = container.getElementsByTagName("ul")
    const [liTag1, liTag2] = container.getElementsByTagName("li")

    assert(divTag, `"divTag" is undefined.`)
    assert(ulTag, `"ulTag" is undefined.`)
    assert(liTag1, `"liTag1" is undefined.`)
    assert(liTag2, `"liTag2" is undefined.`)

    // <div class="foo bar baz">
    //   <ul>
    //     <li class="foo bar">hello react-q!</li>
    //     <li class="foo --foobar">powered by clsx</li>
    //   </ul>
    // </div>

    expect(divTag.className).eq("foo bar baz")
    expect(ulTag.className).eq("static-class")
    expect(liTag1.className).eq("foo bar")
    expect(liTag2.className).eq("foo --foobar")
  })
})
