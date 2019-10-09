import React, { Component } from "react";
import { Toast } from "react-bootstrap";

export default class MessageToast extends Component {
	constructor(props) {
		super(props);

		this.state = {
			show: true,
			timeoutId: null
		};
	}

	extendShowDuration = () => {
		clearTimeout(this.state.timeoutId);
		this.setState({
			show: true,
			timeoutId: null
		});
	};

	debounced_onClose = () =>
		this.setState({
			show: false,
			timeoutId: setTimeout(this.props.onClose, 500)
		});

	componentDidUpdate(prevProps) {
		if (this.props.message && this.props.message !== prevProps.message)
			this.extendShowDuration();
	}

	render() {
		var bg = "primary";
		if (this.props.error && !this.props.success) bg = "danger";
		if (!this.props.error && this.props.success) bg = "success";

		return (
			<Toast
				className={`p-3 bg-${bg} text-light text-center m-2 fixed-bottom-right`}
				show={this.state.show}
				autohide
				delay={this.props.delay}
				onClose={this.debounced_onClose}>
				{this.props.message}
			</Toast>
		);
	}
}
