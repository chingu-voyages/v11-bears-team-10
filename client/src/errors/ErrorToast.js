import React, { Component } from "react";
import { Toast } from "react-bootstrap";
import { getErrorMessage } from "../_helpers";

export default class ErrorToast extends Component {
	constructor(props) {
		super(props);

		this.state = {
			show: !!this.props.error,
			timeoutId: null
		};
	}

	setState_resetTimeout = show =>
		this.setState({
			show,
			timeoutId: show ? null : setTimeout(this.props.resetError, 500)
		});

	debounced_resetError = () => this.setState_resetTimeout(false);

	componentDidUpdate(prevProps) {
		if (this.props.error !== null && this.props.error !== prevProps.error) {
			clearTimeout(this.state.timeoutId);
			this.setState_resetTimeout(true);
		}
	}

	render() {
		if (this.props.error)
			return (
				<Toast
					className="p-3 bg-danger text-light text-center m-2 fixed-bottom-right"
					show={this.state.show}
					autohide
					delay={this.props.delay}
					onClose={this.debounced_resetError}>
					{getErrorMessage(this.props.error)}
				</Toast>
			);
		return null;
	}
}
