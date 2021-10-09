import React from 'react'
import { LinkButton } from 'Components'

const Home = () => {
  return (
    <div className="flex space-x-10 justify-center items-center h-20">
      <LinkButton title="Ver Cartas" route="/cards" />
      <LinkButton title="Criar meus Decks" route="/deck" />
    </div>
  )
}

export default Home
