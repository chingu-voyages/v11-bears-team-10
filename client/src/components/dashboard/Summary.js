import React from "react";
import { Row, Col } from "react-bootstrap";

export default function Summary({ projects }) {
	var number_of_projects = 0;
	var finished_projects = 0;

	if (Array.isArray(projects)) {
		number_of_projects = projects.length;
		projects.forEach(project => project.isClosed && finished_projects++);
	}

	return (
		<section id="projects-summary" className="bg-white p-3 mb-3 rounded" data-aos="fade-up">
			<h1>Summary</h1>
			<hr className="w-100" />
			<Row noGutters>
				<Col xs={12} sm={4} className="px-2">
					<h2 className="p-2 rounded">
						{number_of_projects}
						<span className="mt-2 d-block">Projects</span>
					</h2>
				</Col>
				<Col xs={12} sm={4} className="px-2">
					<h2 className="p-2 rounded">
						0<span className="mt-2 d-block">Connections</span>
					</h2>
				</Col>
				<Col xs={12} sm={4} className="px-2">
					<h2 className="p-2 rounded">
						{finished_projects}
						<span className="mt-2 d-block">Finished Projects</span>
					</h2>
				</Col>
			</Row>
		</section>
	);
}
