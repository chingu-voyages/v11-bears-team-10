import React, { useState } from "react";
import { Nav, NavDropdown, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import logout from "../redux/action_creators/logout";

import Avatar from "../reusable_components/Avatar";

function ProfileSection({ user, logout }) {
	const [isloggingOut, showSpinner] = useState(false);

	const startLoggingOut = () => {
		showSpinner(true);

		// this will unset the user from the state
		// so there's no need to hide the spinner later since this component will be unmounted
		logout();
	};

	return (
		<Nav className="ml-md-auto mt-2 mt-md-0 mr-md-2">
			{isloggingOut && (
				<Spinner
					className="my-auto"
					aria-hidden="true"
					animation="border"
					role="status"
					size="sm">
					<span className="sr-only">Logging out ...</span>
				</Spinner>
			)}

			<Link to="/dashboard" role="image">
				<Avatar />
			</Link>

			<NavDropdown alignRight title={user.username} id="basic-nav-dropdown">
				<NavDropdown.Item as={Link} role="button" to="/dashboard">
					my dashboard
				</NavDropdown.Item>
				<NavDropdown.Divider />
				<NavDropdown.Item onClick={startLoggingOut}>logout</NavDropdown.Item>
			</NavDropdown>
		</Nav>
	);
}

export default connect(
	null,
	{ logout }
)(ProfileSection);
