import React from "react";
import { Navbar, Nav, Form, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import logo from "../../images/logo.png";

function AppHeader() {
	return (
		<>
			<Navbar variant="dark" className="header">
				<Navbar.Brand href="#home">
					<img src={logo} alt="brand" id="brand" />
					<span id="brand-name">{"Koub"}</span>
				</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link href="#home">
						<FontAwesomeIcon icon="home" />
						<span className="navs">Home</span>
					</Nav.Link>
				</Nav>
				<Nav className="flex-row">
					<Nav.Link href="#features">
						<div className="search-wrapper flex-row">
							<FontAwesomeIcon icon="search" id="search" />
							<input
								id="search-bar"
								type="text"
								defaultValue={""}
								placeholder={`Search`}
							/>
						</div>
					</Nav.Link>
				</Nav>
				<div className="user-nav">
					<div>
						<Image
							src="https://via.placeholder.com/30"
							roundedCircle
							style={{ marginRight: "7px" }}
						/>
						<span>Username</span>
					</div>

					<Form inline>
						<button className="logout hvr-shrink">LogOut</button>
					</Form>
				</div>
			</Navbar>
		</>
	);
}

export default AppHeader;
