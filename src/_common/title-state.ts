// TODO:ファイルの置く位置を改める(グローバルなstateはまとめる)
import { atom, useAtom } from "jotai"

const TITLE_STATE = atom<string>("")

export function useTitleState() {
  return useAtom(TITLE_STATE)
}
