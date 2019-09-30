import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Todo from "../Todos/Todo";
import AddTodo from "../AddTodoForm";
import TodoView from "../TodoView";
import Portal from "../../../HOC/portal/portal";

const TodoPortal = Portal(TodoView);

function TodosBaord({project}) {
  const [showModal, setShowModal] = useState(false);
  const [showPortal, setShowPortal] = useState(false);

  const openForm = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const displayPortal = () => setShowPortal(true);
  const hidePortal = () => setShowPortal(false);

  return (
    <>
      <div className="add-todo  flex-col-centered" onClick={openForm}>
        <FontAwesomeIcon icon="plus-square" className="plus-todo" />
      </div>
      <AddTodo showForm={showModal} handleCloseForm={closeModal} projectData={project} />
      <TodoPortal showForm={showPortal} setOpen={hidePortal} />
      <Todo showTodoPortal={displayPortal} />
    </>
  );
}

export default TodosBaord;
