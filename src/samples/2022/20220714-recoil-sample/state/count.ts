import { atom, selector, useRecoilState, useRecoilValue } from "recoil"

const countState = atom({
  key: "countState",
  default: 0,
})

export const useCountState = () => useRecoilState(countState)
export const useCountStateValue = () => useRecoilValue(countState)

export const countPlus1State = selector({
  key: "countPlus1State",
  get: ({ get }) => {
    return get(countState) + 1
  },
})

export const useCountPlus1StateValue = () => useRecoilValue(countPlus1State)
