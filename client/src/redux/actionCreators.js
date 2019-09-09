export const setUser = (user = null) => ({ type: "SET_USER", user });
export const setError = (message = "something went wrong", statusCode = null) => ({
	type: "SET_ERROR",
	message,
	statusCode
});



