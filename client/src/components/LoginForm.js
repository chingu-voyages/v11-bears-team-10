import React from "react";
import { Button, Form, Alert, Spinner, Row, Col, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import login from "../redux/action_creators/login";

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			submitting: false,
			message: null,
			data: {
				username: "",
				password: ""
			},
			errors: {
				username: [],
				password: []
			}
		};
	}

	invalidate = (errors = {}) =>
		this.setState(prevState => ({
			submitting: false,
			errors: { ...prevState.errors, ...errors }
		}));

	invalidCredentials = () => this.setState({ submitting: false, message: "invalid credentials" });

	onSubmit = () =>
		this.setState({ submitting: true, message: null }, () =>
			this.props.login(this.state.data, this.invalidate, this.invalidCredentials)
		);

	onChange = ({ target: { id, value } }) =>
		this.setState(prevState => ({
			data: { ...prevState.data, [id]: value },
			errors: { ...prevState.errors, [id]: [] }
		}));

	onKeyDown = ({ code, key }) => (key === "Enter" || code === "Enter") && this.onSubmit();

	render() {
		return (
			<Container as="main" className="my-auto">
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

						{this.state.message && (
							<Row className="mb-5">
								<Col xs={12} sm={9} lg={6} className="mx-auto">
									<Alert className="text-center my-0" variant="danger">
										{this.state.message}
									</Alert>
								</Col>
							</Row>
						)}

						<Row as={Form.Group} controlId="username" className="mb-4">
							<Form.Label column xs={12} sm={3} className="required">
								Username
							</Form.Label>
							<Col xs={12} sm={9} lg={6}>
								<Form.Control
									isInvalid={!!this.state.errors.username.length}
									onChange={this.onChange}
									value={this.state.data.username}
									placeholder="username"
								/>

								<Form.Control.Feedback as="ul" type="invalid">
									{this.state.errors.username.map(message => (
										<li key={message}>{message}</li>
									))}
								</Form.Control.Feedback>
							</Col>
						</Row>

						<Row as={Form.Group} controlId="password" className="mb-4">
							<Form.Label column xs={12} sm={3} className="required">
								Password
							</Form.Label>
							<Col xs={12} sm={9} lg={6}>
								<Form.Control
									isInvalid={!!this.state.errors.password.length}
									onChange={this.onChange}
									value={this.state.data.password}
									type="password"
									placeholder="password"
								/>

								<Form.Control.Feedback as="ul" type="invalid">
									{this.state.errors.password.map(message => (
										<li key={message}>{message}</li>
									))}
								</Form.Control.Feedback>
							</Col>
						</Row>

						<Row className="mb-5">
							<Button
								variant="dark-purple"
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

						<div className="mb-5 text-center">
							New to {process.env.REACT_APP_NAME} ?
							<Link to="/register"> Create an account</Link>
						</div>
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
