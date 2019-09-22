import React from "react";
import { Button, Form, Alert, Spinner, Row, Col, Card, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import login from "../redux/action_creators/login";

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			submitting: false,
			error_message: null,
			data: {
				username: "",
				password: ""
			}
		};
	}

	invalidate = (error_message = null) => this.setState({ submitting: false, error_message });

	onSubmit = () =>
		this.setState({ submitting: true, error_message: null }, () =>
			this.props.login(this.state.data, this.invalidate)
		);

	onChange = ({ target: { id, value } }) =>
		this.setState(prevState => ({ data: { ...prevState.data, [id]: value } }));

	onKeyDown = ({ keyCode }) => keyCode === 13 && this.onSubmit();

	render() {
		return (
			<Container as="main">
				<Row>
					<Col
						md={8}
						xs={12}
						className="mx-auto pt-5"
						as={Form}
						onKeyDown={this.onKeyDown}
						data-aos="zoom-in">
						<div className="mb-5 text-center">
							<h3>login to your {process.env.REACT_APP_NAME} account</h3>
						</div>

						{this.state.error_message && (
							<Row className="mb-5">
								<Col xs={12} sm={9} lg={6} className="mx-auto">
									<Alert className="text-center my-0" variant="danger">
										{this.state.error_message}
									</Alert>
								</Col>
							</Row>
						)}

						<Row as={Form.Group} controlId="username" className="mb-4">
							<Form.Label column xs={12} sm={3}>
								Username
							</Form.Label>
							<Col xs={12} sm={9} lg={6}>
								<Form.Control
									onChange={this.onChange}
									value={this.state.data.username}
									placeholder="username"
								/>
							</Col>
						</Row>

						<Row as={Form.Group} controlId="password" className="mb-4">
							<Form.Label column xs={12} sm={3}>
								Password
							</Form.Label>
							<Col xs={12} sm={9} lg={6}>
								<Form.Control
									onChange={this.onChange}
									value={this.state.data.password}
									type="password"
									placeholder="password"
								/>
							</Col>
						</Row>

						<Row className="mb-5">
							<Button
								variant="primary"
								className="mx-auto"
								onClick={this.onSubmit}
								disabled={this.state.submitting}>
								{this.state.submitting ? (
									<Spinner
										className="mx-2"
										as="span"
										aria-hidden="true"
										animation="border"
										role="status"
										size="sm">
										<span className="sr-only">Logging in ...</span>
									</Spinner>
								) : (
									"login"
								)}
							</Button>
						</Row>

						<Row className="mb-5">
							<Col xs={12} sm={9} lg={6} className="mx-auto">
								<Card>
									<Card.Body className="p-2 text-center">
										New to {process.env.REACT_APP_NAME} ?
										<Link to="/register"> Create an account</Link>
									</Card.Body>
								</Card>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default connect(
	null,
	{ login }
)(LoginForm);
