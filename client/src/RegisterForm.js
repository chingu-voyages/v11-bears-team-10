import React from "react";
import { Card, Button, Form, Spinner } from "react-bootstrap";

export default class RegisterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitting: false,
      data: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      },
      errors: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      }
    };
  }

  onChange = ({ target: { id, value } }) =>
    this.setState(prevState => ({
      data: { ...prevState.data, [id]: value },
      errors: { ...prevState.errors, [id]: "" }
    }));

  invalidate = (errors = {}) =>
    this.setState(prevState => ({
      submitting: false,
      errors: { ...prevState.errors, ...errors }
    }));

  onSubmit = () =>
    this.setState({ submitting: true }, () =>
      this.props.onSubmit(this.state.data, this.invalidate)
    );

  onKeyDown = ({ keyCode }) => keyCode === 13 && this.onSubmit();

  render() {
    return (
      <Card onKeyDown={this.onKeyDown} className={this.props.className}>
        <Card.Body>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                isInvalid={this.state.errors.name.length}
                onChange={this.onChange}
                value={this.state.name}
                placeholder="enter your name"
              />
              <Form.Control.Feedback type="invalid">
                {this.state.errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                isInvalid={this.state.errors.email.length}
                onChange={this.onChange}
                value={this.state.email}
                type="email"
                placeholder="enter your email adress"
              />
              <Form.Control.Feedback type="invalid">
                {this.state.errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                isInvalid={this.state.errors.password.length}
                onChange={this.onChange}
                value={this.state.password}
                type="password"
                placeholder="enter your password"
              />
              <Form.Control.Feedback type="invalid">
                {this.state.errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password_confirmation">
              <Form.Label>Password confirmation</Form.Label>
              <Form.Control
                isInvalid={this.state.errors.password_confirmation.length}
                onChange={this.onChange}
                value={this.state.password_confirmation}
                type="password"
                placeholder="confirm your password"
              />
              <Form.Control.Feedback type="invalid">
                {this.state.errors.password_confirmation}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Card.Body>
        <Card.Footer>
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
        </Card.Footer>
      </Card>
    );
  }
}

//force format