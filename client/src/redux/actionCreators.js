export const setUser = (user = null) => ({ type: "SET_USER", user });

export const setError = (statusCode = null, message = null, requestTimeout = false) => ({
	type: "SET_ERROR",
	statusCode,
	message,
	requestTimeout
});

export const resetError = () => ({ type: "RESET_ERROR" });
