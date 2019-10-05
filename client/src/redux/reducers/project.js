const project = (state = null, action) => {
  switch (action.type) {
    case "ADD_PROJECT":
      return action.payload;
    case "SET_PROJECT":
      return action.payload;
    case "UPDATE_PROJECT":
      return action.payload;
    case "DELETE_PROJECT":
      return null;
    default:
      return state;
  }
};

export default project;
