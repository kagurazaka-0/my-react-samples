import { atom, selector, useRecoilState, useRecoilValue } from "recoil"

export type Todo = {
  title: string
  isDone?: boolean
}

const todoListState = atom<Todo[]>({
  key: "todoListState",
  default: [
    { title: "ひき肉買う" },
    { title: "〇〇さんからのSlack確認する" },
    { title: "〇〇の修正対応する", isDone: true },
  ],
})

export const useTodoListState = () => useRecoilState(todoListState)

const todoListTextState = selector({
  key: "todoListTextState",
  get: ({ get }) => {
    const todoList = get(todoListState)
    const notDoneCount = todoList.filter(({ isDone }) => !isDone).length

    return `未完了: ${notDoneCount}件`
  },
})

export const useTodoListTextStateValue = () => useRecoilValue(todoListTextState)
