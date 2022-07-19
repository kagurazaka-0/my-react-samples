import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

// NOTE: jsonは自動補完されないので、reexportすることで補完が効くようにする
export { COLORS } from "./color.json"

const COLOR_STATE = atomWithStorage("my-react-samples#color", "light")

export const useColorState = () => useAtom(COLOR_STATE)
export const useColorStateValue = () => useAtom(COLOR_STATE)[0]
