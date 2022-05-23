import logo from './logo.svg';
import './App.css';
import Header from './modules/generic/frames/loginHeader'
import RouteList from './modules/routes';
import React, { useState } from 'react';
import { Paper } from '@mui/material';
import { connect } from 'react-redux'

function App(props) {
  const {loginRightMenu} = props.state
  const [showMenu, setShowMenu] = useState(false)
  console.log('===', loginRightMenu);
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
        />
          <RouteList/>
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
