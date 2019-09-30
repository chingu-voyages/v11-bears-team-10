import React from "react";
import { Spinner, Row, Button, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCard";

function renderProjectCards(projects) {
	if (projects === null)
		return (
			<Spinner
				animation="border"
				variant="primary"
				className="my-3 mx-auto big-spinner"
				role="status">
				<span className="sr-only">Fetching projects ...</span>
			</Spinner>
		);

	if (!Array.isArray(projects))
		return (
			<p className="text-muted text-center mx-auto">
				there was a problem loading your projects ! try refreching the page
			</p>
		);

	if (!projects.length)
		return (
			<p className="text-muted text-center mx-auto">
				you currently have no projects . start by creating one
			</p>
		);

	return projects.map(project => (
		<Col key={project._id} xs={12} sm={6} md={4} className="mb-3 p-2">
			<ProjectCard project={project} />
		</Col>
	));
}

export default function ProjectsList({ projects }) {
	return (
		<section id="project-list" className="p-3 mb-3 rounded" data-aos="fade-up">
			<Row noGutters>
				<h1 className="my-auto">Projects</h1>
				<Button variant="dark-purple" className="ml-auto">
					create a project
				</Button>
			</Row>
			<hr className="w-100" />
			<Row noGutters>{renderProjectCards(projects)}</Row>
		</section>
	);
}
