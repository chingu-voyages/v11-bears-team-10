import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class AuthenticationButtons extends Component {
	render() {
		return (
			<div className="ml-md-auto">
				<Link to="/register" className="btn btn-dark-purple b mx-2" id="login">
					register
				</Link>

				<Link to="/login" className="btn btn-dark-green mx-2" id="register">
					login
				</Link>
			</div>
		);
	}
}
