import React from "react";
import { Nav, NavDropdown, Spinner } from "react-bootstrap";

export default class ProfileSection extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isloggingOut: false
		};
	}

	logout = () => this.setState({ isloggingOut: true }, () => this.props.logout());
	
	render() {
		return (
			<Nav className={this.props.className}>
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
					<NavDropdown.Item>action</NavDropdown.Item>
					<NavDropdown.Item>another action</NavDropdown.Item>
					<NavDropdown.Item>something</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item onClick={this.logout}>logout</NavDropdown.Item>
				</NavDropdown>
			</Nav>
		);
	}
}
