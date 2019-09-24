import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

// import Header from "./../components/Header/Header";
import ProjectCard from "./Card/ProjectCard";
import AddProjectCard from "./../components/Card/AddProjectCard";
import AddProjectForm from "./../container/Modals/AddProjectForm";
import Footer from "./Footer/Footer";

import setError from "./../redux/action_creators/setError";

function DashBoard({ activeUser, newProject, isProjectDeleted }) {
  const [dashboardUser, setDashBoardUser] = useState(activeUser);
	const [showModal, setShowModal] = useState(false);


  const showForm = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  async function getData() {
    const id = localStorage.getItem("user_id");
    try {
      const response = await axios.get(`/users/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("authToken")
        }
			});
			setDashBoardUser(response.data.user);
    } catch (e) {
      if (!e.response) setError({ requestTimeout: e.code === "ECONNABORTED" });
      else if (e.response.status !== 401)
        setError({ statusCode: e.response.status });
    }
  }

  useEffect(() => {
    getData();
  }, [activeUser, newProject, isProjectDeleted]);

  return (
    <div className="dashboard">
      {/* <Header /> */}
      <section className="dash-body flex-col-centered">
        <div className="content" data-aos="fade-in">
          <section className="projects-summary flex-col" data-aos="fade-up">
            <span>
              <h3>Projects Summary</h3>
            </span>
            <hr />
            <section className="flex-row summary-cards">
              <div className="summary">
                <h1>{dashboardUser.projectList.length}</h1>
                <h3>Projects</h3>
              </div>
              <div className="summary">
                <h1>{dashboardUser.totalConnections || 0}</h1>
                <h3>Connections</h3>
              </div>
              <div className="summary">
                <h1>{dashboardUser.finishedProjects || 0}</h1>
                <h3>Finished Projects</h3>
              </div>
            </section>
          </section>
          <section className="projects-shelf flex-row" data-aos="fade-up">
            <AddProjectCard handleShowModal={showForm} />
            <AddProjectForm
              showForm={showModal}
              handleCloseForm={closeModal}
							userId={localStorage.getItem("user_id")}
							
            />
            {dashboardUser.projectList.map(project => {
                return <ProjectCard project={project} key={`project${project._id}`} />;
            })}
          </section>
        </div>
      </section>
      <Footer />
    </div>
  );
}

const mapStateToProps = state => ({
  activeUser: state.user,
	newProject: state.project,
});

export default connect(
  mapStateToProps,
  {}
)(DashBoard);
