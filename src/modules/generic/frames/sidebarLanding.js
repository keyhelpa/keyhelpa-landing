import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faFile,
  faCog,
  faTrash,
  faUserCircle,
  faSignOutAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Helper, BasicStyles, Config, Color } from "common";
import { useHistory, useLocation } from "react-router-dom";
import Colors from "common/Colors";
import { connect } from "react-redux";
import { SvgIcon } from "@mui/material";
function Sidebar(props) {
  const history = useHistory();
  const [active, setActive] = useState("/dashboard");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [upperNavigations, setNavigations] = useState(Helper.menuVerified);
  const location = useLocation();

  const [selectedIndex, setSelectedIndex] = useState("");

  useEffect(() => {
    if (Helper.ACCOUNT_TYPE === "landing") {
      setNavigations(props.loginRightMenu);
    } else {
      setNavigations(Helper.loginMenu);
    }
    setActive(location.pathname);
  });

  const getActiveFlag = (route) => {
    const { user } = props.state;
    if (user == null) return false;
    const menus = Helper.notVerifiedMenu.map((item) => {
      return item.route;
    });

    const activeRouteIndex = menus.indexOf(user.status);
    const currentRouteIndex = menus.indexOf(route);
    return activeRouteIndex > currentRouteIndex ? true : false;
  };

  const toggleModalActive = useCallback(
    () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
    []
  );

  const onSelectedMenu = useCallback((route) => {
    history.push(route);
  }, []);

  const toggleIsLoading = useCallback(
    () => setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen),
    []
  );

  const navigate = (item) => {
    const { accountType } = props.state;
    if (
      item.title.toLowerCase().includes("join") ||
      item.title.toLowerCase().includes("login")
    ) {
      Helper.redirect(accountType, item.title);
    } else {
      if (item.route.includes("helpa") || item.route.includes("agent")) {
        props.setAccountType(item.route.includes("helpa") ? "helpa" : "agent");
        setActive(item.route);
        history.push(item.route);
      } else {
        setActive("/" + accountType + item.route);
        history.push("/" + accountType + item.route);
      }
      props.onClick();
      history.go(0);
    }
  };
  const { user } = props.state;

  const renderHeader = () => {
    return (
      <div
        style={{
          textAlign: "center",
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        <FontAwesomeIcon icon={faUserCircle} color={Colors.primary} size="6x" />
        <p
          style={{
            fontSize: BasicStyles.fontSize,
          }}
        >
          <b>Hi {user ? user.username : "John Doe"}!</b>
        </p>
      </div>
    );
  };

  const renderMenu = (items) => {
    return (
      <ul
        style={{
          listStyleType: "none",
          width: "100%",
          paddingLeft: 0,
          paddingBottom: 0,
          marginBottom: 0,
          backgroundColor: history.location.pathname.includes("agent")
            ? Colors.agentHeaderBackground
            : Colors.helpaHeaderBackground,
        }}
      >
        {items.map((item, index) => {
          return (
            <li
              key={item.title + index}
              style={{
                width: "85%",
                marginLeft: "15%",
                marginBottom: 0,
                paddingLeft: "10px",
                paddingRight: "10px",
                cursor: "pointer",
                height: 50,
                borderRadius: 10,
                color: Colors.white,
              }}
              onClick={() => {
                navigate(item);
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  height: 50,
                }}
              >
                {item.icon && (
                  <div
                    style={{
                      width: "40px",
                    }}
                  >
                    {item.iconType && item.iconType === "material" ? (
                      <SvgIcon
                        component={item.icon}
                        style={{
                          fontSize: BasicStyles.iconSize,
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon icon={item.icon} size="2x" />
                    )}
                  </div>
                )}

                <div
                  style={{
                    width: item.rightIcon ? "80%" : "90%",
                  }}
                >
                  <b
                    style={{
                      marginBottom: 0,
                      fontSize: BasicStyles.fontSize,
                      fontWeight: "600 !important",
                    }}
                  >
                    {item.title}
                  </b>
                </div>
                {getActiveFlag(item.route) && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      float: "right",
                      height: 50,
                      width: 50,
                    }}
                  >
                    <SvgIcon
                      component={item.rightIcon}
                      style={{
                        fontSize: BasicStyles.iconSize,
                        color: Colors.primary,
                      }}
                    />
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <div
      style={{
        backgroundColor: history.location.pathname.includes("agent")
          ? Colors.agentHeaderBackground
          : Colors.helpaHeaderBackground,
      }}
      className="margin-t-d-50"
    >
      {/*
        renderHeader() 
      */}
      {upperNavigations && renderMenu(upperNavigations)}
    </div>
  );
}

const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => {
  const { actions } = require("reduxhandler");
  return {
    logout: () => dispatch(actions.logout()),
    setAccountType: (accountType) =>
      dispatch(actions.setAccountType(accountType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
