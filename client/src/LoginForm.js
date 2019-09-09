import React from "react";
import { Button, Form, Alert, Spinner, Card } from "react-bootstrap";

export default class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			submitting: false,
			error_message: "",
			data: {
				email: "",
				password: ""
			}
		};
	}

	invalidate = (message = "invalid credentials") =>
		this.setState({ submitting: false, error_message: message });

	onSubmit = () =>
		this.setState({ submitting: true, error_message: "" }, () =>
			this.props.onSubmit(this.state.data, this.invalidate)
		);

	onChange = ({ target: { id, value } }) =>
		this.setState(prevState => ({ data: { ...prevState.data, [id]: value } }));

	onKeyDown = ({ keyCode }) => keyCode === 13 && this.onSubmit();

	render() {
		return (
			<Card onKeyDown={this.onKeyDown} className={this.props.className}>
				<Card.Body>
					<Form>
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
					</Form>
				</Card.Body>
			</Card>
		);
	}
}
