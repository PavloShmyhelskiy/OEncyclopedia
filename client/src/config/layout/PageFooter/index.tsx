import Link from 'next/link'
import { navLinks } from '../data'

export interface PageFooterProps {}

const PageFooter = ({}: PageFooterProps) => {
  return (
    <footer className="p-4 shadow md:px-6 md:py-4 bg-gray-800">
      <div className="sm:flex sm:items-center sm:justify-between">
        <Link href="/">
          <a className="flex items-center mb-4 sm:mb-0">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              Енциклопедія
            </span>
          </a>
        </Link>
        <ul className="flex items-center mb-6 text-sm sm:mb-0 text-gray-400">
          {navLinks.map(({ link, title }) => (
            <li className="mr-4 last:mr-20">
              <Link href={link}>
                <a className="hover:underline">{title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <hr className="my-2 sm:mx-auto border-gray-700 lg:my-2" />
      <span className="block text-sm sm:text-center text-gray-400">
        © 2022 Всі права захищено
      </span>
    </footer>
  )
}

export default PageFooter
