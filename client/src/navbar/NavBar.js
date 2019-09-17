import React from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";

import ProfileSection from "./ProfileSection";
import AuthenticationButtons from "./AuthenticationButtons";

import logo from "../images/logo.png";

class NavBar extends React.Component {
	render() {
		return (
			<Navbar
				className="border border-botom-dark flex-column flex-md-row text-center"
				bg="light"
				expand="md"
				sticky="top">
				<div className="d-flex flex-nowrap w-sm-down-100">
					<Link to="/">
						<Navbar.Brand className="mr-auto">
							<img alt="brand" src={logo} width="40" height="40" />
						</Navbar.Brand>
					</Link>
					<Navbar.Toggle aria-controls="navbar-nav-collapse" className="ml-auto mr-2" />
				</div>

				<Navbar.Collapse id="navbar-nav-collapse">
					<Nav as="ul" className="ml-md-2">
						<NavItem as="li" className="ml-md-2">
							<NavLink to="/features" className="nav-link">
								Features
							</NavLink>
						</NavItem>
						<NavItem as="li" className="ml-md-2">
							<NavLink to="/how-it-works" className="nav-link">
								How it works
							</NavLink>
						</NavItem>
						<NavItem as="li" className="ml-md-2">
							<NavLink to="/contact-us" className="nav-link">
								Contact us
							</NavLink>
						</NavItem>
					</Nav>

					{this.props.user ? (
						<ProfileSection user={this.props.user} />
					) : (
						<AuthenticationButtons />
					)}
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default connect(state => ({ user: state.user }))(NavBar);
