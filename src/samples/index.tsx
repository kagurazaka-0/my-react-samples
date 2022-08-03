import { Q } from "~/_common/Q"

export default function Page() {
  return (
    <Q.div class="rounded-box h-[calc(100vh-120px)] w-full bg-gradient-to-br from-primary to-secondary text-primary-content center">
      <Q.div class="max-w-md">
        <Q.div class="text-4xl font-bold">Welcome to</Q.div>
        <Q.div class="mt-2 space-x-1 text-3xl font-semibold">
          <Q.span class="text-base-content">My</Q.span>
          <Q.span class="text-secondary-content">React</Q.span>
          <Q.span class="text-base-content">Samples</Q.span>
        </Q.div>
      </Q.div>
    </Q.div>
  )
  // <Q.div class=""></Q.div>
}
