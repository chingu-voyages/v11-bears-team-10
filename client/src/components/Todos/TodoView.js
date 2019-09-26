import React, { useState } from "react";
import onClickOutside from "react-onclickoutside";

function TodoView({ showForm, setOpen }) {
  const [todoData] = useState({
    title: "Test List Item",
    todos: new Set([
      "setup app folder",
      "install dependencies",
      "notify team members"
    ])
  });


  TodoView.handleClickOutside = () => setOpen();

  return showForm ? (
    <>
      <div className="flex-col todos-portal">
        <div className="portal-wrapper flex-col">
          <h3>{todoData.title}</h3>
          <hr />
          <span>
            {" "}
            <strong>Last Update:</strong> Sept 16 2019 12:00AM{" "}
          </span>
        </div>
        <form className="flex-col portal-form">
          <label>Create Todo</label>
          <div>
            <input type="text" className="todo-input" />
            <button type="submit">ADD ITEM</button>
          </div>
        </form>
        <div className="flex-col checkboxes">
          {[...todoData.todos].map((todo, i) => {
            return (
              <div className="flex-row-centered" key={`${todo}`}>
                <input
                  type="checkbox"
                  name={`todo-${i}`}
									value={todo}
                />{" "}
                <span>todo</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  ) : null;
}

const clickOutsideConfig = {
  handleClickOutside: () => TodoView.handleClickOutside
};

export default onClickOutside(TodoView, clickOutsideConfig);
