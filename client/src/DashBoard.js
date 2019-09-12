import React from "react";
import { Navbar, Nav, Form, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Card from './components/Card/Card'

export default function DashBoards(props) {
  return (
    <div className="dashboard">
      <Navbar variant="dark" className="header">
        <Navbar.Brand href="#home">Projects | Window</Navbar.Brand>
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
          <div>
            <Image
              src="https://via.placeholder.com/40"
              roundedCircle
              style={{ marginRight: "7px" }}
            />
            <span>Username</span>
          </div>

          <Form inline>
            <button className="logout">LogOut</button>
          </Form>
        </div>
      </Navbar>
      <section className="dash-body flex-col-centered">
        <div className="content">
          <div className="flex-row add">
            <a className="left">Add Project</a>
          </div>
          <section className="projects-summary">
            <p>MY PROJECTS SUNNARY</p>
          </section>
          <section className="projects-shelf flex-row">
						<Card />
						<Card />
						<Card />
						<Card />
						<Card />
						<Card />
          </section>
        </div>
      </section>
    </div>
  );
}
