import Lightbox from 'react-image-lightbox'
import React, { useMemo, useState } from 'react'
import { IconAmplify } from 'Icons'
import PropTypes from 'prop-types'
import { Dots } from 'Components'

const Card = ({
  data,
  deckList = [],
  readOnly,
  onCardClick,
  onCardRemoveClick,
}) => {
  const [amp, setAmp] = useState(false)

  const handleMouseMove = (e) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    if (!isMobile) {
      let rect = e.target.getBoundingClientRect()
      let x = e.clientX - rect.left //x position within the element.
      let y = e.clientY - rect.top //y position within the element.
      let delta = 15
      let xAxis = (rect.width / 2 - x) / delta
      let yAxis = (rect.height / 2 - y) / delta

      e.target.style.transform = `perspective(${
        window.innerWidth / 2
      }px) scale3d(1.035, 1.035, 1.035) rotateX(${-yAxis}deg) rotateY(${xAxis}deg)`
    }
  }

  const handleMouseEnter = (e) => {
    e.target.style.transition = 'none'
  }

  const handleMouseLeave = (e) => {
    e.target.style.transform = `perspective(${
      window.innerWidth / 2
    }px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`
  }

  const classDone = useMemo(
    () =>
      (deckList.find((item) => item.uuid === data.uuid)?.counts || 0) < 3
        ? ''
        : ' opacity-50',
    [deckList],
  )

  const counts = useMemo(
    () => deckList.find((item) => item.uuid === data.uuid)?.counts || 0,
    [deckList],
  )

  const handleAmplify = () => {
    setAmp(true)
  }

  const handleCloseAmplify = () => {
    setAmp(false)
  }

  return (
    <>
      {amp && (
        <Lightbox mainSrc={data.image} onCloseRequest={handleCloseAmplify} />
      )}
      {readOnly ? (
        <div className="relative group">
          <div
            onClick={handleAmplify}
            className="opacity-0 group-hover:opacity-70 rounded-full flex items-center justify-center w-10 h-10 bg-black absolute top-5 right-5 z-50 text-white cursor-pointer"
          >
            <IconAmplify />
          </div>
          <img
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            src={data.image}
            alt={`Card ${data.uuid} from BS`}
          />
        </div>
      ) : (
        <div className="relative group">
          <div
            onClick={handleAmplify}
            className="opacity-0 group-hover:opacity-70 rounded-full flex items-center justify-center w-10 h-10 bg-black absolute top-5 right-5 z-50 text-white cursor-pointer"
          >
            <IconAmplify />
          </div>
          <img
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onClick={() => onCardClick(data)}
            onContextMenu={(e) => {
              e.preventDefault()
              onCardRemoveClick(data.uuid)
            }}
            src={data.image}
            className={`cursor-pointer${classDone}`}
            alt={`Card ${data.uuid} from BS`}
            width="400"
            height="600"
          />
          <Dots number={counts} />
        </div>
      )}
    </>
  )
}

Card.propTypes = {
  data: PropTypes.object,
  deckList: PropTypes.array,
  readOnly: PropTypes.bool,
  onCardClick: PropTypes.func,
  onCardRemoveClick: PropTypes.func,
}

Card.defaultProps = {
  deckList: [],
}

export default Card
