const IS_STORAGE_AVAILABLE = (function(type = "localStorage") {
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
})();

export function isArrayOfStrings(arr) {
	if (!Array.isArray(arr) || !arr.length) return false;

	// eslint-disable-next-line no-unused-vars
	for (const elem of arr) if (!typeof elem === "string") return false;

	return true;
}

export function setLocalStorageItems(object) {
	if (!IS_STORAGE_AVAILABLE) return false;

	if (typeof object === "object")
		// eslint-disable-next-line no-unused-vars
		for (const key in object) localStorage.setItem(key, object[key]);
	else throw Error("parameter passed to setLocalStorageItems must be an object");

	return true;
}

export function removeLocalStorageItems(...keys) {
	if (!IS_STORAGE_AVAILABLE) return false;

	if (isArrayOfStrings(keys))
		// eslint-disable-next-line no-unused-vars
		for (const key of keys) localStorage.removeItem(key);
	else throw Error("parameters passed to removeLocalStorageItems must be strings");

	return true;
}

export function getLocalStorageItems(...keys) {
	if (!IS_STORAGE_AVAILABLE) return {};

	if (!isArrayOfStrings(keys))
		throw Error("parameters passed to getLocalStorageItems must be strings");

	const data = {};
	// eslint-disable-next-line no-unused-vars
	for (const key of keys) data[key] = localStorage.getItem(key);
	return data;
}

export function addClassName(target, className) {
	if (!className) throw Error("invalid class name");

	const element = document.querySelector(target);

	if (!element.className) element.className = className;
	else if (element.className.split(" ").indexOf(className) === -1)
		element.className += " " + className;
}

export function removeClassName(target, className) {
	if (!className) throw Error("invalid class name");

	const element = document.querySelector(target);

	if (element.className) {
		const classList = element.className.split(" ");
		const index = classList.indexOf(className);
		if (index !== -1) {
			classList.splice(index, 1);
			const new_className = classList.join(" ");
			if (new_className) element.className = new_className;
			else element.removeAttribute("class");
		}
	}
}
