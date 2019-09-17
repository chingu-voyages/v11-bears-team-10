import React, { useState } from "react";


import Header from "./../components/Header/Header";
import ProjectCard from "./../components/Card/Card";
import AddProjectCard from "./../components/Card/AddProjectCard";
import AddProjectForm from './../container/Modals/AddProjectForm';

export default function DashBoards(props) {
  const [projectsData, setProjectsData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const showForm = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="dashboard">
      <Header />
      <section className="dash-body flex-col-centered">
        <div className="content" data-aos="fade-in">
          <section className="projects-summary flex-col" data-aos="fade-up">
            <span>
              <h3>Projects Summary</h3>
            </span>
            <hr />
            <section className="flex-row summary-cards">
              <div className="summary">
                <h1>{projectsData.totalProjects || 0}</h1>
                <h3>Projects</h3>
              </div>
              <div className="summary">
                <h1>{projectsData.totalConnections || 0}</h1>
                <h3>Connections</h3>
              </div>
              <div className="summary">
                <h1>{projectsData.finishedProjects || 0}</h1>
                <h3>Finished Projects</h3>
              </div>
            </section>
          </section>
          <section className="projects-shelf flex-row" data-aos="fade-up">
            <AddProjectCard handleShowModal={showForm} />
            <AddProjectForm showForm={showModal} handleCloseForm={closeModal} />
            <ProjectCard />
          </section>
        </div>
      </section>
    </div>
  );
}
