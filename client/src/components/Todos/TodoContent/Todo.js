import React, { useState } from "react";


function TodoContent({ showForm }) {
  const [todoData] = useState({
    title: "Test List Item",
    todos: new Set([
      "setup app folder",
      "install dependencies",
      "notify team members"
    ])
  });


  return showForm ? (
    <>
      <div className="flex-col todo-content-body">
        <div className="flex-row  content-body-head" >
					<span>Assigned To: {`user`}</span>
          <span>
            {" "}
            <strong>Last Update:</strong> Sept 16 2019 12:00AM{" "}
          </span>
        </div>
				<hr />
				<p>Update Todo checklist Form here</p>
        {/* <form className="flex-col">
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
        </div> */}
      </div>
    </>
  ) : null;
}

export default TodoContent;
