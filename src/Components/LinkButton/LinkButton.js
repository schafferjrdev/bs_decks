import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const LinkButton = ({ title, route }) => {
  return (
    <Link
      className="rounded-sm justify-center items-center flex bg-gray-50 w-1/6 h-1/2 text-darker font-bold"
      to={route}
    >
      {title}
    </Link>
  )
}

LinkButton.propTypes = {
  title: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
}

export default LinkButton
