import { ArrowUpIcon } from '@assets/icons'
import { SCROLL_TO_TOP_MIN_HEIGHT } from '@constants/layout'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { classnames } from '@tools/common'
import { useState } from 'react'
import { animateScroll } from 'react-scroll'

export interface ScrollToTopButtonProps {}

export const useScrollToTopButtonVisible = () => {
  const [buttonVisible, setButtonVisible] = useState<boolean>(false)

  useScrollPosition(
    ({ currPos }) => {
      if (currPos.y >= SCROLL_TO_TOP_MIN_HEIGHT) {
        setButtonVisible(true)
      }

      if (currPos.y < SCROLL_TO_TOP_MIN_HEIGHT) {
        setButtonVisible(false)
      }
    },
    [],
    undefined,
    true,
    500,
  )

  return buttonVisible
}

const onClick = () => animateScroll.scrollToTop({ duration: 500, smooth: true })

// eslint-disable-next-line no-empty-pattern
const ScrollToTopButton = ({}: ScrollToTopButtonProps) => {
  const visible = useScrollToTopButtonVisible()

  return (
    <button
      onClick={onClick}
      className={classnames(
        'fixed right-0 bottom-5 z-40 opacity-0 rounded-3xl border border-gray-100 bg-white p-5 shadow-lg transition ease-out duration-700',
        {
          'opacity-0 mr--20': !visible,
          'opacity-100 mr-5 transition ease-in duration-700': visible,
        },
      )}
    >
      <ArrowUpIcon className="fill-black w-[25px] h-[25px] " />
    </button>
  )
}

export default ScrollToTopButton
