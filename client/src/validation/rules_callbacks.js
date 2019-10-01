/* eslint-disable no-control-regex */

// all callbacks must return true if the validation passes, or an error string

export default {
	min: (attribute, value, rule_param) => {
		if ((rule_param = parseInt(rule_param)))
			return value.length >= rule_param || `must have at least ${rule_param} characters`;

		throw Error("the min rule parameter must be a string representing a number");
	},

	max: (attribute, value, rule_param) => {
		if ((rule_param = parseInt(rule_param)))
			return value.length <= rule_param || `must have ${rule_param} characters maximum`;

		throw Error("the max rule parameter must be a string representing a number");
	},

	alphanumeric: (attribute, value) =>
		/^[a-z0-9]+$/i.test(value) || "must contain only alphanumeric characters",

	email: (attribute, value) => {
		return (
			/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.test(
				value
			) || `${attribute} is invalid`
		);
	},

	required: (attribute, value) => !!value || `${attribute} is required`
};
