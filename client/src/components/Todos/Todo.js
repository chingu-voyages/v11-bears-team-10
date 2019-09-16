import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TodoList() {
  const [todoData, setTodoData] = useState({title: 'Test List'})

  return (
    <section
      className="projects-summary project-list flex-col"
      data-aos="fade-up"
    >
      <span className="flex-row">
        <h3>{todoData.title}</h3>
				<div className="flex-row-centered">
				  <FontAwesomeIcon icon="tasks"  className="todo-icon"/>
					<span>0/0 Completed</span>
				</div>
      </span>
      <hr />
    </section>
  );
}

export default TodoList;
