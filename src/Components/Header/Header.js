import React from 'react'
import PropTypes from 'prop-types'
import { IconSearch, IconBack, IconTrash } from 'Icons'
import { Input } from 'Components'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'

const Header = ({ search, handleSearch, title }) => {
  const navigate = useNavigate()
  let { deck } = useParams()

  const deleteDeck = () => {
    const indexToRemove = deck - 1
    const list = [...JSON.parse(localStorage.getItem('my-deck-list'))]
    list.splice(indexToRemove, 1)
    console.log(list)
    localStorage.setItem('my-deck-list', JSON.stringify(list))
    navigate('/')
  }

  return (
    <header className="h-20 z-50 flex space-x-5 items-center p-4 min-w-full shadow-lg bg-darker">
      <div className="flex-col">
        <Link className="text-white text-xs flex gap-1" to="/">
          <IconBack />
          Voltar
        </Link>
        {deck && <h1 className="border-t my-2 text-white text-xl">{title}</h1>}
      </div>

      <div className="relative flex-1">
        <IconSearch />
        <Input value={search} onChange={handleSearch} />
      </div>
      {deck && (
        <button onClick={deleteDeck} className="rounded-sm text-white">
          <IconTrash />
        </button>
      )}
    </header>
  )
}

Header.propTypes = {
  search: PropTypes.string.isRequired,
  title: PropTypes.string,
  handleSearch: PropTypes.func.isRequired,
}

export default Header
