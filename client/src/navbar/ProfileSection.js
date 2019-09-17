import React from "react";
import { Nav, NavDropdown, Spinner, Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setUser } from "../redux/actionCreators";
import Avatar from "../components/Avatar";

class ProfileSection extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isloggingOut: false
		};
	}

	toggleDropdown = (...a) => console.log(a);

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

				<Link to="/dashboard" role="image">
					<Avatar />
				</Link>

				<NavDropdown alignRight title={this.props.user.name} id="basic-nav-dropdown">
					<NavDropdown.Item as={Link} role="button" to="/dashboard">
						my dashboard
					</NavDropdown.Item>
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
)(ProfileSection);
