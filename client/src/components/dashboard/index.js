import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";

import Summary from "./Summary";
import ProjectsList from "./ProjectsList";

class Dashboard extends Component {

	render() {
		return (
			<Container
				as="main"
				id="dashboard"
				className="my-3 my-md-4 pt-3 pt-md-4 px-3 px-md-4 pb-0 bottom-shadow">
				<Summary projectList={this.props.projectList} />
				<ProjectsList projectList={this.props.projectList} />
			</Container>
		);
	}
}

const mapStateToProps = state => ({ projectList: state.user.projectList });

export default connect(mapStateToProps)(Dashboard);
