import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Dots = ({ number }) => {
  const [circles, setCircles] = useState([0, 0, 0])

  useEffect(() => {
    const newCircles = [0, 0, 0]
    for (let i = 0; i < number; i++) {
      newCircles[i] = 1
    }
    setCircles(newCircles)
  }, [number])

  return (
    <div className="flex justify-center space-x-2">
      {circles.map((c, i) => (
        <div
          key={i}
          className={`${
            c ? 'bg-gray-400 ' : ''
          }border-solid border-2 border-gray-400 rounded-full h-4 w-4`}
        ></div>
      ))}
    </div>
  )
}

Dots.propTypes = {
  number: PropTypes.number.isRequired,
}

export default Dots
