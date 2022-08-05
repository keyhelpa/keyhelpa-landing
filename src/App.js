import logo from './logo.svg';
import './App.css';
import Header from './modules/generic/frames/landingHeader'
import Footer from 'modules/generic/frames/footerLanding.js'
import RouteList from './modules/routes';
import Sidebar from './modules/generic/frames/sidebarLanding';
import React, { useState } from 'react';
import { Paper } from '@mui/material';
import { connect } from 'react-redux'
import Colors from 'common/Colors';
import { useLocation } from 'react-router-dom';

function App(props) {
  const {loginRightMenu, loginLeftMenu} = props.state
  const [showMenu, setShowMenu] = useState(false)
  const location  = useLocation();
  return (
    <div className="App" style={{background: location.pathname === '/' || location.pathname.includes('/helpa') ? Colors.helpaBackgroundColor : Colors.agentBackgroundColor}}>
      <React.Fragment>
        <Header {...props}
          toggleMenu={() => {
            setShowMenu(!showMenu)
          }}
          showDropdownMenu={() => {
            setIsDropdownMenu(!isDropdownMenu)
          }}
          userType = {localStorage.getItem('user_type')}
          backgroundColor = {location.pathname === '/' || location.pathname === '/helpa' ? Colors.helpaHeaderBackground : location.pathname === '/agent' ? Colors.agentHeaderBackground : 'inherit'}
          textColor={location.pathname === '/' || location.pathname === '/agent' || location.pathname === '/helpa' ? Colors.white : Colors.gray}
        />
        {
              showMenu && (
                <div style={{
                  float: 'left',
                  width: '100vh'
                }}
                className={"navigation-mobile " + (showMenu ? 'show-menu' : '')}
                >
                  <Sidebar {...props}
                    loginRightMenu = {[...loginLeftMenu, ...loginRightMenu]}
                    onClick={() => {
                      setShowMenu(false)
                    }}
                  />
                </div>
              )
            }
          <RouteList {...props} location={location}/>
          <Footer  
            backgroundColor = {location.pathname === '/' || location.pathname.includes('/helpa') ? Colors.helpaHeaderBackground : Colors.agentHeaderBackground}
            userType = {localStorage.getItem('user_type')}/>
      </React.Fragment>
    </div>
  );
}

const mapStateToProps = (state) => ({state: state});
const mapDispatchToProps = (dispatch) => {
  const {actions} = require('reduxhandler')
  return {
    setRightMenu: () => dispatch(actions.setRightMenu())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
