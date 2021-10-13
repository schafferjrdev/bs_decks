import React, { useState, useEffect } from 'react'
import { Card, Header, DeckItem } from 'Components'
import data_cards from 'data/cards.json'

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
          {finalDeck.map((item, index) => (
            <DeckItem
              key={item.uuid + index}
              item={item}
              onClick={handleRemoveClick}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Deck
