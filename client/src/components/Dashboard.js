import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import ProjectCard from "./Card/ProjectCard";
import AddProjectCard from "./../components/Card/AddProjectCard";
import AddProjectForm from "./../container/Modals/AddProjectForm";
import Footer from "./Footer/Footer";
import { fetchUpdatedUser } from "./../redux/action_creators/user";

function DashBoard({ user, newProject, fetchUpdatedUser }) {
  const [showModal, setShowModal] = useState(false);
  const showForm = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    function getData() {
      let id = localStorage.getItem("user_id");
      fetchUpdatedUser(id);
    }
    getData();
  }, [newProject, fetchUpdatedUser]);

  return (
    <div className="dashboard">
      <section className="dash-body flex-col-centered">
        <div className="content" data-aos="fade-in">
          <section className="projects-summary flex-col" data-aos="fade-up">
            <span>
              <h3>Projects Summary</h3>
            </span>
            <hr />
            <section className="flex-row summary-cards">
              <div className="summary">
                <h1>{user.projectList.length}</h1>
                <h3>Projects</h3>
              </div>
              <div className="summary">
                <h1>{0}</h1>
                <h3>Connections</h3>
              </div>
              <div className="summary">
                <h1>{0}</h1>
                <h3>Finished Projects</h3>
              </div>
            </section>
          </section>
          <section className="projects-shelf flex-row" data-aos="fade-up">
            <AddProjectForm
              showForm={showModal}
              handleCloseForm={closeModal}
              userId={localStorage.getItem("user_id")}
            />
            {user.projectList.map(project => {
              return (
                <ProjectCard project={project} key={`project${project._id}`} />
              );
            })}
            <AddProjectCard handleShowModal={showForm} />
          </section>
        </div>
      </section>
      <Footer />
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user,
  newProject: state.project
});

export default connect(
  mapStateToProps,
  { fetchUpdatedUser }
)(DashBoard);
