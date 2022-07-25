import { LogoIcon, LogoUaIcon } from '@assets/icons'
import { classnames } from '@tools/common'
import { UserButton } from '@uikit/organisms'
import { useModals } from '@uikit/organisms/modals'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { navLinks } from '../data'

export interface PageHeaderProps {}

const PageHeader = ({}: PageHeaderProps) => {
  const router = useRouter()

  const { setModal } = useModals()

  const onLogin = () => {
    console.log('fdsfsdf')
    setModal({
      name: 'login',
      props: {
        onClose: () => {},
        onSuccess: () => {},
      },
    })
  }

  return (
    <nav className="bg-white py-2 md:py-4 border-b border-b-gray-100">
      <div className="container px-4 mx-auto md:flex md:items-center">
        <div className="flex justify-between items-center">
          <Link href="/">
            <a className="font-bold text-xl text-indigo-600">
              <LogoUaIcon className="w-16 h-16 logo-hover hover:animate-ping" />
              <LogoIcon className="w-16 h-16 logo-unhover" />
            </a>
          </Link>
          <button
            className="border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden"
            id="navbar-toggle"
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>

        <div
          className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0"
          id="navbar-collapse"
        >
          {navLinks.map(({ link, title }) => (
            <Link href={link}>
              <a
                className={classnames('p-2 lg:px-4 md:mx-2', {
                  'text-gray-600 rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300':
                    router.asPath !== link,
                  'text-white rounded bg-gray-700': router.asPath === link,
                })}
              >
                {title}
              </a>
            </Link>
          ))}

          <UserButton name="User" onLogout={() => {}} onLogin={onLogin} />
        </div>
      </div>
    </nav>
  )
}

export default PageHeader
