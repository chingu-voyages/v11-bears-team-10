import React from "react";
import { Navbar, Nav, Form, Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// export default function DashBoard(props) {
//   return <div>this is {props.user.name}'s dashboard page</div>;
// }

export default function DashBoards(props) {
  return (
    <div className="dashboard">
        <Navbar variant="dark" className="header">
          <Navbar.Brand href="#home">
            Projects | Window
          </Navbar.Brand>
          <Nav className="center-nav">
            <Nav.Link href="#home">
							<FontAwesomeIcon icon="home" />
							Home
						</Nav.Link>
            <Nav.Link href="#features">
						<FontAwesomeIcon icon="search" />
							Find
						</Nav.Link>
          </Nav>
          <div className="user-nav">
            <Image
              src="https://via.placeholder.com/40"
              roundedCircle
              style={{ marginRight: "7px" }}
            />
            <Form inline>
              <Button variant="outline-info">Search</Button>
            </Form>
          </div>
        </Navbar>
				<section className="dash-body">

				</section>
    </div>
  );
}
