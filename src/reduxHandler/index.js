const types = {
  SET_SELECTED_USER: 'SET_SELECTED_USER'
};

export const actions = {
  setSelectedUser: (selectedUser) => {
    return {type: types.SET_SELECTED_USER, selectedUser}
  }
}

const initialState = {
  selectedUser: null
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
    default:
      return {...state}
  }
}

export default reducer;
