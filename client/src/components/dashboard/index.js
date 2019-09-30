import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";

import Summary from "./Summary";
import ProjectsList from "./ProjectsList";
import getUserProjects from "../../redux/action_creators/getUserProjects";

class Dashboard extends Component {
	componentDidMount() {
		if (!this.props.projects) this.props.getUserProjects();
	}

	render() {
		return (
			<Container
				as="main"
				id="dashboard"
				className="my-3 my-md-4 pt-3 pt-md-4 px-3 px-md-4 pb-0">
				<Summary projects={this.props.projects} />
				<ProjectsList projects={this.props.projects} />
			</Container>
		);
	}
}

const mapStateToProps = ({ projects }) => ({ projects });

export default connect(
	mapStateToProps,
	{ getUserProjects }
)(Dashboard);
