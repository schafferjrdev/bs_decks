import React, { useState, useEffect } from 'react'
import { IconSearch } from 'Icons'
import { Input, Card } from 'Components'
import data_cards from 'data/cards.json'

const Deck = () => {
  const [search, setSearch] = useState('')
  const [cards, setCards] = useState(data_cards)
  const [deck, setDeck] = useState([])
  const [finalDeck, setFinalDeck] = useState([])

  const handleSearch = (e) => {
    setSearch(e.target.value)
    const reg = new RegExp(e.target.value, 'ig')
    const filtered = data_cards.filter((card) => {
      return reg.test(card.data)
    })
    setCards(filtered)
  }

  const handleClick = (e) => {
    setDeck((prevDeck) => {
      return [...prevDeck, e]
    })
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
      <header className="h-20 z-50 p-4 min-w-full shadow-lg bg-darker">
        <div className="relative">
          <IconSearch />
          <Input value={search} onChange={handleSearch} />
        </div>
      </header>

      <div className="flex">
        <div className="card-container overflow-y-scroll">
          <div className="p-4 grid lg:grid-cols-5 sm:grid-cols-3 gap-4">
            {cards.map((card) => (
              <Card
                key={card.uuid}
                data={card}
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
              className="text-gray-50 my-2 rounded-md p-2 font-bold flex justify-between cursor-pointer"
              key={d.uuid + i}
              style={{
                textShadow: 'rgb(0 0 0) 0px 1px 3px',
                background: `linear-gradient(90deg, rgb(0 3 42) 30%, rgba(207, 130, 155, 0) 70%), url(${d.image}) no-repeat`,
                backgroundSize: '25vmax',
                backgroundPosition: 'left center',
              }}
              onClick={() => handleRemoveClick(d.uuid)}
            >
              <span>{d.data.split('\n')[1]}</span> ({d.counts}/3)
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Deck
