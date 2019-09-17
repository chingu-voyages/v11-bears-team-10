import React from "react";
import { Nav, NavDropdown, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setUser } from "../redux/actionCreators";

class ProfileDropDown extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isloggingOut: false
		};
	}

	logout = () =>
		this.setState({ isloggingOut: true }, () =>
			setTimeout(() => {
				this.props.setUser(null);
			}, 1000)
		);

	render() {
		return (
			<Nav className="ml-md-auto mt-2 mt-md-0">
				{this.state.isloggingOut && (
					<Spinner
						className="my-auto"
						aria-hidden="true"
						animation="border"
						role="status"
						size="sm">
						<span className="sr-only">Logging out ...</span>
					</Spinner>
				)}
				<NavDropdown alignRight title={this.props.user.name} id="basic-nav-dropdown">
					<Link to="/dashboard" role="button" className="dropdown-item">
						my dashboard
					</Link>
					<NavDropdown.Divider />
					<NavDropdown.Item onClick={this.logout}>logout</NavDropdown.Item>
				</NavDropdown>
			</Nav>
		);
	}
}
export default connect(
	null,
	{ setUser }
)(ProfileDropDown);
