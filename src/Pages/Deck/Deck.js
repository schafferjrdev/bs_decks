import React, { useState, useEffect } from 'react'
import { Card, Header, DeckItem } from 'Components'
import { IconSave } from 'Icons'
import { base64Encode, base64Decode } from 'utils'
import { useParams } from 'react-router-dom'
import data_cards from 'data/cards.json'

const Deck = () => {
  const [search, setSearch] = useState('')
  const [cards, setCards] = useState(data_cards)
  const [deck, setDeck] = useState([])
  const [finalDeck, setFinalDeck] = useState([])
  let { id } = useParams()

  const handleSearch = (e) => {
    const text = e.target.value
    setSearch(text)
    const pattern = text.replace(/[.*+?^${}()|[\]\\]/, '\\$&')
    const reg = new RegExp(pattern, 'mi')
    const filtered = data_cards.filter((card) => {
      return reg.test(card.data, 'mi')
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

  // SAVED DECKS
  useEffect(() => {
    try {
      const deck = base64Decode(id)
      setDeck(deck)
    } catch (error) {
      console.log('No Deck')
    }
  }, [])

  console.log('DECK', deck)

  const handleRemoveClick = (uuid) => {
    console.log('REMOVE CLICK', uuid)
    const new_array = [...deck]
    const index = new_array.findIndex((el) => el.uuid === uuid)
    if (index > -1) {
      new_array.splice(index, 1)
      setDeck(new_array)
    }
  }

  const saveList = () => {
    const string = JSON.stringify(deck)
    const encoded = base64Encode(string)
    const list = localStorage.getItem('my-deck-list')
    const savingList = list ? [...JSON.parse(list), encoded] : [encoded]
    localStorage.setItem('my-deck-list', JSON.stringify(savingList))
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
                showDots
              />
            ))}
          </div>
        </div>
        <div className="w-2/6 card-container overflow-y-scroll p-4 border-l border-gray-400 border-opacity-20">
          <div className="flex justify-between">
            <p className="text-white">{deck.length}/60</p>
            <button onClick={saveList} className="rounded-sm text-white">
              <IconSave />
            </button>
          </div>
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
