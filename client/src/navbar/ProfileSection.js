import React, { useState } from "react";
import { Nav, NavDropdown, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setUser } from "../redux/actionCreators";
import Avatar from "../components/Avatar";

function ProfileSection({ user, setUser }) {
	const [isloggingOut, showSpinner] = useState(false);

	const logout = () => {
		showSpinner(true);
		setTimeout(() => {
			setUser(null);
		}, 1000);
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
				<NavDropdown.Item onClick={logout}>logout</NavDropdown.Item>
			</NavDropdown>
		</Nav>
	);
}

export default connect(
	null,
	{ setUser }
)(ProfileSection);
