const usersList = (state = [], action) => {
  console.log('action.payload =', action.payload)
  switch(action.type){
    case 'SET_USERS':
      return action.payload
    default:
      return state
  }
}

export default usersList
