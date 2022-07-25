import { classnames } from '@tools/common'
import { useController } from 'react-hook-form'
import type { BaseFieldProps } from '../BaseField'
import BaseField from '../BaseField'

export interface InputProps extends BaseFieldProps {
  inputClassName?: string
  onClick?: () => void
}

const Input = ({
  name,
  control,
  label,
  required,
  onClick,
  className,
  inputClassName,
  ...props
}: InputProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control })

  return (
    <BaseField {...{ label, error: error?.message, required }}>
      <div
        onClick={onClick}
        className={classnames(
          'flex items-center rounded-xsmall border border-ultra-light-grey bg-white',
          {
            'border-b border-b-red text-red': error,
          },
          className,
        )}
      >
        <input
          {...field}
          {...props}
          className={classnames(
            'caret-inherit form-input w-full grow border-0 bg-transparent p-5 text-ultra-dark-grey placeholder:text-grey focus:outline-none focus:ring-0',
            { 'text-red': error },
            inputClassName,
          )}
        />
      </div>
    </BaseField>
  )
}

export default Input
