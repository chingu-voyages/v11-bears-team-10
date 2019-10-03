import React from "react";
import {connect} from 'react-redux'

import Todo from "../TodoItem/TodoItem";


function Todos({todos}) {
  const todoListe = todos.map(todo => <Todo key={todo._id} todo={todo} />)
  return (
    <>
      {todoListe}
    </>
  );
}

const mapStateToProps = state =>{
  return{
    todos : [...state.project.todos]
  }
}

export default connect(mapStateToProps)(Todos);