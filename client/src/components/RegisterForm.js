import React, { Component } from "react";
import { Button, Form, Spinner, Row, Col, Card } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../redux/actionCreators";

class RegisterForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			submitting: false,
			data: {
				username: "",
				email: "",
				password: ""
			},
			errors: {
				username: [],
				email: [],
				password: []
			}
		};
	}

	onChange = ({ target: { id, value } }) =>
		this.setState(prevState => ({
			data: { ...prevState.data, [id]: value },
			errors: { ...prevState.errors, [id]: [] }
		}));

	invalidate = (errors = {}) =>
		this.setState(prevState => ({
			submitting: false,
			errors: { ...prevState.errors, ...errors }
		}));

	onSubmit = () =>
		this.setState({ submitting: true }, () =>
			this.props.register(this.state.data, this.invalidate)
		);

	onKeyDown = ({ keyCode }) => keyCode === 13 && this.onSubmit();

	render() {
		return (
			<Row>
				<Col
					lg={8}
					xs={12}
					className="mx-auto pt-5"
					as={Form}
					onKeyDown={this.onKeyDown}
					data-aos="zoom-in">
					<div className="mb-5 text-center">
						<small className="text-muted">join {process.env.REACT_APP_NAME}</small>
						<h3>Create your account</h3>
					</div>

					<Row as={Form.Group} controlId="username" className="mb-4">
						<Form.Label column xs={12} sm={3} className="required">
							Username
						</Form.Label>
						<Col xs={12} sm={6}>
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

					<Row as={Form.Group} controlId="email" className="mb-4">
						<Form.Label column xs={12} sm={3} className="required">
							Email
						</Form.Label>
						<Col xs={12} sm={6}>
							<Form.Control
								isInvalid={!!this.state.errors.email.length}
								onChange={this.onChange}
								value={this.state.data.email}
								type="email"
								placeholder="email address"
							/>
							<Form.Control.Feedback as="ul" type="invalid">
								{this.state.errors.email.map(message => (
									<li key={message}>{message}</li>
								))}
							</Form.Control.Feedback>
						</Col>
					</Row>

					<Row as={Form.Group} controlId="password" className="mb-4">
						<Form.Label column xs={12} sm={3} className="required">
							Password
						</Form.Label>
						<Col xs={12} sm={6}>
							<Form.Control
								isInvalid={!!this.state.errors.password.length}
								onChange={this.onChange}
								value={this.state.data.password}
								type="password"
								placeholder="password"
							/>
							<small className="text-muted">
								Make sure it's at least 15 characters OR at least 8 characters
								including a number and a lowercase letter.
							</small>
							<Form.Control.Feedback as="ul" type="invalid">
								{this.state.errors.password.map(message => (
									<li key={message}>{message}</li>
								))}
							</Form.Control.Feedback>
						</Col>
					</Row>

					<Row className="mb-5">
						<Button
							disabled={this.state.submitting}
							variant="primary"
							className="mx-auto"
							onClick={this.onSubmit}>
							{this.state.submitting ? (
								<Spinner
									className="mx-3"
									as="span"
									aria-hidden="true"
									animation="border"
									role="status"
									size="sm">
									<span className="sr-only">Submitting ...</span>
								</Spinner>
							) : (
								"submit"
							)}
						</Button>
					</Row>
					<Row className="mb-5">
						<Col xs={12} sm={{ span: 6, offset: 3 }}>
							<Card>
								<Card.Body className="p-2 text-center">
									already have a {process.env.REACT_APP_NAME} account ?
									<Link to="/login"> Login</Link>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Col>
			</Row>
		);
	}
}

export default connect(
	null,
	{ register }
)(RegisterForm);
