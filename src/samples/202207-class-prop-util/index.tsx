import { Q } from "~/_common/Q"

export default function Page() {
  return (
    <Q.div class={["a", "b", "c", { isHoge: false, isFuga: true }]}>
      <Q.h2>class-prop-util</Q.h2>

      <Q.div class={["foo", true && "bar", "baz"]}>
        <Q.ul>
          <Q.li class={["foo", 0, false, "bar"]}>hello react-q!</Q.li>
          <Q.li class={{ foo: true, bar: false, "--foobar": "hello" }}>powered by clsx</Q.li>
        </Q.ul>
      </Q.div>
    </Q.div>
  )
}
