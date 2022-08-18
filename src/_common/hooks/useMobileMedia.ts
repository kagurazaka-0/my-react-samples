import { useEffect, useState } from "react"

// from https://github.com/streamich/react-use/blob/master/src/useMedia.ts
function useMedia(query: string, defaultState: boolean = false) {
  const [state, setState] = useState(defaultState)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (e: MediaQueryListEvent) => {
      setState(e.matches)
    }
    // NOTE:非推奨でvscodeだと下線がひかれるが、addEventListenerに対応していないブラウザが多数あるためやむをえずこうする
    mql.addListener(onChange)

    setState(mql.matches)

    return () => {
      mql.removeListener(onChange)
    }
  }, [query])

  return state
}

export function useMobileMedia(defaultState: boolean = false) {
  return useMedia("(max-width: 768px)", defaultState)
}
