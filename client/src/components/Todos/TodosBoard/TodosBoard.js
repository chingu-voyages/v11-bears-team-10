import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {connect} from 'react-redux'

import Todo from "../Todos/Todo";
import AddTodo from "../AddTodoForm";
import TodoView from "../TodoView";
import Portal from "../../../HOC/portal/portal";

const TodoPortal = Portal(TodoView);

function TodosBaord({todos}) {
  const [showModal, setShowModal] = useState(false);
  const [showPortal, setShowPortal] = useState(false);

  const openForm = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const displayPortal = () => setShowPortal(true);
  const hidePortal = () => setShowPortal(false);

  const todoListe = todos.map(todo => <Todo key={todo._id} todo={todo} showTodoPortal={displayPortal} />)

  return (
    <>
      <div className="add-todo  flex-col-centered" onClick={openForm}>
        <FontAwesomeIcon icon="plus-square" className="plus-todo" />
      </div>
      <AddTodo showForm={showModal} handleCloseForm={closeModal} />
      <TodoPortal showForm={showPortal} setOpen={hidePortal} />
      {/* <Todo todo={{title:'blabla'}} showTodoPortal={displayPortal} /> */}
      {todoListe}
    </>
  );
}

const mapStateToProps = state =>{
  return{
    todos : [...state.project.todos]
  }
}

export default connect(mapStateToProps)(TodosBaord);
