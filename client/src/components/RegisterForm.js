import React, { Component } from "react";
import { Button, Form, Spinner, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { setUser, register } from "../redux/actionCreators";

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
				username: null,
				email: null,
				password: null
			}
		};
	}

	onChange = ({ target: { id, value } }) =>
		this.setState(prevState => ({
			data: { ...prevState.data, [id]: value },
			errors: { ...prevState.errors, [id]: null }
		}));

	invalidate = (errors = {}) =>
		this.setState(prevState => ({
			submitting: false,
			errors: { ...prevState.errors, ...errors }
		}));

	onSubmit = () => {
		const { username, email, password } = this.state.data;
		if (username && email && password)
			this.setState({ submitting: true }, () => this.props.register(this.state.data));
		else
			this.invalidate({
				username: username ? null : "the user name is required",
				email: email ? null : "the email is required",
				password: password ? null : "the password is required"
			});
	};

	onKeyDown = ({ keyCode }) => keyCode === 13 && this.onSubmit();

	render() {
		return (
			<Row>
				<Col
					lg={8}
					xs={12}
					className="mx-auto"
					as={Form}
					onKeyDown={this.onKeyDown}
					data-aos="zoom-in">
					<div className="my-5 text-center">
						<small className="text-muted">join (project name here)</small>
						<h3>Create your account</h3>
					</div>

					<Form.Group as={Row} controlId="username" className="my-4">
						<Form.Label column xs={12} sm={3} className="required">
							User name
						</Form.Label>
						<Col xs={12} sm={6}>
							<Form.Control
								isInvalid={this.state.errors.username}
								onChange={this.onChange}
								value={this.state.username}
								placeholder="user name"
							/>
							<Form.Control.Feedback type="invalid">
								{this.state.errors.username}
							</Form.Control.Feedback>
						</Col>
					</Form.Group>

					<Form.Group as={Row} controlId="email" className="my-4">
						<Form.Label column xs={12} sm={3} className="required">
							Email
						</Form.Label>
						<Col xs={12} sm={6}>
							<Form.Control
								isInvalid={this.state.errors.email}
								onChange={this.onChange}
								value={this.state.email}
								type="email"
								placeholder="email address"
							/>
							<Form.Control.Feedback type="invalid">
								{this.state.errors.email}
							</Form.Control.Feedback>
						</Col>
					</Form.Group>

					<Form.Group as={Row} controlId="password" className="my-4">
						<Form.Label column xs={12} sm={3} className="required">
							Password
						</Form.Label>
						<Col xs={12} sm={6}>
							<Form.Control
								isInvalid={this.state.errors.password}
								onChange={this.onChange}
								value={this.state.password}
								type="password"
								placeholder="password"
							/>
							<small className="text-muted">
								Make sure it's at least 15 characters OR at least 8 characters
								including a number and a lowercase letter.{" "}
							</small>
							<Form.Control.Feedback type="invalid">
								{this.state.errors.password}
							</Form.Control.Feedback>
						</Col>
					</Form.Group>

					<div className="text-center my-5">
						<Button
							disabled={this.state.submitting}
							variant="primary"
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
					</div>
				</Col>
			</Row>
		);
	}
}

export default connect(
	null,
	{ setUser, register }
)(RegisterForm);
