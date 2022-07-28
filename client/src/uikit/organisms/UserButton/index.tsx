import { Popover } from '@headlessui/react'

export interface UserButtonProps {
  name?: string
  onLogin?: () => void
  onLogout?: () => void
}

const UserButton = ({ name, onLogin, onLogout }: UserButtonProps) => {
  if (onLogin) {
    return (
      <button
        onClick={onLogin}
        className="p-2 lg:px-4 md:mx-2 text-white bg-slate-800 text-center border border-transparent cursor-pointer rounded hover:bg-slate-600 transition-colors duration-300"
      >
        Авторизація
      </button>
    )
  }
  return (
    <Popover className="relative">
      <Popover.Button className="p-2 ring-0 focus:ring-0 border-gray-600 lg:px-4 md:mx-2 text-gray-600 text-center border border-transparent rounded hover:bg-gray-100 hover:text-gray-700 transition-colors duration-300">
        <div className="flex flex-row items-center">
          <p>{name ?? 'User'}</p>
          <p className="ml-1 mt-1 text-[10px]">▼</p>
        </div>
      </Popover.Button>

      <Popover.Panel className="absolute z-10 bg-gray-300 mt-5 rounded-md hover:cursor-pointer">
        <div className="grid grid-cols-2" onClick={onLogout}>
          <div className=" p-3">
            <a >Вихід</a>
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  )
}

export default UserButton
