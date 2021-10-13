import Lightbox from 'react-image-lightbox'
import React, { useMemo, useState } from 'react'
import { IconAmplify } from 'Icons'
import PropTypes from 'prop-types'
import { Dots } from 'Components'

export const AmplifyButton = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="md:opacity-0 opacity-70 group-hover:opacity-70 rounded-full flex items-center justify-center w-10 h-10 bg-black absolute top-5 right-5 z-50 text-white cursor-pointer"
    >
      <IconAmplify />
    </div>
  )
}

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
      <div className="relative group">
        {!readOnly && <AmplifyButton onClick={handleAmplify} />}
        <img
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onClick={() => {
            if (readOnly) handleAmplify()
            else onCardClick(data)
          }}
          onContextMenu={(e) => {
            e.preventDefault()
            if (!readOnly) onCardRemoveClick(data.uuid)
          }}
          src={data.image}
          className={`cursor-pointer${classDone}`}
          alt={`Card ${data.uuid} from BS`}
          width="400"
          height="600"
        />
        {!readOnly && <Dots number={counts} />}
      </div>
    </>
  )
}

AmplifyButton.propTypes = {
  onClick: PropTypes.func.isRequired,
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
