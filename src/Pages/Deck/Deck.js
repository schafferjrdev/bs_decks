import React, { useState, useEffect } from 'react'
import { Card, Header } from 'Components'
import data_cards from 'data/cards.json'

const CARD_TYPES = {
  Suporte: '#488370',
  Cenário: '#536b82',
  Personagem: '#896063',
  'Habilidade - N/A': '#57595b',
  'Habilidade - {AG}': '#ae7f5e',
  'Habilidade - {AD}': '#009642',
  'Habilidade - {AE}': '#d6ac07',
  'Habilidade - {EL}': '#7f764f',
  'Habilidade - {GE}': '#aab924',
  'Habilidade - {LA}': '#0062a3',
  'Habilidade - {RE}': '#a10b10',
  'Habilidade - {SF}': '#904929',
  'Habilidade - {TC}': '#9b5992',
  'Habilidade - {TE}': '#5a3b85',
  'Habilidade - {VO}': '#6cb4d2',
}

const Deck = () => {
  const [search, setSearch] = useState('')
  const [cards, setCards] = useState(data_cards)
  const [deck, setDeck] = useState([])
  const [finalDeck, setFinalDeck] = useState([])

  const handleSearch = (e) => {
    const text = e.target.value
    setSearch(text)
    const pattern = text.replace(/[.*+?^${}()|[\]\\]/, '\\$&')
    const reg = new RegExp(pattern, 'ig')
    const filtered = data_cards.filter((card) => {
      return reg.test(card.data)
    })
    setCards(filtered)
  }

  const handleClick = (e) => {
    const count = finalDeck.find((item) => item.uuid === e.uuid)?.counts || 0

    if (count < 3 && deck.length < 60) {
      setDeck((prevDeck) => {
        return [...prevDeck, e]
      })
    }
  }

  useEffect(() => {
    let counts = {}
    let list = [...deck]
    list.forEach(
      (e) => (counts[e.uuid] = counts[e.uuid] ? counts[e.uuid] + 1 : 1),
    )

    list.map((e) => ({ ...e, counts: counts[e.uuid] }))
    let final = Object.keys(counts).map((e) => ({
      counts: counts[e],
      ...list.find((a) => a.uuid === e),
    }))

    setFinalDeck(final)
  }, [deck])

  const handleRemoveClick = (uuid) => {
    const new_array = [...deck]
    const index = new_array.findIndex((el) => el.uuid === uuid)
    if (index > -1) {
      new_array.splice(index, 1)
      setDeck(new_array)
    }
  }

  return (
    <div className="flex flex-col min-h-full sticky top-0 overflow-x-hidden">
      <Header search={search} handleSearch={handleSearch} />

      <div className="flex">
        <div className="card-container overflow-y-scroll">
          <div className="p-4 grid lg:grid-cols-5 sm:grid-cols-3 gap-4">
            {cards.map((card) => (
              <Card
                key={card.uuid}
                data={card}
                deckList={finalDeck}
                onCardClick={handleClick}
                onCardRemoveClick={handleRemoveClick}
              />
            ))}
          </div>
        </div>
        <div className="w-2/6 card-container overflow-y-scroll p-4 border-l border-gray-400 border-opacity-20">
          <p className="text-white">{deck.length}/60</p>
          {finalDeck.map((d, i) => (
            <p
              className="text-gray-50 my-2 rounded-md p-2 font-bold flex justify-between items-center cursor-pointer shadow-lg"
              key={d.uuid + i}
              style={{
                textShadow: 'rgb(0 0 0) 0px 1px 3px',
                background: `linear-gradient(90deg, ${
                  CARD_TYPES[d.data.split('\n')[0]]
                } 20%, rgba(207, 130, 155, 0) 70%), url(${d.image}) no-repeat`,
                backgroundSize: '30vmax',
                backgroundPosition: 'left center',
              }}
              onClick={() => handleRemoveClick(d.uuid)}
            >
              <span>{d.data.split('\n')[1]}</span>{' '}
              <span className="bg-darker px-2 border-4 border-double">
                x{d.counts}
              </span>
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Deck
