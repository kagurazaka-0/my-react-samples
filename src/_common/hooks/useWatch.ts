import { useDebugValue, useEffect, useRef } from "react"

export function useWatch<T>(watchTarget: T, fn: (watchValue: T) => void) {
  const isMountedRef = useRef(false)

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true
      return
    }
    fn(watchTarget)
  }, [watchTarget])

  if (IS_DEV) {
    useDebugValue(watchTarget)
  }
}
