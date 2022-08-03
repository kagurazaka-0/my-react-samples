import { useForm } from "react-hook-form"

import IconClose from "~icons/ant-design/close-outlined"
import IconSetting from "~icons/ant-design/setting"

import { Q } from "~/_common/Q"
import { Alert } from "~/_common/components/atoms/Alert"
import { COLORS, useColorState } from "~/_common/daisyui/color-state"
import { useBoolean } from "~/_common/hooks/useBoolean"
import { useWatch } from "~/_common/hooks/useWatch"

export function SettingModal() {
  const [isOpenModal, { on: openModal, off: closeModal }] = useBoolean()
  const [isSaved, { on: setIsSavedTrue, off: setIsSavedFalse }] = useBoolean()

  const [currentColor, setColor] = useColorState()

  type FormType = {
    color: string
  }
  const { register, reset, watch } = useForm<FormType>({ defaultValues: { color: currentColor } })

  const onClickOpen = async () => {
    reset({ color: currentColor })
    openModal()
  }

  const onClickClose = () => {
    closeModal()
    setIsSavedFalse()
  }

  useWatch(watch("color"), (color) => {
    if (!isOpenModal) {
      return
    }
    setColor(color)
    setIsSavedTrue()
  })

  return (
    <>
      <Q.span class="ds-btn ds-btn-circle fixed bottom-4 right-4 z-50" onClick={onClickOpen}>
        <IconSetting className="h-6 w-6" />
      </Q.span>

      <Q.div class={["ds-modal", isOpenModal && "ds-modal-open"]}>
        <Q.div class="ds-modal-box relative bg-base-300">
          <Q.div class="flex items-center text-lg font-bold">
            <IconSetting className="h-[1.4em] w-[1.4em]" />
            <Q.span class="ml-2">設定</Q.span>
            <Alert show={isSaved} class="ml-4 w-fit" onClose={setIsSavedFalse}>
              保存しました
            </Alert>
          </Q.div>
          <Q.span class="ds-btn ds-btn-circle ds-btn-ghost ds-btn-sm absolute right-4 top-4" onClick={onClickClose}>
            <IconClose />
          </Q.span>
          <Q.form class="ds-form-control py-4">
            <Q.label class="ds-label">
              <Q.span class="ds-label-text">daisyUI テーマ</Q.span>
            </Q.label>
            <Q.select class="ds-select ds-select-bordered" {...register("color")}>
              {COLORS.map((color) => (
                <Q.option key={color} value={color}>
                  {color}
                </Q.option>
              ))}
            </Q.select>
          </Q.form>
        </Q.div>
      </Q.div>
    </>
  )
}
