import React from "react";
import { Row, Col } from "react-bootstrap";

const reducer = (finishedProjects, project) =>
	project.completed ? finishedProjects + 1 : finishedProjects;

const Summary = ({ projectList }) => (
	<section id="projects-summary" className="bg-white p-3 mb-3 rounded bottom-shadow" data-aos="fade-up">
		<h1>Summary</h1>
		<hr className="w-100" />
		<Row noGutters>
			<Col xs={12} sm={4} className="px-2">
				<h2 className="p-2 rounded">
					{projectList.length}
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
					{projectList.reduce(reducer, 0)}
					<span className="mt-2 d-block">Finished Projects</span>
				</h2>
			</Col>
		</Row>
	</section>
);

export default Summary;
