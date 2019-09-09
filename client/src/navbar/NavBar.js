import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Navbar, ButtonGroup } from "react-bootstrap";

import ProfileDropdown from "./ProfileDropdown";

import { setUser, setError } from "../redux/actionCreators";

class NavBar extends React.Component {
	logout = () =>
		setTimeout(() => {
			// logout the user and redirect to the home page
			this.props.setUser(null);
			this.props.history.replace("/");

			// show an error message in the main section
			//
			// this.props.setError('unAuthorized',401);
		}, 1000);

	render() {
		return (
			<Navbar
				className="border border-botom-dark flex-column flex-md-row text-center"
				bg="light"
				expand="md"
				sticky="top">
				<div className="d-flex flex-nowrap w-sm-down-100">
					<Link to="/">
						<Navbar.Brand className="mr-auto">Test</Navbar.Brand>
					</Link>
					<Navbar.Toggle aria-controls="navbar-nav-collapse" className="ml-auto mr-2" />
				</div>
				<Navbar.Collapse id="navbar-nav-collapse">
					{this.props.user ? (
						<ProfileDropdown
							className="ml-md-auto mt-2 mt-md-0"
							user={this.props.user}
							logout={this.logout}
						/>
					) : (
						<ButtonGroup className="ml-md-auto mt-2 mt-md-0">
							<Link to="/register" className="btn btn-outline-primary">
								register
							</Link>
							<Link to="/login" className="btn btn-outline-primary">
								login
							</Link>
						</ButtonGroup>
					)}
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default withRouter(
	connect(
		state => ({ user: state.user }),
		{ setUser, setError }
	)(NavBar)
);

//force format