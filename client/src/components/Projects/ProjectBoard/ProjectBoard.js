import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { getProject } from "../../../redux/action_creators/project";
import TodosBoard from "../../Todos/TodosBoard/TodosBoard";
import MessageBoard from "../../Messages/MessageBoard";
import AppPlaceholder from "../../../AppPlaceholder";

function ProjectBoard(props) {
  const { project, dispatch} = props;
  const { id } = props.match.params;

  const [showMessages, setShowMessages] = useState(false);
	const [showTodos, setShowTodos] = useState(true);

  useEffect(() => {
    console.log('use effect getproject')
    if(id)
      dispatch(getProject(id));
  }, [id, dispatch]);

  return !project ? (
    <AppPlaceholder text="Loading..." />
  ) : (
    <div className="projectsbody">
      <section className="board-body flex-col-centered">
        <div className="content" data-aos="fade-in">
          <section className="projects-summary flex-col" data-aos="fade-up">
            <span>
              <h3>{project.title}</h3>
            </span>
            <hr />
            <section className="flex-row projects-items">
              <div className="flex-row">
                <div className="summary-icon flex-row-centered summary-icon-clicked">
                  <FontAwesomeIcon icon="list-ul" />
                </div>
                <div
                   className={`summary ${showTodos ? "clicked" : ""}`}
                    onClick={() => {
                      setShowMessages(false);
                      setShowTodos(true);
                    }}
                >
                  <h3>Todos</h3>
                </div>
              </div>
              <div className="flex-row">
                <div className="summary-icon flex-row-centered">
                  <FontAwesomeIcon icon="sticky-note" />
                </div>
                <div
                  className={`summary ${showMessages ? "clicked" : ""}`}
                    onClick={() => {
                      setShowTodos(false);
                      setShowMessages(true);
                    }}
                >
                  <h3>Message Board</h3>
                </div>
              </div>
            </section>
          </section>
          <section className="flex-col" data-aos="fade-up">
            {showMessages ? (
              <MessageBoard />
            ) : (
              <TodosBoard project={project.todos} />
            )}
          </section>
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

export default connect(mapStatToProps)(ProjectBoard);
