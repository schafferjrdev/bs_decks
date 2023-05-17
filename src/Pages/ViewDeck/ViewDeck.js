import React, { useState, useEffect } from 'react'
import { Header, Card } from 'Components'
import { base64Decode } from 'utils'
import { useParams } from 'react-router-dom'

const Cards = () => {
  const [search, setSearch] = useState('')
  const [cards, setCards] = useState([])
  const [cardsFilter, setCardsFilter] = useState(cards)
  let { deck, id } = useParams()

  // SAVED DECKS
  useEffect(() => {
    try {
      const deck = base64Decode(id)
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

      setCards(final)
      setCardsFilter(final)
    } catch (error) {
      console.log('No Deck')
    }
  }, [])

  const handleSearch = (e) => {
    const text = e.target.value
    setSearch(text)
    const pattern = text.replace(/[.*+?^${}()|[\]\\]/, '\\$&')
    const reg = new RegExp(pattern, 'ig')
    const f = [...cards]
    const filtered = f.filter((card) => {
      return reg.test(card.data)
    })
    setCardsFilter(filtered)
  }
  return (
    <div className="flex flex-col min-h-full sticky top-0 overflow-x-hidden">
      <Header
        search={search}
        handleSearch={handleSearch}
        title={`Deck ${deck}`}
      />

      <div className="card-container overflow-y-scroll">
        <div className="p-4 grid lg:grid-cols-5 sm:grid-cols-3 gap-4">
          {cardsFilter.map((card) => (
            <Card
              key={card.uuid}
              deckList={cards}
              data={card}
              readOnly
              showDots
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Cards
