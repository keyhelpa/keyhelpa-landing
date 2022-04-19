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
  const {rightMenu} = action
  switch (type) {
    case types.SET_SELECTED_USER:
      let userTypes = localStorage.getItem('user_type');
      return {
        ...state,
        selectedUser: userTypes ? userTypes : selectedUser
      }
    case types.SET_RIGHT_MENU:
      console.log(action);
      let userType = localStorage.getItem('user_type');
      if(userType){
        let exist = state.loginRightMenu.filter(item => {return item.title === 'About'})
        if(exist.length > 0){
          state.loginRightMenu[state.loginRightMenu.indexOf(exist[0])] = {
            title: 'About',
            type: 'internal',
            route:  '/' + rightMenu + '/about'
          }
        }else{
          state.loginRightMenu.unshift({
            title: 'About',
            type: 'internal',
            route:  '/' + rightMenu + '/about'
          })
        }
        exist = state.loginRightMenu.filter(items => {return items.title === 'Contact'})
        if(exist.length > 0){
          state.loginRightMenu[state.loginRightMenu.indexOf(exist[0])] = {
            title: 'Contact',
            type: 'internal',
            route: '/' + rightMenu + '/contact'
          }
        }else{
          state.loginRightMenu.unshift({
            title: 'Contact',
            type: 'internal',
            route: '/' + rightMenu + '/contact'
          })
        }
      }
      return {
        ...state,
      }
    default:
      return {...state}
  }
}

export default reducer;
