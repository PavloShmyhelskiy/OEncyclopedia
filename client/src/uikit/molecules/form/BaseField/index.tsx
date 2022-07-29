import { FC, useRef } from 'react'

export interface BaseFieldProps
  extends Omit<React.HTMLProps<HTMLInputElement>, 'label' | 'onChange'> {
  name: string
  control: any
  onChange?: (...event: any[]) => void
  label?: string | JSX.Element
  className?: string
}

const Label = ({
  label,
  required,
}: Pick<BaseFieldProps, 'label' | 'required'>) => {
  return (
    <div className="mb-2.5 flex lg:mb-5">
      <p className="text-base font-bold">{label}</p>

      {required && <p className="ml-1 text-base font-bold text-pink">*</p>}
    </div>
  )
}

const Error = ({ error, width }: { error?: string; width?: number }) => {
  return (
    <p
      style={{ maxWidth: width }}
      className="absolute text-xs font-medium text-red-600"
    >
      {error}
    </p>
  )
}

const BaseField: FC<Partial<BaseFieldProps & { error: string }>> = ({
  children,
  error,
  label,
  required,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef}>
      {label && <Label {...{ label, required }} />}

      {children}

      <Error {...{ error, width: containerRef.current?.offsetWidth }} />
    </div>
  )
}

export default BaseField
