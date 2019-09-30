/* eslint-disable no-unused-vars */
import rules_callbacks from "./rules_callbacks";
import { isArrayOfStrings } from "../_helpers";

export default class Validation {
	ruleName_param_delimiter = ":";

	constructor(data, attributes_rules) {
		for (const attribute in data)
			if (!typeof data[attribute] === "string")
				throw Error(`${attribute}'s value must be a string`);

		for (const attribute in attributes_rules) {
			if (typeof attributes_rules[attribute] === "string") {
				this.checkRuleName(attributes_rules[attribute]);
				continue;
			}

			if (isArrayOfStrings(attributes_rules[attribute])) {
				for (const rule of attributes_rules[attribute]) this.checkRuleName(rule);
				continue;
			}

			throw Error(`${attribute}'s rule must be a string or an array of strings`);
		}

		this.data = data;
		this.attributes_rules = attributes_rules;
	}

	checkRuleName(rule) {
		var rule_name = rule.split(this.ruleName_param_delimiter)[0];
		if (!typeof rules_callbacks[rule_name] === "function")
			throw Error(`${rule_name} doesn't exist or its callback is not a function`);
	}

	validateWithRule(attribute, rule) {
		const [rule_name, rule_param] = rule.split(this.ruleName_param_delimiter);

		var result = rules_callbacks[rule_name](attribute, this.data[attribute], rule_param);

		if (result === true) return true;

		if (typeof result === "string" || isArrayOfStrings(result)) {
			this.addErrors(result, attribute);
			return result;
		}

		throw Error(
			`${rule_name}'s callback must return true if the validation passes, a string or an array of strings representing error messages`
		);
	}

	addErrors(_errors, attribute) {
		if (!this.errors) this.errors = {};

		if (!this.errors[attribute]) this.errors[attribute] = [];

		if (typeof _errors === "string") this.errors[attribute].push(_errors);

		if (Array.isArray(_errors)) this.errors[attribute].push(..._errors);
	}

	addValidated(attribute) {
		if (!this.validated) this.validated = {};
		this.validated[attribute] = this.data[attribute];
	}

	validate() {
		for (const attribute in this.data) {
			if (!this.attributes_rules[attribute]) continue;

			if (typeof this.attributes_rules[attribute] === "string")
				this.validateWithRule(attribute, this.attributes_rules[attribute]);
			else
				for (const rule of this.attributes_rules[attribute])
					this.validateWithRule(attribute, rule);

			if (this.errors && !this.errors[attribute]) this.addValidated(attribute);
		}
	}

	get passes() {
		return !this.errors;
	}
}
