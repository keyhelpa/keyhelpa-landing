import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTachometerAlt, faFile, faCog, faTrash, faUserCircle, faSignOutAlt, faUsers } from '@fortawesome/free-solid-svg-icons'
import { Helper, BasicStyles, Config, Color } from 'common';
import { useHistory, useLocation } from "react-router-dom";
import Colors from "common/Colors";
import { connect } from 'react-redux';
import { SvgIcon } from '@mui/material'
function Sidebar(props) {
  const history = useHistory();
  const [active, setActive] = useState('/dashboard')
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [upperNavigations, setNavigations] = useState(Helper.menuVerified);
  const location = useLocation();

  const [selectedIndex, setSelectedIndex] = useState('');

  useEffect(() => {
    const { user } = props.state;
    if (user) {
      if (location.pathname.includes('settings')) {
        setNavigations(Helper.settingsMenu)
      } else if (location.pathname.includes('jobs/create') || location.pathname.includes('jobs/edit')) {
        setNavigations(Helper.createJobs)
      } else if (user.status == 'ACCOUNT_VERIFIED' || user.status == 'PROFILE_SETUP') {
        setNavigations(Helper.menuVerified)
      } else {
        setNavigations(Helper.ACCOUNT_TYPE == 'Admin' ? Helper.menuVerified : Helper.notVerifiedMenu)
      }
    } else {
      if (Helper.ACCOUNT_TYPE === 'landing') {
        setNavigations(props.loginRightMenu)
      } else {
        setNavigations(Helper.loginMenu)
      }
    }
    setActive(location.pathname)
  })


  const getActiveFlag = (route) => {
    const { user } = props.state;
    if (user == null) return false
    const menus = Helper.notVerifiedMenu.map(item => {
      return item.route
    })

    const activeRouteIndex = menus.indexOf(user.status)
    const currentRouteIndex = menus.indexOf(route)

    return activeRouteIndex > currentRouteIndex ? true : false
  }


  const toggleModalActive = useCallback(
    () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
    [],
  );

  const onSelectedMenu = useCallback((route) => {
    history.push(route)
  }, [])

  const toggleIsLoading = useCallback(
    () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
    [],
  );

  const navigate = (route) => {
    if(route.includes('back')){
      history.goBack()
      return
    }
    if(route.includes('keyhelpa')){
      window.location.href = route
      return
    }
    if (route.includes('setup')) {
      if(getActiveFlag(route)){
        setActive(route)
        history.push(route)
        props.onClick()
      }
    } else {
      if (route == '/logout') {
        props.logout()
      } else {
        setActive(route)
        history.push(route)
      }
      props.onClick()
    }
  }
  const { user } = props.state;

  const renderHeader = () => {
    return (
      <div style={{
        textAlign: 'center',
        paddingTop: 20,
        paddingBottom: 20
      }}>
        <FontAwesomeIcon icon={faUserCircle} color={Colors.primary} size="6x" />
        <p style={{
          fontSize: BasicStyles.fontSize
        }}>
          <b>Hi {user ? user.username : 'John Doe'}!</b>
        </p>
      </div>

    );
  }

  const renderMenu = (items) => {
    return (
      <ul
        style={{
          listStyleType: 'none',
          width: '100%',
          paddingLeft: 0,
          paddingBottom: 0,
          backgroundColor: Colors.backgroundColor
        }}
      >
        {
          location.pathname.includes('jobs/create') && (
            <li style={{
              width: '85%',
              marginLeft: '15%',
              marginBottom: 0,
              paddingLeft: '10px',
              paddingRight: '10px',
              cursor: 'pointer',
              height: 30,
              backgroundColor: Colors.backgroundColor,
              borderRadius: 10,
              marginTop: 50
            }}>
              <b
                style={{
                  marginBottom: 0,
                  fontSize: BasicStyles.fontSize,
                  fontWeight: '600 !important',
                  color: Color.gray
                }}
              >
                Post a job
              </b>
            </li>
          )
        }
        {
          items.map((item, index) => {
            return (
              <li
                key={item.title + index}
                style={{
                  width: '85%',
                  marginLeft: '15%',
                  marginBottom: 0,
                  paddingLeft: '10px',
                  paddingRight: '10px',
                  cursor: 'pointer',
                  height: 50,
                  backgroundColor: active === item.route ? Colors.activeGray : Colors.backgroundColor,
                  color: item.color === null ? (active === item.route ? Colors.menuActive : Colors.gray) : item.color,
                  borderRadius: 10
                }}
                onClick={() => {
                  navigate(item.route, item)
                }}
                className="menu-item"
              >
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    height: 50
                  }}
                >
                  {
                    item.icon && (
                      <div
                        style={{
                          width: '40px'
                        }}
                      >
                        {
                          (item.iconType && item.iconType == 'material') ? (
                            <SvgIcon component={item.icon}
                              style={{
                                fontSize: BasicStyles.iconSize
                              }}
                            />
                          ) : (
                            <FontAwesomeIcon icon={item.icon} size="2x" />
                          )
                        }
                      </div>
                    )
                  }

                  <div style={{
                    width: item.rightIcon ? '80%' : '90%'
                  }}>
                    <b
                      style={{
                        marginBottom: 0,
                        fontSize: BasicStyles.fontSize,
                        fontWeight: '600 !important'
                      }}
                    >{item.title}</b>
                  </div>
                  {
                    getActiveFlag(item.route) && (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          float: 'right',
                          height: 50,
                          width: 50
                        }}
                      >
                        <SvgIcon component={item.rightIcon}
                          style={{
                            fontSize: BasicStyles.iconSize,
                            color: Colors.primary
                          }} />
                      </div>
                    )
                  }

                </div>
              </li>
            )
          })
        }
      </ul>
    )
  }
  return (
    <div
      style={{
        backgroundColor: Colors.backgroundColor
      }}
      className="margin-t-d-50"
    >
      {/*
        renderHeader() 
      */}
      {
        upperNavigations && renderMenu(upperNavigations)
      }
    </div>
  );
}

const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => {
  const { actions } = require('reduxhandler');
  return {
    logout: () => dispatch(actions.logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);