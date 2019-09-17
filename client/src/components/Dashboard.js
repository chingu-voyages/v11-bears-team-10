import React, { useState } from "react";
import { Navbar, Nav, Form, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Card from "./Card/Card";
import AddProject from "./Card/AddProjectCard";

export default function Dashboard() {
	const [projectsData, setProjectsData] = useState({});

	return (
		<div className="dashboard">
			<Navbar variant="dark" className="header">
				<Navbar.Brand href="#home">Projects | Window</Navbar.Brand>
				<Nav className="center-nav flex-row">
					<Nav.Link href="#home">
						<FontAwesomeIcon icon="home" />
						<span className="navs">Home</span>
					</Nav.Link>
					<Nav.Link href="#features">
						<FontAwesomeIcon icon="search" />
						<span className="navs" id="find">
							Find
						</span>
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
					{/* <div className="flex-row add">
            <a className="left" href='http://fakelink'>Add Project</a>
          </div> */}
					<section className="projects-summary flex-col" data-aos="fade-up">
						<p>
							<h3>Projects Summary</h3>
						</p>
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
						<AddProject />
						<Card />
					</section>
				</div>
			</section>
		</div>
	);
}
