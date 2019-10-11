import React, { Component } from "react";
import { connect } from "react-redux";

import DarkTransparentContainer from "../../reusable_components/DarkTransparentContainer";
import Summary from "./Summary";
import ProjectsList from "./ProjectsList";

class Dashboard extends Component {
  render() {
    return (
      <DarkTransparentContainer>
        <Summary projectList={this.props.projectList} />
        <ProjectsList projectList={this.props.projectList} />
      </DarkTransparentContainer>
    );
  }
}

const mapStateToProps = state => ({
  projectList: state.user.projectList.reverse() || []
});

export default connect(mapStateToProps)(Dashboard);
