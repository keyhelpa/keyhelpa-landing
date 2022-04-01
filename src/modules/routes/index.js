import React from 'react'
import { Switch} from 'react-router-dom';
import Homepage from 'modules/content/index.js'
import Landing from 'modules/landing/index.js'
import Route from './route'
function RouteList() {
  return (
    <Switch>
      <Route path="/" exact component={Homepage}></Route>
      <Route path="/agents" exact component={Landing}></Route>
    </Switch>
  )
}

export default RouteList