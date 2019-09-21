import React, { Component } from "react";
import { ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class AuthenticationButtons extends Component {
	render() {
		return (
			<ButtonGroup 
			  className="ml-md-auto"
			>
				<Link to="/register" 
					className="btn btn-outline-primary buttons"
					id="login"
				>
					register
				</Link>
				<Link to="/login" className="btn btn-outline-primary buttons"
				 id="register"
				>
					login
				</Link>
			</ButtonGroup>
		);
	}
}
