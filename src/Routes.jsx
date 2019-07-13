import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Presenze from './components/Presenze'
import Studenti from './components/Studenti'

export default function Routes () {
  return (
    <Switch>
      <Route path='/studenti' component={Studenti} />
      <Route path='/presenze' component={Presenze} />
    </Switch>
  )
}
