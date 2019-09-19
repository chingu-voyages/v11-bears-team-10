import HTTP_ERRORS from "./errors/HTTP_ERRORS";

export function isStorageAvailable(type = "localStorage") {
	var storage;
	try {
		storage = window[type];
		var x = "__storage_test__";
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	} catch (e) {
		return (
			e instanceof DOMException &&
			// everything except Firefox
			(e.code === 22 ||
				// Firefox
				e.code === 1014 ||
				// test name field too, because code might not be present
				// everything except Firefox
				e.name === "QuotaExceededError" ||
				// Firefox
				e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
			// acknowledge QuotaExceededError only if there's something already stored
			(storage && storage.length !== 0)
		);
	}
}

export function getErrorMessage(error) {
	if (!error) return null;

	var error_message = "";
	if (error.statusCode) error_message += error.statusCode + " | ";

	return (
		error_message +
		(error.message ||
			(error.requestTimeout && "request timeout . try refreshing the page") ||
			HTTP_ERRORS[error.statusCode] ||
			"something went wrong try refreshing the page")
	);
}
