import React, { memo, FC, ReactNode } from 'react'
import { IconCaret } from 'vtex.store-icons'
import { useCssHandles } from 'vtex.css-handles'

import { useSliderState } from './SliderContext'

import useKeyboardArrows from '../hooks/useKeyboardArrows'
import { useSliderControls } from '../hooks/useSliderControls'

interface Props {
  custom?: ReactNode
  orientation: 'left' | 'right'
  controls: string
  totalItems: number
  infinite: boolean
}

const CSS_HANDLES = ['sliderLeftArrow', 'sliderRightArrow', 'sliderArrows']

const Arrow: FC<Props> = ({
  custom,
  orientation,
  controls,
  totalItems,
  infinite,
}) => {
  const { currentSlide, slidesPerPage, navigationStep } = useSliderState()
  const { goBack, goForward } = useSliderControls(infinite)

  const handles = useCssHandles(CSS_HANDLES)

  const isLeftEndReach = !(
    currentSlide - (navigationStep ? navigationStep : 1) >=
    0
  )
  const isRightEndReach = !(currentSlide + 1 + slidesPerPage <= totalItems)
  const disabled =
    !infinite &&
    ((orientation === 'left' && isLeftEndReach) ||
      (orientation === 'right' && isRightEndReach))

  useKeyboardArrows(goBack, goForward)

  return (
    <button
      className={`${
        orientation === 'left'
          ? `${handles.sliderLeftArrow} left-1`
          : `${handles.sliderRightArrow} right-1`
      } ${
        handles.sliderArrows
      } absolute ma2 transparent flex items-center justify-center bn outline-0 pointer`}
      style={{ background: 'transparent' }}
      onClick={orientation === 'left' ? goBack : goForward}
      aria-controls={controls}
      aria-label={`${orientation === 'left' ? 'Previous' : 'Next'} Slide`}
      disabled={disabled}
    >
      {custom || <IconCaret size={25} orientation={orientation} thin />}
    </button>
  )
}

export default memo(Arrow)
