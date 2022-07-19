import { atom, selector } from "recoil"

export const countState = atom({
  key: "countState",
  default: 0,
})

export const countPlus1State = selector({
  key: "countPlus1State",
  get: ({ get }) => {
    return get(countState) + 1
  },
})
