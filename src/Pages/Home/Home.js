import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { LinkButton } from 'Components'
import { base64Decode } from 'utils'

const Home = () => {
  const [list, setList] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const l = localStorage.getItem('my-deck-list')
    if (l) {
      setList(JSON.parse(l))
    }

    return () => {
      setList([])
    }
  }, [])

  const editDeck = (i, l) => {
    navigate(`/deck/${i + 1}/${l}`)
  }

  return (
    <div className="flex flex-col">
      <div className="flex space-x-10 h-20 justify-center items-center">
        <LinkButton title="Ver Cartas" route="/cards" />
        <LinkButton title="Criar meus Decks" route="/deck" />
      </div>

      <div className="flex space-x-10 justify-center items-center">
        {list.map((l, i) => (
          <DeckThumb onClick={editDeck} key={i} i={i} l={l} />
        ))}
      </div>
    </div>
  )
}

const DeckThumb = ({ i, l, onClick }) => {
  const deck = base64Decode(l)
  console.log('DECK THUMB', i, deck[0].image)
  return (
    <span
      className="group w-1/4 shadow-lg hover:shadow-2xl border-solid border-gray-500 transition-all border-2 hover:border-t-4 text-white  items-end justify-end flex cursor-pointer"
      onClick={() => onClick(i, l)}
      key={l}
      style={{
        background: `url(${deck[0].image}) no-repeat`,
        backgroundSize: '43vmax',
        backgroundPosition: '62% 30%',
        height: '150px',
      }}
    >
      <span className="transition-all px-4 bg-darker group-hover:bg-white w-full text-right group-hover:text-darker">
        Deck {i + 1}
      </span>
    </span>
  )
}

DeckThumb.propTypes = {
  i: PropTypes.string.isRequired,
  l: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default Home
