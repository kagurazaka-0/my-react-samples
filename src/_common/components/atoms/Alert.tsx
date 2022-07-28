import { PropsWithChildren } from "react"

import IconClose from "~icons/ant-design/close-outlined"
import IconInfo from "~icons/ant-design/info-circle"

import { PropsWithClass, Q } from "~/_common/Q"

type Props = PropsWithClass &
  PropsWithChildren & {
    show?: boolean
    onClose?: () => void
  }

/**
 * @see https://daisyui.com/components/alert/
 */

// TODO: ds-alert-info,ds-alert-success,ds-alert-warning,ds-alert-errorをpropで受け取る
// TODO: iconを動的に切り替える
// TODO: transition 用のprops
export function Alert(props: Props) {
  return (
    <Q.div
      class={[
        props.class,
        "ds-alert ds-alert-sm ds-alert-success select-none shadow-lg transition duration-300",
        !props.show && "-translate-x-[10%] opacity-0",
      ]}
    >
      <Q.div class="text-sm">
        <IconInfo className="h-[1.4em] w-[1.4em] flex-shrink-0 stroke-current" />
        <Q.span>{props.children}</Q.span>
        <Q.span class="ds-btn ds-btn-ghost ds-btn-square ds-btn-sm" onClick={props.onClose}>
          <IconClose />
        </Q.span>
      </Q.div>
    </Q.div>
  )
}
