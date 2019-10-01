import React, { Component } from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";

class ProjectPage extends Component {
	componentDidMount() {
		console.log("haha");
	}

	render() {
		return (
			<Container
			fluid
				as="main"
				id="dashboard"
				className="">haha</Container>
		);
	}
}

const mapStateToProps = (state, props) => console.log(state, props) || {};

export default connect(mapStateToProps)(ProjectPage);
