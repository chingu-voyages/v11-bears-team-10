import React, { Component } from "react";
import { addClassName, removeClassName } from "../_helpers";

export default class LandingPage extends Component {
	componentDidMount() {
		addClassName("body", "hero");
	}
	componentWillUnmount() {
		removeClassName("body", "hero");
	}

	render() {
		return (
			<main data-aos="zoom-in" className="hero-message mt-5 ml-5 mb-auto mr-auto text-center">
				<h1>{process.env.REACT_APP_NAME}</h1>
				<h4 className="text-muted">manage projects better</h4>
			</main>
		);
	}
}
