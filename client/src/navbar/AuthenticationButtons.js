import React, { Component } from "react";
import { ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class AuthenticationButtons extends Component {
	render() {
		return (
			<ButtonGroup className="ml-md-auto mt-2 mt-md-0">
				<Link to="/register" className="btn btn-outline-primary">
					register
				</Link>
				<Link to="/login" className="btn btn-outline-primary">
					login
				</Link>
			</ButtonGroup>
		);
	}
}
