import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {connect} from 'react-redux'
import { updateProject } from "../../../redux/action_creators/project";

function Todo({showTodoPortal, todo, project, updateProject}) {
  const deleteTodo = () => {
      const todoId = todo._id;
      project.todos = project.todos.filter(todo => todo._id !== todoId);
      updateProject(project)
  }
  
  return (
    <section className="flex-row todo-body" data-aos="fade-up"
		 onClick={showTodoPortal}
		>
      <div className="projects-summary flex-col project-list">
        <span className="flex-row">
          <span className="flex-col">
            <h3>{todo.title}</h3>
            <span className="date">{todo.date_create}</span>
          </span>

          <div className="flex-row-centered">
            <FontAwesomeIcon icon="tasks" className="todo-icon" />
            <span>{todo.completed && 'completed'}</span>
          </div>
        </span>
        <hr />
      </div>
      <div className="close-todo flex-col-centered" onClick={deleteTodo}>X</div>
    </section>
  );
}

const mapStateToProps = state => {
  return {
    project: { ...state.project, todos: [...state.project.todos] }
  };
};

const mapDispachToProps = dispach => {
  return {
    updateProject: project => dispach(updateProject(project))
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(Todo);
