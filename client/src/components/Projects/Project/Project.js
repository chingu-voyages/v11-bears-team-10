import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Button, Col } from "react-bootstrap";

import { connect } from "react-redux";
import { getProject } from "../../../redux/action_creators/project";

import Todos from "../../Todos/Todos/Todos";
import Messages from "../../Messages/Messages";
import AddTodoForm from "../../Todos/AddTodoForm";
import AddMessageForm from "../../Messages/AddMessageForm";

function Project(props) {
  const { project, dispatch } = props;
  const { id } = props.match.params;

  const [showTodos, setShowTodos] = useState(true);
  const [showTodoModal, setShowTodoModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  // const [buttonText, setButtonText] = useState("addTodo");

  const closeTodoModal = () => setShowTodoModal(false);
  const closeMessageModal = () => setShowMessageModal(false);
  const openForm = () => {
    if (showTodos) setShowTodoModal(true);
    if (!showTodos) setShowMessageModal(true);
  };

  const renderBody = e => {
    let target = e.target.innerHTML;
    if (target === "Todos") {
      setShowTodos(true);
     // setButtonText("addTodo");
    } else if (target === "Messages") {
      setShowTodos(false);
     // setButtonText("addMessage");
    }
  };

  useEffect(() => {
    console.log("use effect getproject");
    dispatch(getProject(id));
  }, [id, dispatch]);

  return !project ? (
    <div>loading...</div>
  ) : (
    <div className="projectbody">
      <nav className="project-nav flex-row" onClick={renderBody}>
        <div id="todo-nav" >
          Todos
        </div>
        <div id="message-nav" >
          Messages
        </div>
        <div id="doc-nav" >
          Documents
        </div>
        {/* <div> */}
          <div
						onClick={openForm}
						id="edit-project"
            // variant="dark-purple"
            // className="mt-2 mb-2"
          >
           +
          </div>
        {/* </div> */}
      </nav>
      <AddTodoForm showForm={showTodoModal} handleCloseForm={closeTodoModal} />
      <AddMessageForm
        showForm={showMessageModal}
        handleCloseForm={closeMessageModal}
      />
      <section className="projects-items flex-col-centered">
        <div className="project-items-container">
          {showTodos ? <Todos project={project.todos} /> : <Messages />}
        </div>
      </section>
    </div>
  );
}
const mapStatToProps = state => {
  return {
    project: state.project
  };
};

export default connect(mapStatToProps)(Project);
