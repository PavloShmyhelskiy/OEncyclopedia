import type { WithOptional } from '@tools/common'
import { createContext, FC, ReactNode, useContext, useState } from 'react'
import LoginModal, { LoginModalProps } from './LoginModal'

export type Modal = {
  name: 'login'
  props: WithOptional<LoginModalProps, 'onClose'>
}

export interface ModalsContextProps {
  modal: Modal | null
  setModal: React.Dispatch<React.SetStateAction<Modal | null>>
  isOpened: (name: Modal['name']) => boolean
}

const ModalsContext = createContext<ModalsContextProps>({
  modal: null,
  setModal: () => {},
  isOpened: () => false,
})

export const ModalsContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modal, setModal] = useState<Modal | null>(null)

  const isOpened = (name: Modal['name']) => modal?.name === name

  return (
    <ModalsContext.Provider value={{ modal, setModal, isOpened }}>
      {children}
    </ModalsContext.Provider>
  )
}

export const useModals = () => useContext(ModalsContext)

const Modals = () => {
  const { modal, setModal } = useModals()

  const onModalSuccess = () => {
    const onSuccess = modal!.props.onSuccess!
    setModal(null)
    onSuccess()
  }

  const onSuccess = modal?.props?.onSuccess ? onModalSuccess : undefined

  const onClose = () => {
    const onModalClose = modal!.props?.onClose

    if (onModalClose) {
      setModal(null)
      onModalClose()
      return
    }

    if (!onModalClose) {
      setModal(null)
    }
  }

  if (!modal) {
    return null
  }

  if (modal.name === 'login') {
    return (
      <LoginModal
        {...modal.props}
        onSuccess={onSuccess}
        onClose={onClose}
        visible
      />
    )
  }

  return null
}

export default Modals
