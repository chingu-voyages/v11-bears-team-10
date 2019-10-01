import React from "react";
import { Row, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";

export default function ProjectsList({ projectList }) {
	return (
		<section
			id="project-list"
			className="p-3 mb-3 bg-white rounded bottom-shadow"
			data-aos="fade-up">
			<Row noGutters>
				<h1 className="my-auto">Projects</h1>
				<Button as={Link} to="/haha" variant="dark-purple" className="ml-auto">
					create a project
				</Button>
			</Row>
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
