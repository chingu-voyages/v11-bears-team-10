import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TodoList from "../TodoList/TodoList";
import AddTodo from "../AddTodo";
import Todos from "../Todos";
import Portal from "../../../HOC/portal/portal";

const TodoPortal = Portal(Todos);

function TodosBaord() {
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
      <AddTodo showForm={showModal} handleCloseForm={closeModal} />
      <TodoPortal showForm={showPortal} setOpen={hidePortal} />
      <TodoList showTodoPortal={displayPortal} />
      <TodoList showTodoPortal={displayPortal} />
      <TodoList showTodoPortal={displayPortal} />
      <TodoList showTodoPortal={displayPortal} />
    </>
  );
}

export default TodosBaord;
