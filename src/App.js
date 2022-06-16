import logo from './logo.svg';
import './App.css';
import Header from './modules/generic/frames/loginHeader'
import Footer from 'modules/generic/frames/footer.js'
import RouteList from './modules/routes';
import Sidebar from './modules/generic/frames/sidebar';
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
    <div className="App">
      <React.Fragment>
        <Header {...props}
          toggleMenu={() => {
            setShowMenu(!showMenu)
          }}
          showDropdownMenu={() => {
            setIsDropdownMenu(!isDropdownMenu)
          }}
          userType = {localStorage.getItem('user_type')}
          textColor={location.pathname !== '/' ? location.pathname === '/agent' ? Colors.white : Colors.agentGray : Colors.white}
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
          {
            location.pathname !== '/' && (
              <Footer  userType = {localStorage.getItem('user_type')}/>
            )
          }
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
