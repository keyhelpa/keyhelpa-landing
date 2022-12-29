import React, { useState } from "react";
import {
  Navbar,
  Nav
} from 'react-bootstrap';
import { BasicStyles, Color } from 'common';
import Logo from 'assets/img/logo_icon.png'
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import Colors from 'common/Colors';
import { SvgIcon } from "@mui/material";
import { MenuOutlined } from "@mui/icons-material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons'
import Config from "config";
const {REACT_APP_HOST, REACT_APP_AGENT,REACT_APP_HELPA }=process.env;
const headerHeight = 70
const Header = (props) => {
  const history = useHistory();
  const [ isUserMenuOpen, setUserMenu ] = useState(false)
  const [ isSlider, setSlider ] = useState(false)
  const [ isShow, setShow ] = useState(false)
  const { user } = props.state;
  const navigate = (route) => {
    setShow(false)
    history.push(route)
  }


  const logo = () => {
    return (
      <img src={Logo} style={{
        width: 'auto',
        height: '40px'
      }}
      className="cursor-hover"
      onClick={() => {
        window.location.href = REACT_APP_HOST
      }}
      />
    )
  }


  const left = () =>  (
    <Navbar style={{
      minHeight: '60px',
      overflowY: 'hidden',
    }} expand="lg" className="justify-content-between">
      <Navbar.Brand>
        <img src={Logo} style={{
          width: 'auto',
          height: '40px',
          marginLeft: '50px'
        }}
        onClick={() => {
          window.location.href = REACT_APP_HOST
        }}
        className="brand-on-mobile cursor-href"
        />


        <b style={{
          color: Color.white,
          paddingLeft: 50,
          fontSize: 18
        }}
        className="hide-on-mobile"
        >Agents Looking for Helpas</b>


        <b style={{
          color: Color.white,
          paddingLeft: 50,
          fontSize: 18
        }}
        className="hide-on-mobile"
        >Helpas Looking to Earn</b>
      </Navbar.Brand>
      <Navbar id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Navbar.Brand style={{
            color: Color.white,
            marginRight: 0
          }}
          className="href-link hide-on-mobile"
          onClick={() => {
            navigate('/signin')
          }}
          ><b style={{
            fontSize: 18}}>Members login</b></Navbar.Brand>
          <Navbar.Brand style={{
            color: Color.white,
            marginRight: 50,
            marginLeft: 20
          }}
          className="href-link hide-on-mobile"
          onClick={() => {
            navigate('/signup')
          }}
          ><b style={{fontSize: 18}}>Join us</b></Navbar.Brand>
          <Nav.Link style={{
            color: Color.white,
            paddingLeft: '1rem'
          }}>
          </Nav.Link>
        </Nav>
        <Navbar.Brand
            className="href-link nav-toggle-menu"
            onClick={() => {
              props.toggleMenu()
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: Colors.activeGray,
              paddingLeft: 15,
              paddingRight: 15
            }}
            // className="nav-toggle-menu"
            >
            <SvgIcon
              component={MenuOutlined}
              style={{
                color: Colors.barMenu,
                fontSize: 40
              }}/>
          </Navbar.Brand>
      </Navbar>
    </Navbar>
  )

  const leftMenu = [{
    title: 'Agents Looking for Helpas',
    route: REACT_APP_AGENT
  }, {
    title: 'Helpas Looking to Earn',
    route: REACT_APP_HELPA
  }]

  const rightMenu = [{
    title: 'Members login',
    route: '/signin'
  }, {
    title: 'Join us',
    route: '/signup'
  }]

  const desktopMenu = () => {
    return(
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'space-between',
          height: headerHeight
        }}>
          <div style={{
            width: '50%',
            float: 'left'
          }}>
            <div style={{
              float: 'left',
              display: 'flex',
              height: headerHeight,
              alignItems: 'center',
            }}>
              {
                logo()
              }
            </div>
            <div style={{
              display: 'flex',
              height: headerHeight,
              alignItems: 'center',
              float: 'left'
            }}>
              {
                leftMenu.map((item, index) => (
                  <b style={{
                    color: Color.white,
                    paddingLeft: 50,
                    float: 'left',
                    fontSize: 18
                  }}
                  onClick={() => {
                    window.location.href = item.route
                  }}
                  key={index}
                  className="hide-on-mobile href-link"
                  >
                    {
                      item.title
                    }
                  </b>
                ))
              }
            </div>
          </div>
          <div style={{
            width: '50%',
            float: 'left',
          }}>
            <div style={{
              display: 'flex',
              height: headerHeight,
              alignItems: 'center',
              justifyContent: 'right'
            }}>
              {
                rightMenu.map((item, index) => (
                  <b style={{
                    color: Color.white,
                    paddingLeft: 50,
                    float: 'right',
                    fontSize: 18
                  }}
                  onClick={() => {
                    navigate(item.route)
                  }}
                  key={index}
                  className="hide-on-mobile href-link"
                  >
                    {
                      item.title
                    }
                  </b>
                ))
              }
            </div>
          </div>
      </div>
    )
  }

  const toggleMenu = () => {
    return(
      <div style={{
        display: 'flex',
        alignItems: 'center',
        height: 70
      }}>
        <div
          onClick={() => {
            props.toggleMenu()
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: Colors.activeGray,
            paddingLeft: 15,
            paddingRight: 15,
            height: 50
          }}
          className="href-link"
          >
          <FontAwesomeIcon icon={faBars} color={Colors.primary} className="href-link" size="3x"/>
        </div>
      </div>
    )
  }

  const mobileMenu = () => {
    return(
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'space-between',
          height: headerHeight
        }}>
          {
            logo()
          }
          {
            toggleMenu()
          }
      </div>
    )
  }

  return (
    <div style={{
      height: headerHeight,
      overflowY: 'hidden',
      position: 'fixed',
      width: '100%',
      zIndex: 999999,
      border: 'none'
    }}
    expand="lg" className="justify-content-between padding-lr-50 login-body">
      <div
        style={{
          float: 'left',
          width: '100%'
        }}
        className="hide-on-mobile">
        {
          desktopMenu()
        }
      </div>

      <div
        style={{
          width: '100%',
          float: 'left'
        }}
        className="hide-on-desktop"
        >
        {
          mobileMenu()
        }
      </div>
    </div>
  )
}

  const mapStateToProps = (state) => ({ state: state });

  const mapDispatchToProps = (dispatch) => {
    const { actions } = require('reduxhandler');
    return {
      logout: () => dispatch(actions.logout())
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Header);
