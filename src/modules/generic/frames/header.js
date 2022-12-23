import React, { useState, useEffect, useCallback } from "react";
import Colors from 'common/Colors';
import Logo from 'assets/img/logo_icon.png'
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCaretSquareDown, faSearch } from '@fortawesome/free-solid-svg-icons'
import ProfilePicture from 'modules/generic/card/profilePicture'
import { SvgIcon } from '@mui/material';
import { ChatBubbleOutline, Close, NotificationsNone, SearchOutlined, Tune } from "@mui/icons-material";
import { BasicStyles, Helper } from "common";
import TextInput from "components/increment/generic/form/TextInput"
import Config from 'config'
import Filter from 'modules/generic/modal/Filter'
import { param } from "jquery";
const {REACT_APP_HOST}=process.env;

const headerHeight = 70
const Header = (props) => {
  const history = useHistory();
  const [isShow, setShow] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const [otherMenuActive, setOtherMenuActive] = useState(null)
  const [showFilter, setShowFilter] = useState(false)
  const { filter } = props.state;

  useEffect(() => {
    if (filter && filter.search) {
      setSearchValue(filter.search)
    }
  }, [filter])
  const navigate = (route) => {
    history.push(route)
  }
  const { user } = props.state;

  const displayText = (firstName, lastName = null) => {
    let response = ''
    if (lastName) {
      let rLastName = lastName.charAt(0).toUpperCase() + lastName.substr(1).toLowerCase()
      response = firstName.charAt(0).toUpperCase() + firstName.substr(1).toLowerCase() + ' ' + rLastName
    }
    return response
  }

  const otherMenuHandler = (menu) => {
    if (otherMenuActive === menu) {
      setOtherMenuActive(null)
    } else {
      setOtherMenuActive(menu)
    }
  }

  const userProfile = (view) => {
    return (
      <div
        className="href-link"
        onClick={() => {
          props.showDropdownMenu()
        }}
        style={{
          float: 'left'
        }}
        key={'dropdown1'}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          height: headerHeight
        }}>
          <div style={{
            float: "left"
          }}>
            <ProfilePicture
              size={50}
              iconSize={'lg'}
              data={user?.profile}
            />
          </div>

          {
            view === 'desktop' && (
              <b style={{
                paddingLeft: 10,
                color: Colors.headerText,
                float: 'left'
              }}>
                {user && user.information ? displayText(user.information.first_name, user.information.last_name) : 'John Doe'}
              </b>
            )
          }

          {
            view === 'desktop' && (
              <span style={{
                paddingLeft: 10,
                color: Colors.headerText,
                float: 'left'
              }}>

                <FontAwesomeIcon icon={faCaretSquareDown} color={Colors.primary} className="href-link" size="lg" />
              </span>
            )
          }

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
            backgroundColor: Colors.activeGray,
            paddingLeft: 15,
            paddingRight: 15,
            height: 50
          }}
          className="href-link"
        >
          <FontAwesomeIcon icon={faBars} color={Colors.primary} className="href-link" size="2x" />
        </div>
      </div>
    )
  }

  const logo = () => {
    return (
      <img src={Logo} style={{
        width: 'auto',
        height: '40px'
      }}
        className="cursor-href header-logo"
        onClick={() => {
          window.location.href = `${REACT_APP_HOST}`
        }}
      />
    )
  }

  const search = () => {
    return (
      <div
        className="href-link"
        onClick={() => {
          otherMenuHandler('/search')
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          width: 40,
          height: headerHeight
        }}
      >
        <SvgIcon
          component={SearchOutlined}
          style={{
            fontSize: BasicStyles.headerIconSize,
            color: otherMenuActive === '/search' ? Colors.primary : Colors.headerIconColor
          }}
          classes="href-link"
        ></SvgIcon>
      </div>
    )
  }

  const searchInput = (device) => {
    return (
      <div style={{
        float: 'left'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          height: headerHeight
        }}>
          <TextInput
            placeholder={'Search for ' + (Helper.ACCOUNT_TYPE === 'Agent' ? 'candidates' : 'jobs')}
            type={"text"}
            style={{
              background: 'transparent',
              marginLeft: '10%',
              float: 'left'
            }}
            value={searchValue}
            onChange={(params, error) => {
              setSearchValue(params)
            }}
            enterEnable={true}
            onEnter={() => {
              props.setFilter({
                ...props.state.filter,
                search: searchValue
              })
              setTimeout(() => {
                window.location.reload()
              }, 100)
            }}
            onClickLeftIcon={() => {
              props.setFilter({
                ...props.state.filter,
                search: searchValue
              })
              setTimeout(() => {
                window.location.reload()
              }, 100)
            }}
            iconLeft={faSearch}
            iconStyle={Colors.gray}
            validation={{
              type: 'text_without_space',
              size: 0,
              column: 'Region'
            }}
          />

          <SvgIcon component={Tune}
            style={{
              fontSize: BasicStyles.iconSize
            }}
            className="cursor-hover"
            onClick={() => {
              setShowFilter(true)
            }}
          />

          <SvgIcon component={Close}
            style={{
              fontSize: BasicStyles.iconSize
            }}
            onClick={() => {
              setOtherMenuActive(null)
            }}
            className="hide-on-desktop"
          />
        </div>
      </div>
    )
  }

  const notification = () => {
    return (
      <div style={{
        float: 'left'
      }}>
        <div
          className="href-link mr-40-no-mobile"
          onClick={() => {
            navigate('/notifications')
            otherMenuHandler('/notifications')
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            height: headerHeight
          }}
        >
          <SvgIcon
            component={NotificationsNone}
            style={{
              fontSize: BasicStyles.headerIconSize,
              color: otherMenuActive === '/notifications' ? Colors.primary : Colors.headerIconColor
            }}
            classes="href-link"
          ></SvgIcon>
        </div>
      </div>
    )
  }

  const message = () => {
    return (
      <div style={{
        float: 'left'
      }}>
        <div
          className="href-link mr-40-no-mobile"
          onClick={() => {
            navigate('/messages')
            otherMenuHandler('/messages')
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            height: headerHeight
          }}
        >
          <SvgIcon
            component={ChatBubbleOutline}
            style={{
              fontSize: BasicStyles.headerIconSize,
              color: otherMenuActive === '/messages' ? Colors.primary : Colors.headerIconColor
            }}
            classes="href-link"
          ></SvgIcon>
        </div>
      </div>
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
          height: headerHeight
        }}>
        <div style={{
          width: '15%'
        }}>
          {
            logo()
          }
        </div>
        <div style={{
          width: '85%',
          justifyContent: 'space-between',
          display: 'flex'
        }}>
          <div>
            {
              (history.location.pathname === '/works' || history.location.pathname === '/candidates') && searchInput('desktop')
            }
          </div>
          <div style={{
          }}>
            {
              user && user.status.toLowerCase() === 'account_verified' && message()
            }
            {
              user && user.status.toLowerCase() === 'account_verified' &&  notification()
            }
            {
              userProfile('desktop')
            }
          </div>
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
          height: headerHeight
        }}>
        {
          logo()
        }
        {
          (history.location.pathname === '/works' || history.location.pathname === '/candidates') && otherMenuActive === '/search' && searchInput('mobile')
        }
        {
          (history.location.pathname === '/works' || history.location.pathname === '/candidates') && otherMenuActive !== '/search' && search()
        }
        {
          user && user.status.toLowerCase() === 'account_verified' && otherMenuActive !== '/search' && message()
        }
        {
          user && user.status.toLowerCase() === 'account_verified' && otherMenuActive !== '/search' && notification()
        }

        {
          userProfile('mobile')
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
      backgroundColor: Colors.backgroundColor,
      position: 'fixed',
      width: '100%',
      zIndex: 1000,
      borderBottom: 'solid 1px ' + Colors.activeGray
    }} expand="lg" className="justify-content-between padding-lr-50">
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
      {
        showFilter && (
          <Filter
            show={true}
            onCancel={() => {
              setShowFilter(false)
            }}
            onClick={(params) => {

            }}
          />
        )
      }
    </div>
  )
}

const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => {
  const { actions } = require('reduxhandler');
  return {
    setNavigationActive: (flag) => dispatch(actions.setNavigationActive(flag))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
