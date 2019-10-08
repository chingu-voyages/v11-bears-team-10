import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";

import ProfileSection from "./ProfileSection";
import AuthenticationButtons from "./AuthenticationButtons";

import logo from "../../images/logo.png";

export default class NavBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			withBg: !!window.scrollY,
			expanded: false
		};
	}

	getHandleScrollFunc = () => {
		let last_known_scroll_position = window.scrollY;
		let ticking = false;
		let context = this;

		return e => {
			last_known_scroll_position = window.scrollY;

			if (!ticking) {
				window.requestAnimationFrame(function() {
					context.onScrollTick(last_known_scroll_position);
					ticking = false;
				});

				ticking = true;
			}
		};
	};

	handleScroll = this.getHandleScrollFunc();

	componentDidMount() {
		window.addEventListener("scroll", this.handleScroll);
		window.addEventListener("resize", this.shrink);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
		window.removeEventListener("resize", this.shrink);
	}

	onScrollTick = y => {
		if (!y && this.state.withBg) return this.setState({ withBg: false });
		if (!this.state.withBg) this.setState({ withBg: true });
	};

	onToggle = expanded => this.setState({ expanded });

	shrink = () => this.state.expanded && this.onToggle(false);

	render() {
		return (
			<Navbar
				className={
					"flex-column flex-md-row text-center" +
					(this.state.expanded || this.state.withBg
						? " bg-white border-bottom"
						: " bg-transparent")
				}
				onToggle={this.onToggle}
				expand="md"
				expanded={this.state.expanded}
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
					<Nav as="ul" className="pl-md-2">
						<NavItem as="li" className="ml-md-2 my-md-0 my-2" onClick={this.shrink}>
							<NavLink to="/features" className="nav-link">
								Features
							</NavLink>
						</NavItem>
						<NavItem as="li" className="ml-md-2 my-md-0 my-2" onClick={this.shrink}>
							<NavLink to="/how-it-works" className="nav-link">
								How it works
							</NavLink>
						</NavItem>
						<NavItem as="li" className="ml-md-2 my-md-0 my-2" onClick={this.shrink}>
							<NavLink to="/contact-us" className="nav-link">
								Contact us
							</NavLink>
						</NavItem>
						<NavItem as="li" className="ml-md-2 my-md-0 my-2" onClick={this.shrink}>
							<NavLink to="/chat" className="nav-link">
								Chat
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
