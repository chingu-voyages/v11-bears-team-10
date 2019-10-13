import React, { useState } from "react";
import { Nav, NavDropdown, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import logout from "../../redux/action_creators/logout";
import { chatDisconnect } from '../../redux/action_creators/chatAction'

import Avatar from "../../reusable_components/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProfileSection({ user, logout }) {
	const [isloggingOut, showSpinner] = useState(false);

	const startLoggingOut = () => {
		showSpinner(true);

		// this will unset the user from the state
		// so there's no need to hide the spinner later since this component will be unmounted
		chatDisconnect();
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

			<Link to="/dashboard" role="image" className="link-no-styles">
				<Avatar
					// src="https://placeimg.com/640/480/any" // random picture
					username={user.username}
					className="mx-auto mx-md-2"
				/>
			</Link>

			<NavDropdown alignRight title={user.username} id="basic-nav-dropdown">
				<NavDropdown.Item as={Link} role="button" to="/dashboard">
					my dashboard
				</NavDropdown.Item>
				<NavDropdown.Divider />
				<NavDropdown.Item onClick={startLoggingOut}>
					<FontAwesomeIcon icon="sign-out-alt" className="mr-2" />
					logout
				</NavDropdown.Item>
			</NavDropdown>
		</Nav>
	);
}

export default connect(
	null,
	{ logout }
)(ProfileSection);
