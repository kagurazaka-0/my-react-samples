// TODO:ファイルの置く位置を改める(グローバルなstateはまとめる)
import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

// NOTE: jsonは自動補完されないので、reexportすることで補完が効くようにする
export { COLORS } from "./color.json"

const COLOR_STATE = atomWithStorage("my-react-samples#color", "dark")

export function useColorState() {
  return useAtom(COLOR_STATE)
}

export function useColorStateValue() {
  return useAtom(COLOR_STATE)[0]
}
