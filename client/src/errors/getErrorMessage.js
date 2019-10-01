import HTTP_ERRORS from "./HTTP_ERRORS.json";

export default function getErrorMessage(error) {
	if (!error || typeof error !== "object")
		throw Error(`error must be an object containing  0 or more of these properties :
	message : string
	statusCode : int
	requestTimeout : boolean`);

	return (
		(error.statusCode ? error.statusCode + " | " : "") +
		(error.message ||
			HTTP_ERRORS[error.statusCode] ||
			(error.requestTimeout && "request timeout ! try refreshing the page") ||
			"something went wrong ! try refreshing the page")
	);
}
