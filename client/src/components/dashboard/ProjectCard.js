import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";

function ProjectCard({ project, history }) {
	return (
		<div
			className="project-card border border-secondary rounded bottom-shadow-on-hover p-3"
			onClick={() => history.push(`/project/${project._id}`)}
			data-aos="fade-down">
			<h2 className="text-center text-truncate mb-4">{project.title}</h2>
			<Row noGutters>
				<i className="ml-auto mr-3">
					<FontAwesomeIcon icon="users" id="team-members" />
					<span>{project.nb_member}</span>
				</i>
				<i className="ml-0 mr-3">
					<FontAwesomeIcon icon="comments" id="messages" />
					<span>{project.nb_msg}</span>
				</i>
				<i className="ml-0 mr-3">
					<FontAwesomeIcon icon="clipboard-list" id="todos" />
					<span>{project.nb_todos}</span>
				</i>
			</Row>
		</div>
	);
}

export default withRouter(ProjectCard);
