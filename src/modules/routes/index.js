import React, { Component } from 'react'
import { Switch } from 'react-router-dom';
import Homepage from 'modules/content/index.js'
import Landing from 'modules/landing/index.js'
import About from 'modules/about/index.js'
import Contacts from 'modules/contacts/index.js'
import Stack from 'modules/generic/page/TermsAndConditions'
import PrivacyPolicy from 'modules/generic/page/PrivacyPolicy'
import PageNotFound from 'modules/generic/page/404'
import Guides from 'modules/guides'
import Route from './route'
import './transition.scss'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Faq from 'modules/faq'

class RouteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevDepth: this.getPathDepth(this.props.location)
    };
  }

  componentWillReceiveProps() {
    this.setState({ prevDepth: this.getPathDepth(this.props.location) });
  }

  getPathDepth(location) {
    let pathArr = location.pathname.split("/");
    pathArr = pathArr.filter(n => n !== "");
    return pathArr.length;
  }

  render() {
    const { location } = this.props;
    const currentKey = location.pathname.split("/")[1] || "/";
    console.log('============', currentKey);
    const timeout = { enter: 200, exit: 400 };
    return (
      <div>
        {/* <TransitionGroup component="div" className="App">
          <CSSTransition
            key={currentKey}
            timeout={timeout}
            classNames="pageSlider"
            mountOnEnter={false}
            unmountOnExit={true}
          >
            <div 
              className={
                this.getPathDepth(location) - this.state.prevDepth >= 0
                  ? "left"
                  : "right"
              }
            >
              <Switch location={location}>
                <Route path="/agent" exact component={Landing}></Route>
                <Route path="/helpa" exact component={Landing}></Route>
              </Switch>
            </div>
          </CSSTransition>
        </TransitionGroup> */}
        <Switch>
          <Route path="/" exact component={Landing}></Route>
          <Route path="/agent" exact component={Landing}></Route>
          <Route path="/helpa" exact component={Landing}></Route>
          <Route path="/agent/faq" exact component={Faq}></Route>
          <Route path="/helpa/faq" exact component={Faq}></Route>
          <Route path="/agent/about" exact component={About}></Route>
          <Route path="/helpa/about" exact component={About}></Route>
          <Route path="/agent/contact_us" exact component={Contacts}></Route>
          <Route path="/helpa/contact_us" exact component={Contacts}></Route>
          <Route path="/agent/terms_and_conditions" exact component={Stack}></Route>
          <Route path="/agent/privacy_policy" exact component={PrivacyPolicy}></Route>
          <Route path="/helpa/terms_and_conditions" exact component={Stack}></Route>
          <Route path="/helpa/privacy_policy" exact component={PrivacyPolicy}></Route>
          <Route path="/helpa/guides/:path?" component={Guides}></Route>
          <Route path="/agent/guides/:path?" component={Guides}></Route>
          <Route path="/guides" exact component={Guides}></Route>
          <Route path="*" component={PageNotFound}></Route>
          {/* {
            localStorage.getItem('user_type') === 'helpa' ? (
              <Route path="/*" exact component={PageNotFound}></Route>
            ) : (
              <Route path="/*" exact component={PageNotFound}></Route>
            )
          } */}
        </Switch>
      </div>
    )
  }
}
export default RouteList