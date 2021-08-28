import React, { useState } from 'react'
import { IconSearch } from 'Icons'
import { Input, Card } from 'Components'
import data_cards from 'data/cards.json'

const Cards = () => {
  const [search, setSearch] = useState('')
  const [cards, setCards] = useState(data_cards)

  const handleSearch = (e) => {
    setSearch(e.target.value)
    const reg = new RegExp(e.target.value, 'ig')
    const filtered = data_cards.filter((card) => {
      return reg.test(card.data)
    })
    setCards(filtered)
  }
  return (
    <div className="flex flex-col min-h-full sticky top-0 overflow-x-hidden">
      <header className="h-20 z-50 p-4 min-w-full shadow-lg bg-darker">
        <div className="relative">
          <IconSearch />
          <Input value={search} onChange={handleSearch} />
        </div>
      </header>

      <div className="card-container overflow-y-scroll">
        <div className="p-4 grid lg:grid-cols-5 sm:grid-cols-3 gap-4">
          {cards.map((card) => (
            <Card key={card.uuid} data={card} readOnly />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Cards
