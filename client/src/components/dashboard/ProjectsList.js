import React, { useState } from "react";
import { Row, Button, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCard";
import AddProject from "../Projects/AddProjectForm"

export default function ProjectsList({ projectList }) {
	const [showModal, setShowModal] = useState(false);
	const closeModal = () => setShowModal(false);
	const openForm = () => setShowModal(true);

	return (
		<section
			id="project-list"
			className="p-3 bg-white rounded bottom-shadow"
			data-aos="fade-up">
			<Row noGutters>
				<h1 className="my-auto section-title">Projects</h1>
				<Button onClick={openForm} variant="dark-purple" className="ml-auto">
					create a project
				</Button>
			</Row>
			<AddProject showForm={showModal} handleCloseForm={closeModal} />
			<hr className="w-100" />
			<Row noGutters>
				{projectList.length ? (
					projectList.map(project => (
						<Col key={project._id} xs={12} sm={6} md={4} className="mb-2 p-2">
							<ProjectCard project={project} />
						</Col>
					))
				) : (
					<p className="text-muted text-center mx-auto">
						you currently have no projects . start by creating one
					</p>
				)}
			</Row>
		</section>
	);
}
