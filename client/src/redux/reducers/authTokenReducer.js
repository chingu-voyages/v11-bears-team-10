
const authToken = (state = null, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.authToken;

    case "RESET_USER":
      return null;

    default:
      return state;
  }
};

export default authToken;
