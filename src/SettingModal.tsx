import { useForm } from "react-hook-form"

import IconSave from "~icons/ant-design/save-filled"
import IconSetting from "~icons/ant-design/setting"

import { Q } from "~/_common/Q"
import { COLORS, useColorState } from "~/_common/daisyui/color-state"
import { useBoolean } from "~/_common/hooks/useBoolean"

export function SettingModal() {
  const [isOpenModal, { on, off }] = useBoolean()

  const [currentColor, setColor] = useColorState()

  type FormType = {
    color: string
  }
  const { register, handleSubmit, reset, formState } = useForm<FormType>()

  const onClickOpen = () => {
    on()
    reset({ color: currentColor })
  }

  const onSubmit = handleSubmit(({ color }) => {
    setColor(color)
    off()
    // TODO: 保存しましたのトースト
  })

  return (
    <>
      <Q.span class="ds-btn ds-btn-circle fixed bottom-4 right-4 z-[10000] " onClick={onClickOpen}>
        <IconSetting className="h-6 w-6" />
      </Q.span>

      <Q.div class={["ds-modal", isOpenModal && "ds-modal-open"]}>
        <Q.div class="ds-modal-box relative bg-base-300">
          <Q.div class="flex items-center text-lg font-bold">
            <IconSetting className="mr-2 h-[1.4em] w-[1.4em]" />
            <Q.span>設定</Q.span>
          </Q.div>
          <Q.span class="ds-btn ds-btn-circle ds-btn-sm absolute right-4 top-4" onClick={off}>
            ✕
          </Q.span>
          <Q.form class="ds-form-control pt-4" onSubmit={onSubmit}>
            <Q.label class="ds-label">
              <Q.span class="ds-label-text">
                daisyUI テーマ
                {formState.dirtyFields.color && " *"}
              </Q.span>
            </Q.label>
            <Q.select class="ds-select ds-select-bordered" {...register("color")}>
              {COLORS.map((color) => (
                <Q.option key={color} value={color}>
                  {color}
                </Q.option>
              ))}
            </Q.select>
            <Q.div class="mt-6 flex justify-end">
              <Q.button class="ds-btn" type="submit">
                <IconSave className="mr-2 h-[1.4em] w-[1.4em]" />
                保存する
              </Q.button>
            </Q.div>
          </Q.form>
        </Q.div>
      </Q.div>
    </>
  )
}
