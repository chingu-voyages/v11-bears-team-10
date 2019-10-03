import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {connect} from 'react-redux'
import { updateProject } from "../../../redux/action_creators/project";

import TodoContent from '../TodoContent/Todo'

function TodoItem({todo, project, updateProject}) {
  const [showForm, setShowForm] = useState(false)

  const deleteTodo = () => {
      const todoId = todo._id;
      project.todos = project.todos.filter(todo => todo._id !== todoId);
      updateProject(project)
	}
	
	const toggleContent = () => {
		showForm ? setShowForm(false) : setShowForm(true)   
	}
  
  return (
		<div className="flex-col-centered todo-item-wrapper">
		  <section className="flex-col todo-item-body"
			 onClick={toggleContent}
			>
       <div className="item-top flex-row">
				 <div id="initials" className="flex-col-centered">
          {'AO'}
				 </div>
				 <div
					 onClick={deleteTodo}
				 >
					 <FontAwesomeIcon icon="times-circle" className="close-todo-item" />
				 </div>
			 </div>
			 <hr />
       <div className="item-bottom">
			 <div>
			   <h4>{todo.title}</h4>
				 <span className="date">{todo.date_create}</span>
			 </div>
			   <span>{todo.completed && 'completed'}</span>
			 </div>
		</section>
		<TodoContent  showForm={showForm} />
		</div>
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
)(TodoItem);