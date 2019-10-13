import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";

import { Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import { getProject } from "../../redux/action_creators/project";
import { fetshUsers } from "../../redux/action_creators/usersListAction";

function ProjectCard({ project, history, getProject, fetchUsers }) {
  return (
    <div
      className="project-card border border-secondary rounded bottom-shadow-on-hover p-3"
      onClick={() => {
        getProject(project._id);
        fetchUsers();
        history.push(`/project/${project._id}`);
      }}
      data-aos="fade-down"
    >
      <h2 className="text-center text-truncate mb-4">{project.title}</h2>
      <Row noGutters>
        {project.completed && <span>Completed</span>}
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

const mapDistpatchToProps = dispatch => {
  return {
    getProject: id => dispatch(getProject(id)),
    fetchUsers: () => dispatch(fetshUsers())
  };
};

export default connect(
  null,
  mapDistpatchToProps
)(withRouter(ProjectCard));
