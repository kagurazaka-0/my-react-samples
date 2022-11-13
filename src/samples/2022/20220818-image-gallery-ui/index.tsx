import { range } from "lodash-es"
import { PropsWithChildren } from "react"

import { Q } from "~/_common/Q"
import { useMobileMedia } from "~/_common/hooks/useMobileMedia"

export default function Page() {
  const isMobile = useMobileMedia()
  return (
    <MaybeMockupPhone isMobile={isMobile}>
      <Q.div class={[isMobile ? "h-screen" : "h-[528px]", "w-full bg-gradient-to-b from-red-600 to-yellow-500 center"]}>
        <Q.img class="h-40 w-40 rounded-full" src="https://picsum.photos/200/200" alt="" />
        <Q.div class="mt-4 font-serif text-2xl">名前 太郎</Q.div>
      </Q.div>

      <Q.div class="h-[100px] bg-gradient-to-b from-yellow-500 to-transparent" />

      <Q.div class="mt-4 grid w-full grid-cols-3 gap-[2px]">
        {range(30).map((i) => (
          <Q.img key={i} src="https://picsum.photos/300/300" alt="" />
        ))}
      </Q.div>
    </MaybeMockupPhone>
  )
}

type Props = PropsWithChildren & {
  isMobile?: boolean
}

function MaybeMockupPhone(props: Props) {
  if (props.isMobile) {
    return <Q.div class="mt-4">{props.children}</Q.div>
  }

  return (
    <Q.div class="h-custom-screen w-full center">
      <Q.div class="ds-mockup-phone ">
        <Q.div class="ds-camera" />
        <Q.div class="ds-display">
          <Q.div class="ds-artboard ds-artboard-demo ds-phone-1 block overflow-y-auto">{props.children}</Q.div>
        </Q.div>
      </Q.div>
    </Q.div>
  )
}
