const user = (state = null, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.user;

    case "RESET_USER":
      return null;

    case "FETCH_USER":
      return action.payload;

    case "UPDATE_USER":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default user;
