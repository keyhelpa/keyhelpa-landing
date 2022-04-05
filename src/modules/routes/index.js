import React from 'react'
import { Switch} from 'react-router-dom';
import Homepage from 'modules/content/index.js'
import Landing from 'modules/landing/index.js'
import About from 'modules/about/index.js'
import Contacts from 'modules/contacts/index.js'
import Route from './route'
function RouteList() {
  return (
    <Switch>
      <Route path="/" exact component={Homepage}></Route>
      <Route path="/agents" exact component={Landing}></Route>
      <Route path="/agent/about" exact component={About}></Route>
      <Route path="/helpa/about" exact component={About}></Route>
      <Route path="/agent/contact" exact component={Contacts}></Route>
      <Route path="/helpa/contact" exact component={Contacts}></Route>
    </Switch>
  )
}

export default RouteList