import HTTP_ERRORS from "./errors/HTTP_ERRORS.json";

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

	var message_to_display = "";
	if (error.statusCode) message_to_display += error.statusCode + " | ";

	return (
		message_to_display +
		(error.message ||
			HTTP_ERRORS[error.statusCode] ||
			(error.requestTimeout && "request timeout ! try refreshing the page") ||
			"something went wrong ! try refreshing the page")
	);
}

export function isArrayOfStrings(arr) {
	if (!Array.isArray(arr) || !arr.length) return false;

	// eslint-disable-next-line no-unused-vars
	for (const elem of arr) if (!typeof elem === "string") return false;

	return true;
}
