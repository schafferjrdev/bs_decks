import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Home from 'Pages/Home'
import Deck from 'Pages/Deck'
import Cards from 'Pages/Cards'

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/cards">
          <Cards />
        </Route>
        <Route path="/deck">
          <Deck />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}
