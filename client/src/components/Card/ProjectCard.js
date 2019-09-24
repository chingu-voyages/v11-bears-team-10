import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";


import { deleteProject, getProject } from '../../redux/action_creators/project'
import "../../stylesheets/css/styles.css";

function ProjectCard({project, deleteProject, getProject}) {
	return (
		<div className="flex-col app-card hvr-grow-shadow"
		  onDoubleClick={() => {
				 getProject(project._id)
			}}
		>
			<div className="project-card flex-col-centered">
				<h4>{project.title}</h4>
				<div className="flex-row-centered">
					<div className="badge-icon">
						<FontAwesomeIcon icon="users" id="members" />
						<span className="badge">{project.nb_member}</span>
					</div>
					<div className="badge-icon">
						<FontAwesomeIcon icon="comments" id="comments" />
						<span className="badge">{project.nb_msg}</span>
					</div>
					<div className="badge-icon">
						<FontAwesomeIcon icon="clipboard-list" id="teams" />
						<span className="badge">{project.nb_todos}</span>
					</div>
				</div>
			</div>
			<div className="trash flex-col-centered">
				<div onClick={() => { deleteProject(project._id) }}>
					<FontAwesomeIcon icon="trash" className="bin" />
				</div>
			</div>
		</div>
	);
}

export default connect(null, { deleteProject, getProject })(ProjectCard);
