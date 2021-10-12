import React from 'react'
import PropTypes from 'prop-types'

import { IconSearch } from 'Icons'
import { Input } from 'Components'
import { Link } from 'react-router-dom'

const Header = ({ search, handleSearch }) => {
  return (
    <header className="h-20 z-50 flex space-x-5 items-center p-4 min-w-full shadow-lg bg-darker">
      <Link className="text-white" to="/">
        Voltar
      </Link>
      <div className="relative flex-1">
        <IconSearch />
        <Input value={search} onChange={handleSearch} />
      </div>
    </header>
  )
}

Header.propTypes = {
  search: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
}

export default Header
