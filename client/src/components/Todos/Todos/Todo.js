import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



import { withRouter , Link} from 'react-router-dom'

function Todo({history, todo }) {
  
  
  return (
    <Link to={`/todo/${todo._id}`}>
    <section className="flex-row todo-body" data-aos="fade-up"
		//  onClick={history.push(`/todo/${todo._id}`)}
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
    </section>
    </Link>
  );
}



export default Todo
