import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TodoList from "../TodoList/TodoList";

function TodosBaord() {
  return (
    <>
		   <div className="add-todo  flex-col-centered"
			  onClick={() => console.log('add todo list')}
			 >
         <FontAwesomeIcon icon="plus-square" className="plus-todo" />
			 </div>
      <TodoList />
      <TodoList />
      <TodoList />
      <TodoList />
    </>
  );
}

export default TodosBaord;