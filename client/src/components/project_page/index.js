import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Button, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ProjectPage extends Component {
	render() {
		return (
			<Container
				as="main"
				className="my-3 my-md-4 pt-3 pt-md-4 px-3 px-md-4 pb-0 bottom-shadow dark-transparent-container">
				<section className="p-3 mb-3 bg-white rounded bottom-shadow" data-aos="fade-up">
					<h1 className="section-title"> a random project title here</h1>
					<hr className="w-100" />
					<p className="my-auto mr-auto ml-0 section-paragraph">
						Lorem Ipsum is simply dummy text of the printing and typesetting industry.
						Lorem Ipsum has been the industry's standard dummy text ever since the
						1500s, when an unknown printer took a galley of type and scrambled it to
						make a type specimen book
					</p>
				</section>
				<Row as="section" className="my-3">
					<Button variant="success" className="ml-auto">
						<FontAwesomeIcon icon="save" className="mr-2" />
						save
					</Button>
					<Button variant="primary" className="ml-2">
						<FontAwesomeIcon icon="times" className="mr-2" />
						cancel
					</Button>
					<Button variant="danger" className="ml-2">
						<FontAwesomeIcon icon="trash" className="mr-2" />
						delete
					</Button>
				</Row>
			</Container>
		);
	}
}

const mapStateToProps = (state, props) => console.log(state, props) || {};

export default connect(mapStateToProps)(ProjectPage);
