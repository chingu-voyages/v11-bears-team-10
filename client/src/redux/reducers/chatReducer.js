const chat = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_MESSAGES_LIST":
      return { ...state, messages: { ...action.messages } };
    case "SET_CHAT_USERS":
      return { ...state, userList: [...action.userList] };
    case "UPDATE_MESSAGES_COUNTER":
      return { ...state, newMessagesCounter: {...state.newMessagesCounter, ...action.updateCounter } };
    default:
      return state;
  }
};

export default chat;
