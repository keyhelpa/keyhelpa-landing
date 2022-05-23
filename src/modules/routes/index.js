import React from 'react'
import { Switch} from 'react-router-dom';
import Homepage from 'modules/content/index.js'
import Landing from 'modules/landing/index.js'
import About from 'modules/about/index.js'
import Contacts from 'modules/contacts/index.js'
import Stack from 'modules/generic/page/TermsAndConditions'
import PrivacyPolicy from 'modules/generic/page/PrivacyPolicy'
import Route from './route'
function RouteList() {
  return (
    <Switch>
      <Route path="/" exact component={Homepage}></Route>
      <Route path="/agent" exact component={Landing}></Route>
      <Route path="/helpa" exact component={Landing}></Route>
      <Route path="/agent/about" exact component={About}></Route>
      <Route path="/helpa/about" exact component={About}></Route>
      <Route path="/agent/contact" exact component={Contacts}></Route>
      <Route path="/helpa/contact" exact component={Contacts}></Route>
      <Route path="/terms_and_conditions" exact component={Stack}></Route>
      <Route path="/privacy_policy" exact component={PrivacyPolicy}></Route>
    </Switch>
  )
}

export default RouteList