var IS_STORAGE_AVAILABLE = null;

export function isStorageAvailable(type = "localStorage") {
	if (IS_STORAGE_AVAILABLE !== null) return IS_STORAGE_AVAILABLE;

	var storage;
	try {
		storage = window[type];
		var x = "__storage_test__";
		storage.setItem(x, x);
		storage.removeItem(x);
		IS_STORAGE_AVAILABLE = true;
	} catch (e) {
		IS_STORAGE_AVAILABLE =
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
			(storage && storage.length !== 0);
	}

	return IS_STORAGE_AVAILABLE;
}

export function isArrayOfStrings(arr) {
	if (!Array.isArray(arr) || !arr.length) return false;

	// eslint-disable-next-line no-unused-vars
	for (const elem of arr) if (!typeof elem === "string") return false;

	return true;
}

export function setLocalStorageItems(object) {
	if (!isStorageAvailable()) return false;

	if (typeof object === "object")
		// eslint-disable-next-line no-unused-vars
		for (const key in object) localStorage.setItem(key, object[key]);
	else throw Error("parameter passed to setLocalStorageItems must be an object");

	return true;
}

export function removeLocalStorageItems(...keys) {
	if (!isStorageAvailable()) return false;

	if (isArrayOfStrings(keys))
		// eslint-disable-next-line no-unused-vars
		for (const key of keys) localStorage.removeItem(key);
	else throw Error("parameters passed to removeLocalStorageItems must be strings");

	return true;
}

export function getLocalStorageItems(...keys) {
	if (!isStorageAvailable()) return {};

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

function validateDay(year, month, day) {
	if (day < 1) return false;

	switch (month) {
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12:
			if (day > 31) return false;
			break;

		case 4:
		case 6:
		case 9:
		case 11:
			if (day > 30) return false;
			break;

		case 2:
			if ((year % 4 > 0 && day > 28) || (year % 4 === 0 && day > 29)) return false;
			break;

		default:
			return false;
	}
	return true;
}

export default function validateDate(date) {
	if (!date) return false;

	var segments = date.split("-");
	var year = 0;
	var month = 0;

	for (let i = 0; i < 3; i++) {
		if (!segments[i]) return false;

		if (i === 0) {
			if (!/^[0-9]{4}$/.test(segments[i])) return false;
			else year = parseInt(segments[i]);
		}

		if (i === 1) {
			if (!/^[0-9]{2}$/.test(segments[i])) return false;

			month = parseInt(segments[i]);

			if (month < 1 || month > 12) return false;
		}

		if (
			i === 2 &&
			(!/^[0-9]{2}$/.test(segments[i]) || !validateDay(year, month, parseInt(segments[i])))
		)
			return false;
	}

	return true;
}
