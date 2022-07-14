import clsx, { ClassValue } from "clsx"
import { createElement, FunctionComponent, ReactElement } from "react"

type PropsWithClass<Props> = Omit<Props, "className"> & {
  class?: Exclude<ClassValue, boolean>
}

type QType = {
  [Key in keyof JSX.IntrinsicElements]: (props: PropsWithClass<JSX.IntrinsicElements[Key]>) => ReactElement
}

type HTMLTag = keyof JSX.IntrinsicElements

const CACHED_Q = new Map<HTMLTag, FunctionComponent>()

/**
 * ```tsx
 * // jsx
 * <Q.div class={["foo", true && "bar", "baz"]}>
 *   <Q.ul>
 *     <Q.li class={["foo", 0, false, "bar"]}>hello react-q!</Q.li>
 *     <Q.li class={{ foo: true, bar: false, "--foobar": "hello" }}>powered by clsx</Q.li>
 *   </Q.ul>
 * </Q.div>
 * ```
 * ↓
 * ```html
 * <!-- rendered html -->
 * <div class="foo bar baz">
 *   <ul>
 *     <li class="foo bar">hello react-q!</li>
 *     <li class="foo --foobar">powered by clsx</li>
 *   </ul>
 * </div>
 * ```
 */
export const Q: QType = new Proxy({} as QType, {
  get(_, propKey: HTMLTag) {
    const maybeCached = CACHED_Q.get(propKey)
    if (maybeCached) return maybeCached

    const Component: FunctionComponent = (props: PropsWithClass<{}>) => {
      const className = props.class ? clsx(props.class) : undefined
      return createElement(propKey, { ...props, className })
    }
    Component.displayName = `Q.${propKey}`
    CACHED_Q.set(propKey, Component)
    return Component
  },
})
