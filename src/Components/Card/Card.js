import React from 'react'
import PropTypes from 'prop-types'

const Card = ({ data, readOnly, onCardClick, onCardRemoveClick }) => {
  const handleMouseMove = (e) => {
    let rect = e.target.getBoundingClientRect()
    let x = e.clientX - rect.left //x position within the element.
    let y = e.clientY - rect.top //y position within the element.
    let delta = 20
    let xAxis = (rect.width / 2 - x) / delta
    let yAxis = (rect.height / 2 - y) / delta

    e.target.style.transform = `perspective(${
      window.innerWidth / 2
    }px) scale3d(1.035, 1.035, 1.035) rotateX(${-yAxis}deg) rotateY(${xAxis}deg)`
  }

  const handleMouseEnter = (e) => {
    e.target.style.transition = 'none'
  }

  const handleMouseLeave = (e) => {
    e.target.style.transform = `perspective(${
      window.innerWidth / 2
    }px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`
  }

  return readOnly ? (
    <img
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      src={data.image}
    />
  ) : (
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
      className="cursor-pointer"
    />
  )
}

Card.propTypes = {
  data: PropTypes.object,
  readOnly: PropTypes.bool,
  onCardClick: PropTypes.func,
  onCardRemoveClick: PropTypes.func,
}

export default Card
