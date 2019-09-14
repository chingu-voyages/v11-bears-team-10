import React, { useState } from "react";
import { Navbar, Nav, Form, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Card from "./components/Card/Card";
import AddProject from "./components/Card/AddProjectCard";
import AddProjectForm from './container/Modals/AddProjectForm'

import band from './images/greenbrand.png'

export default function DashBoards(props) {
	const [projectsData, setProjectsData] = useState({})
	const [showModal, setShowModal] = useState(false)
	
	const showForm = () => setShowModal(true)
	const closeModal = () => setShowModal(false)

  return (
    <div className="dashboard">
      <Navbar variant="dark" className="header">
        <Navbar.Brand href="#home">
					<img src={band} alt="brand" id="brand" />
				</Navbar.Brand>
        <Nav className="center-nav flex-row">
          <Nav.Link href="#home">
            <FontAwesomeIcon icon="home" />
            <span className="navs">Home</span>
          </Nav.Link>
          <Nav.Link href="#features">
            <FontAwesomeIcon icon="search" />
            <span className="navs" id="find">Find</span>
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
            <button className="logout hvr-shrink">LogOut</button>
          </Form>
        </div>
      </Navbar>
      <section className="dash-body flex-col-centered">
        <div className="content" data-aos="fade-in">
          <section className="projects-summary flex-col" data-aos="fade-up">
            <span>
              <h3>Projects Summary</h3>
            </span>
            <hr />
            <section className="flex-row summary-cards">
              <div className="summary">
                <h1>{projectsData.totalProjects || 0}</h1>
                <h3>Projects</h3>
              </div>
              <div className="summary">
                <h1>{projectsData.totalConnections || 0}</h1>
                <h3>Connections</h3>
              </div>
              <div className="summary">
                <h1>{projectsData.finishedProjects || 0}</h1>
                <h3>Finished Projects</h3>
              </div>
            </section>
          </section>
          <section className="projects-shelf flex-row" data-aos="fade-up">
            <AddProject handleShowModal={showForm} />
						<AddProjectForm showForm={showModal} handleCloseForm={closeModal}/>
            <Card />
          </section>
        </div>
      </section>
    </div>
  );
}
