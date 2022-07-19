// thanks! https://github.com/chakra-ui/chakra-ui/blob/main/packages/hooks/src/use-boolean.ts
import { useDebugValue, useMemo, useState } from "react"

type InitialState = boolean | (() => boolean)

/**
 * React hook to manage boolean (on - off) states
 *
 * @param initialState the initial boolean state value
 */
export function useBoolean(initialState: InitialState = false) {
  const [value, setValue] = useState(initialState)
  const callbacks = useMemo(
    () => ({
      on: () => setValue(true),
      off: () => setValue(false),
      toggle: () => setValue((prev) => !prev),
    }),
    []
  )

  if (IS_DEV) {
    useDebugValue(value)
  }

  return [value, callbacks] as const
}
