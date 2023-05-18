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

      <div className="h-screen w-screen flex space-x-10 justify-center items-start">
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
      className="rounded-lg h-36 w-1/4 items-end justify-end flex cursor-pointer hover:opacity-80"
      onClick={() => onClick(i, l)}
      key={l}
      style={{
        background: `url(${deck[0].image}) no-repeat`,
        backgroundSize: '43vmax',
        backgroundPosition: '62% 30%',
      }}
    >
      <span className="rounded-b-lg px-4 w-full text-darker bg-gray-200 text-right">
        Deck {i + 1}
      </span>
    </span>
  )
}

DeckThumb.propTypes = {
  i: PropTypes.number.isRequired,
  l: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default Home
