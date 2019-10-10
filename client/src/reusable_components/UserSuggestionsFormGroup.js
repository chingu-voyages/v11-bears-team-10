import React, { Component } from "react";
import { FormGroup, ListGroup, ListGroupItem, FormLabel, FormControl } from "react-bootstrap";

export default class UserSuggestionsFormGroup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: "",
			suggestions_list: []
		};
	}

	onChange = ({ target: { value } }) =>
		this.setState({
			value,
			suggestions_list: value
				? this.props.usersToPickFrom.filter(user => user.username.includes(value))
				: []
		});

	onFocus = () => this.onChange({ target: { value: this.state.value } });
	onBlur = () => this.setState({ suggestions_list: [] });

	render() {
		var _className =
			"user-suggestions-form-group" +
			(this.props.suggestionsGoingUp ? " suggestions-going-up" : " suggestions-going-down");

		if (this.props.className) _className += " " + this.props.className;

		return (
			<FormGroup controlId={this.props.controlId} className={_className}>
				<FormLabel>{this.props.label}</FormLabel>
				<FormControl
					onBlur={this.onBlur}
					onFocus={this.onFocus}
					onChange={this.onChange}
					value={this.state.value}
					placeholder={this.props.placeholder}
				/>

				{this.props.comment && (
					<small className="text-muted">{this.props.comment}</small>
				)}

				{this.state.suggestions_list.length > 0 && (
					<ListGroup as="ul">
						{this.state.suggestions_list.map(user => (
							<ListGroupItem
								key={"user-suggestion-" + user.username}
								onMouseDown={this.props.onSuggestionClick.bind(this, user)}
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
