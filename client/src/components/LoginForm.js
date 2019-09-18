import React from "react";
import { Button, Form, Alert, Spinner, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { setUser, setError } from "../redux/actionCreators";

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			submitting: false,
			error_message: null,
			data: {
				email: "",
				password: ""
			}
		};
	}

	invalidate = (message = "invalid credentials") =>
		this.setState({ submitting: false, error_message: message });

	onSubmit = () =>
		this.setState({ submitting: true, error_message: null }, () =>
			setTimeout(() => {
				this.props.setError(500);
			}, 1000)
		);

	onChange = ({ target: { id, value } }) =>
		this.setState(prevState => ({ data: { ...prevState.data, [id]: value } }));

	onKeyDown = ({ keyCode }) => keyCode === 13 && this.onSubmit();

	render() {
		return (
			<Row className="my-5">
				<Col md="5" xs="11" className="mx-auto" as={Form} onKeyDown={this.onKeyDown}>
					{this.state.error_message && (
						<Alert variant="danger">{this.state.error_message}</Alert>
					)}
					<Form.Group controlId="email">
						<Form.Label>Email</Form.Label>
						<Form.Control
							onChange={this.onChange}
							value={this.state.data.email}
							type="email"
							placeholder="enter your email"
						/>
					</Form.Group>
					<Form.Group controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control
							onChange={this.onChange}
							value={this.state.data.password}
							type="password"
							placeholder="enter your password"
						/>
					</Form.Group>
					<Button
						variant="primary"
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
				</Col>
			</Row>
		);
	}
}

export default connect(
	null,
	{ setUser, setError }
)(LoginForm);
