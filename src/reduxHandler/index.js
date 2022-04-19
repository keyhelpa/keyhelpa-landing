import Config from "config";
const types = {
  SET_SELECTED_USER: 'SET_SELECTED_USER',
  SET_RIGHT_MENU: 'SET_RIGHT_MENU',
  SET_LEFT_MENU: 'SET_LEFT_MENU'
};

export const actions = {
  setSelectedUser: (selectedUser) => {
    return {type: types.SET_SELECTED_USER, selectedUser}
  },
  setRightMenu: (rightMenu) => {
    return {type: types.SET_RIGHT_MENU, rightMenu}
  },
  setLeftMenu: (leftMenu) => {
    return {type: types.SET_LEFT_MENU, leftMenu}
  }
}

const initialState = {
  selectedUser: null,
  loginLeftMenu: [{
    title: 'Agent Looking for Helpa',
    type: 'internal',
    route: '/agent'
  }, {
    title: 'Helpa Looking to Earn',
    type: 'internal',
    route: '/helpa'
  }],
  loginRightMenu: [{
    title: 'Members Login',
    type: 'external',
    route:  Config.HELPA
  }, {
    title: 'Login',
    type: 'external',
    route:  Config.HELPA
  }]
}

const reducer = (state = initialState, action) => {
  const {selectedUser, type} = action
  switch (type) {
    case types.SET_SELECTED_USER:
      console.log(selectedUser);
      return {
        ...state,
        selectedUser: selectedUser
      }
    case types.SET_RIGHT_MENU:
      let userType = localStorage.getItem('user_type');
      if(userType && state.loginRightMenu.length <= 2){
        state.loginRightMenu.unshift({
          title: 'About',
          type: 'internal',
          route:  '/' + userType + '/about'
        })
        state.loginRightMenu.unshift({
          title: 'Contact',
          type: 'internal',
          route: '/' + userType + '/contact'
        })
      }
      return {
        ...state
      }
    default:
      return {...state}
  }
}

export default reducer;
