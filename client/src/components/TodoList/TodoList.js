import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TodoList() {
  const [todoData, setTodoData] = useState({title: 'Test List Item'})

  return (
    <section
      className="flex-row todo-body"
      data-aos="fade-up"
    >
			<div className="projects-summary flex-col project-list">
			<span className="flex-row">
				<span className="flex-col">
					<h3>{todoData.title}</h3>
					<span className="date">Sept 16 2019 12:00AM</span>
				</span>
        
				<div className="flex-row-centered">
				  <FontAwesomeIcon icon="tasks"  className="todo-icon"/>
					<span>0/0 Completed</span>
				</div>
      </span>
      <hr />
			</div>
			<div className="close-todo flex-col-centered">
				x
			</div>
    </section>
  );
}

export default TodoList;
