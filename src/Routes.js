import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from 'Pages/Home'
import Deck from 'Pages/Deck'
import Cards from 'Pages/Cards'
import ViewDeck from 'Pages/ViewDeck'

export default function AllRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/cards" element={<Cards />} />
        <Route path="/deck" exact element={<Deck />} />
        <Route path="/deck/:deck/:id" element={<ViewDeck />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}
