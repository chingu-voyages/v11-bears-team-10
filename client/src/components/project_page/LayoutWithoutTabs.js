import React, { Component } from "react";
import { Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";

export default class LayoutWithoutTabs extends Component {
	render() {
		return (
			<Row>
				<Col md={4} className="pr-0">
					<section className="p-3 h-100vh-max bg-white rounded bottom-shadow">
						<h1 className="section-title text-center">Discussion</h1>
						<hr className="w-100" />
						<p className="section-paragraph">
							not implemented yet
						</p>
					</section>
				</Col>
				<Col>
					<Row>
						<Col>
							<section className="p-3 mb-3 bg-white rounded bottom-shadow">
								<h1 className="section-title text-center">
									a random project title here
								</h1>
								<hr className="w-100" />
								<p className="section-paragraph">
									Lorem Ipsum is simply dummy text of the printing and typesetting
									industry. Lorem Ipsum has been the industry's standard dummy
									text ever since the 1500s, when an unknown printer took a galley
									of type and scrambled it to make a type specimen book
								</p>
							</section>
						</Col>
					</Row>
					<Row>
						<Col>
							<section className="p-3 bg-white rounded bottom-shadow">
								<h1 className="section-title text-center">Todo list</h1>
								<hr className="w-100" />
								<div className="px-5 py-2">
									<ListGroup className="ml-4">
										<ListGroupItem>
											Lorem Ipsum is simply dummy text of the printing and
											Lorem Ipsum is simply dummy text of the printing and
										</ListGroupItem>
										<ListGroupItem>
											Lorem Ipsum is simply dummy text of the printing and
											Lorem Ipsum is simply dummy text of the printing and
										</ListGroupItem>
										<ListGroupItem>
											Lorem Ipsum is simply dummy text of the printing and
											Lorem Ipsum is simply dummy text of the printing and
										</ListGroupItem>
									</ListGroup>
								</div>
								<div className="px-5 py-2">
									<div className="text-muted mb-3">Due 30/04/1997</div>

									<ListGroup className="ml-4">
										<ListGroupItem>
											Lorem Ipsum is simply dummy text of the printing and
											Lorem Ipsum is simply dummy text of the printing and
										</ListGroupItem>
										<ListGroupItem>
											Lorem Ipsum is simply dummy text of the printing and
											Lorem Ipsum is simply dummy text of the printing and
										</ListGroupItem>
										<ListGroupItem>
											Lorem Ipsum is simply dummy text of the printing and
											Lorem Ipsum is simply dummy text of the printing and
										</ListGroupItem>
									</ListGroup>
								</div>
							</section>
						</Col>
					</Row>
				</Col>
			</Row>
		);
	}
}
