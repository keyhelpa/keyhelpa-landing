import React, { useState } from "react";
import {
  Navbar,
  Nav
} from 'react-bootstrap';
import { BasicStyles, Color, Helper } from 'common';
import Logo from 'assets/img/logo_icon.png'
import { connect } from 'react-redux';
import { useHistory, useLocation } from "react-router-dom";
import Colors from 'common/Colors';
import { SvgIcon } from "@mui/material";
import { Help, HistoryRounded, MenuOutlined } from "@mui/icons-material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons'
import Config from "config";
import { useEffect } from "react";
// import 'assets/style/global.scss'
const {REACT_APP_HOST}=process.env;
const headerHeight = 70;
const allowedPath = ['/about_us', '/privacy_policy', '/terms_and_conditions'];
const Header = (props) => {
  const history = useHistory();
  const [isShow, setShow] = useState(false)
  const { loginRightMenu, loginLeftMenu, accountType } = props.state;
  const { setRightMenu } = props;

  const navigate = (route) => {
    const { setColor, setSelectedUser } = props
    setShow(false)
    props.setAccountType(route.includes('agent') ? 'agent' : 'helpa')
    if (Helper.ACCOUNT_TYPE === 'landing') {
      if (setColor) {
        if (route.includes('agent')) {
          setColor('agent')
          setSelectedUser('agent')
          localStorage.setItem('user_type', 'agent')
        } else if (route.includes('helpa')) {
          setColor('helpa')
          setSelectedUser('helpa')
          localStorage.setItem('user_type', 'helpa')
        } else {
          setColor(null)
        }
      }
    }
    history.push(route)
    // history.go(0)
  }

  useEffect(() => {
    if (Helper.ACCOUNT_TYPE === 'landing') {
      const { setRightMenu } = props
      setRightMenu(history.location.pathname.includes('agent') ? 'agent' : 'helpa')
    }
    props.setAccountType(history.location.pathname.includes('agent') ? 'agent' : 'helpa')
  }, [])

  const logo = () => {
    const { setSelectedUser, setColor } = props
    return (
      <img src={Logo} style={{
        width: 'auto',
        height: '40px'
      }}
        className="cursor-hover header-logo"
        onClick={() => {
          if (Helper.ACCOUNT_TYPE === 'landing') {
            navigate('/')
            localStorage.removeItem('user_type')
            setSelectedUser(null)
            setColor(null)
          } else {
            window.location.href = REACT_APP_HOST
          }
          window.scrollTo(0,0)
        }}
      />
    )
  }

  const desktopMenu = () => {
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'space-between',
          height: headerHeight,
          backgroundColor: props.backgroundColor,
        }}>
        <div style={{
          width: '50%',
          float: 'left'
        }}>
	        <div style={{
		        display: 'flex',
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
             Helper.login.leftMenu.map((item, index) => (
                <b style={{
                  color: props.textColor,
                  paddingLeft: 50,
                  float: 'left',
                  fontSize: 18,
                  cursor: 'pointer',
                }}
                  onClick={() => {
                    if (item.type === 'internal') {
                      navigate(item.route)
                    } else {
                      window.location.href = item.route
                    }
                    window.scrollTo(0,0)
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
              Helper.login.rightMenu.map((item, index) => (
                <b style={{
                  color: props.textColor,
                  paddingLeft: 50,
                  float: 'right',
                  fontSize: 18,
                  cursor: 'pointer',
                }}
                  onClick={() => {
                    if (item.type === 'internal') {
                      history.push('/' + accountType + item.route)
                    } else {
                      Helper.redirect(accountType, item.title)
                    }
                    window.scrollTo(0,0)
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
    return (
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
            backgroundColor: accountType === 'agent' ? Colors.agentBackgroundColor : Colors.helpaBackgroundColor,
            paddingLeft: 15,
            paddingRight: 15,
            height: 50
          }}
          className="href-link"
        >
          <FontAwesomeIcon icon={faBars} color={accountType === 'agent' ? Colors.agentDarkGray : Colors.helpaDarkPink} className="href-link" size="2x" />
        </div>
      </div>
    )
  }

  const mobileMenu = () => {
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'space-between',
          height: headerHeight,
          background: props.backgroundColor,
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
      border: 'none',
      background: props.backgroundColor,
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
    logout: () => dispatch(actions.logout()),
    setColor: (type) => dispatch(actions.setColor(type)),
    setSelectedUser: (user) => { dispatch(actions.setSelectedUser(user)) },
    setRightMenu: (type) => dispatch(actions.setRightMenu(type)),
    setAccountType: (accountType) => dispatch(actions.setAccountType(accountType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
