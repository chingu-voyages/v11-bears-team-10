import React, { Component } from "react";
import { FormGroup, ListGroup, ListGroupItem, FormLabel, FormControl } from "react-bootstrap";

export default class UserSuggestionsFormGroup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: "",
			suggestions_list: [],
			activeSuggestionIndex: -1
		};
	}

	onChange = ({ target: { value } }) =>
		this.setState({
			activeSuggestionIndex: -1,
			value,
			suggestions_list: value
				? this.props.usersToPickFrom.filter(user => user.username.includes(value))
				: []
		});

	onFocus = () => this.onChange({ target: { value: this.state.value } });
	onBlur = () => this.setState({ suggestions_list: [], activeSuggestionIndex: -1 });

	onSuggestionSelect = (user, e) => {
		if (!e) this.onBlur();

		this.props.onSuggestionSelect(user);
	};

	onKeyDown = ({ code, key }) => {
		var _keyCode = key || code;

		if (!this.state.suggestions_list.length) return;

		switch (_keyCode) {
			case "Enter":
				if (this.state.activeSuggestionIndex === -1) return;
				this.onSuggestionSelect(
					this.state.suggestions_list[this.state.activeSuggestionIndex]
				);
				break;

			case "ArrowDown":
				this.setState(prevState => ({
					activeSuggestionIndex:
						prevState.activeSuggestionIndex > prevState.suggestions_list.length - 2
							? 0
							: prevState.activeSuggestionIndex + 1
				}));
				break;

			case "ArrowUp":
				this.setState(prevState => ({
					activeSuggestionIndex:
						prevState.activeSuggestionIndex < 1
							? prevState.suggestions_list.length - 1
							: prevState.activeSuggestionIndex - 1
				}));
				break;

			default:
				break;
		}
	};

	render() {
		var _className =
			"user-suggestions-form-group" +
			(this.props.suggestionsGoingUp ? " suggestions-going-up" : " suggestions-going-down");

		if (this.props.className) _className += " " + this.props.className;

		return (
			<FormGroup controlId={this.props.controlId} className={_className}>
				<FormLabel className={this.props.labelClassName}>{this.props.label}</FormLabel>
				<FormControl
					onBlur={this.onBlur}
					onFocus={this.onFocus}
					onKeyDown={this.onKeyDown}
					onChange={this.onChange}
					value={this.state.value}
					placeholder={this.props.placeholder}
				/>

				{this.props.comment && <small className="text-muted">{this.props.comment}</small>}

				{this.state.suggestions_list.length > 0 && (
					<ListGroup as="ul">
						{this.state.suggestions_list.map((user, index) => (
							<ListGroupItem
								className={
									index === this.state.activeSuggestionIndex
										? "active-suggestion"
										: undefined
								}
								key={"user-suggestion-" + user.username}
								onMouseDown={this.onSuggestionSelect.bind(this, user)}
								as="li">
								{user.username}
							</ListGroupItem>
						))}
					</ListGroup>
				)}
			</FormGroup>
		);
	}
}
