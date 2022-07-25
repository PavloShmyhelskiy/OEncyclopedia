import { CloseIcon } from '@assets/icons'
import { classnames } from '@tools/common'

export interface ModalHeaderProps {
  title?: string
  Icon?: JSX.Element
  withBorder?: boolean
  onClose: () => void
}

const ModalHeader = ({
  Icon,
  title,
  withBorder = true,
  onClose,
}: ModalHeaderProps) => {
  return (
    <div
      className={classnames('relative z-50 flex justify-between bg-white', {
        'border-b border-gray-700': withBorder,
      })}
    >
      <div className="flex items-center p-5">
        <div className="shrink-0">{Icon}</div>

        {title && (
          <p className="ml-2.5 text-base font-medium text-gray-700">
            {title}
          </p>
        )}
      </div>

      <button
        className="group h-min self-center rounded-full p-5 focus:outline-none"
        onClick={onClose}
      >
        <CloseIcon className="h-[11px] w-[11px] fill-gray-700 group-active:animate-ping" />
      </button>
    </div>
  )
}

export default ModalHeader
