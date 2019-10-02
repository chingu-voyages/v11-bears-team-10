import React, { Component } from "react";
import { connect } from "react-redux";

import LayoutWithTabs from "./LayoutWithTabs";
import LayoutWithoutTabs from "./LayoutWithoutTabs";
import DarkTransparentContainer from "../../reusable_components/DarkTransparentContainer";

class ProjectPage extends Component {
	constructor(props) {
		super(props);

		this.state = { isLayoutWithTabs: this.isLayoutWithTabs() };
	}

	componentDidMount() {
		window.addEventListener("resize", this.onResize);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.onResize);
	}

	// the maximum breakpoint where the layout with tabs is rendered instead of the one with sections
	LayoutWithTab_max_breakpoint = 767;

	isLayoutWithTabs = () => window.innerWidth < this.LayoutWithTab_max_breakpoint + 1;

	onResize = () => {
		var isLayoutWithTabs = this.isLayoutWithTabs();
		if (isLayoutWithTabs !== this.state.isLayoutWithTabs) this.setState({ isLayoutWithTabs });
	};

	render() {
		return (
			<DarkTransparentContainer>
				{this.state.isLayoutWithTabs ? <LayoutWithTabs /> : <LayoutWithoutTabs />}
			</DarkTransparentContainer>
		);
	}
}

const mapStateToProps = (state, props) => console.log(state, props) || {};

export default connect(mapStateToProps)(ProjectPage);
