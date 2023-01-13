import Config from "config";
const types = {
  SET_SELECTED_USER: "SET_SELECTED_USER",
  SET_RIGHT_MENU: "SET_RIGHT_MENU",
  SET_LEFT_MENU: "SET_LEFT_MENU",
  SET_COLOR: "SET_COLOR",
  SET_ACCOUNT_TYPE: "SET_ACCOUNT_TYPE",
};
const { REACT_APP_HELPA, REACT_APP_AGENT } = process.env;
export const actions = {
  setSelectedUser: (selectedUser) => {
    return { type: types.SET_SELECTED_USER, selectedUser };
  },
  setRightMenu: (rightMenu) => {
    return { type: types.SET_RIGHT_MENU, rightMenu };
  },
  setLeftMenu: (leftMenu) => {
    return { type: types.SET_LEFT_MENU, leftMenu };
  },
  setColor: (userType) => {
    return { type: types.SET_COLOR, userType };
  },
  setAccountType: (accountType) => {
    return { type: types.SET_ACCOUNT_TYPE, accountType };
  },
};

const initialState = {
  selectedUser: null,
  color: null,
  loginLeftMenu: [
    {
      title: "Agents Looking for Helpas",
      type: "internal",
      route: "/agent",
    },
    {
      title: "Helpas Looking to Earn",
      type: "internal",
      route: "/helpa",
    },
  ],
  loginRightMenu: [
    {
      title: "Guides",
      type: "external",
      route: "/guides",
    },
    {
      title: "Members Login",
      type: "external",
      route: REACT_APP_AGENT,
    },
    {
      title: "Join Us",
      type: "external",
      route: REACT_APP_HELPA,
    },
  ],
  accountType: null,
};

const reducer = (state = initialState, action) => {
  const { selectedUser, type } = action;
  const { rightMenu, userType, accountType } = action;
  let userTypes = localStorage.getItem("user_type");
  switch (type) {
    case types.SET_SELECTED_USER:
      return {
        ...state,
        selectedUser: userTypes ? userTypes : selectedUser,
      };
    case types.SET_RIGHT_MENU:
      // if(userTypes){
      //   let exist = state.loginRightMenu.filter(item => {return item.title === 'About'})
      //   if(exist.length > 0){
      //     state.loginRightMenu[state.loginRightMenu.indexOf(exist[0])] = {
      //       title: 'About',
      //       type: 'internal',
      //       route:  '/' + rightMenu + '/about'
      //     }
      //   }else{
      //     state.loginRightMenu.unshift({
      //       title: 'About',
      //       type: 'internal',
      //       route:  '/' + rightMenu + '/about'
      //     })
      //   }
      //   exist = state.loginRightMenu.filter(items => {return items.title === 'Contact'})
      //   if(exist.length > 0){
      //     state.loginRightMenu[state.loginRightMenu.indexOf(exist[0])] = {
      //       title: 'Contact',
      //       type: 'internal',
      //       route: '/' + rightMenu + '/contact'
      //     }
      //   }else{
      //     state.loginRightMenu.unshift({
      //       title: 'Contact',
      //       type: 'internal',
      //       route: '/' + rightMenu + '/contact'
      //     })
      //   }
      // }
      return {
        ...state,
      };
    case types.SET_COLOR:
      let color = null;
      console.log("<<<<<", userType);
      if (userType === "agent") {
        color = "#59687A";
      } else {
        color = "#f290bb";
      }
      // if(state.selectedUser === 'agent'){
      //   color = '#59687A'
      // }else if(state.selectedUser === 'helpa'){
      //   color = '#f290bb'
      // }else{
      //   if(userTypes){
      //     if(userTypes === 'helpa'){
      //       color = '#f290bb'
      //     }else if(userTypes === 'agent'){
      //       color = '#59687A'
      //     }else{
      //       color = null
      //     }
      //   }
      // }
      return {
        ...state,
        color: color,
      };
    case types.SET_ACCOUNT_TYPE:
      return {
        ...state,
        accountType,
      };
    default:
      return { ...state };
  }
};

export default reducer;
