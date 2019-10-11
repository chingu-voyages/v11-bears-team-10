export default function setToastError(error) {
	var content = "something went wrong ! try refreshing the page";

	if (error.response) content = error.response.status + " | " + error.response.statusText;
	else if (error.code === "ECONNABORTED") content = "request timeout ! try refreshing the page";

	return { type: "SET_TOAST_ERROR", content };
}
