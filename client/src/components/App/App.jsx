import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, Switch } from 'react-router'
import history from 'global/history'
import store from 'global/store.js'

import Home from '../Home/Home.jsx'
import Chat from '../Chat/Chat.jsx'

export default function App () {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/chat' component={Chat} />
        </Switch>
      </Router>
    </Provider>
  )
}
