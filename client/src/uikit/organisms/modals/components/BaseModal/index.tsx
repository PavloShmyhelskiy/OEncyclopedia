import { Dialog, Transition } from '@headlessui/react'
import { classnames } from '@tools/common'
import { FC, Fragment, ReactNode } from 'react'
import type { ModalHeaderProps } from '../Header'
import Header from '../Header'

export interface BaseModalProps {
  children?: ReactNode
  header?: Omit<ModalHeaderProps, 'onClose'>
  visible?: boolean
  fullScreen?: boolean
  onClose: () => void
  onSuccess?: () => void
  className?: string
  containerClassName?: string
  dialogClassName?: string
}

const BaseModal: FC<BaseModalProps> = ({
  header,
  visible = false,
  onClose,
  children,
  className,
  containerClassName,
  dialogClassName,
}) => {
  return (
    <>
      <Transition appear show={visible} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 bg-black bg-opacity-25"
          onClose={onClose}
        >
          <div
            className={classnames(
              'absolute flex min-h-full w-full items-center justify-center p-2.5',
              dialogClassName,
            )}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 blur-sm" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className={classnames(
                  'h-full w-full max-w-full transform overflow-hidden rounded-lg bg-white align-middle shadow-xl transition-all md:max-w-md lg:h-fit',
                  containerClassName,
                )}
              >
                {header && <Header {...header} onClose={onClose} />}

                <div
                  className={classnames(
                    'max-h-[calc(100%-65px)] min-w-full overflow-y-auto',
                    className,
                  )}
                >
                  {children}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default BaseModal
