import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../../stylesheets/css/styles.css";

function ProjectCard({project}) {
	return (
		<div className="flex-col app-card hvr-grow-shadow">
			<div className="project-card flex-col-centered">
				<h4>{project.title}</h4>
				<div className="flex-row-centered">
					<div className="badge-icon">
						<FontAwesomeIcon icon="users" id="members" />
						<span className="badge">{0}</span>
					</div>
					<div className="badge-icon">
						<FontAwesomeIcon icon="comments" id="comments" />
						<span className="badge">{0}</span>
					</div>
					<div className="badge-icon">
						<FontAwesomeIcon icon="sitemap" id="teams" />
						<span className="badge">{0}</span>
					</div>
				</div>
			</div>
			<div className="trash flex-col-centered">
				<div onClick={() => console.log("delete this card on click")}>
					<FontAwesomeIcon icon="trash" className="bin" />
				</div>
			</div>
		</div>
	);
}

export default ProjectCard;
