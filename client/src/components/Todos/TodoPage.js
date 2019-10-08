import React, { useState } from "react";
import "./TodoPage.css";
import { connect } from "react-redux";
import { updateProject } from "../../redux/action_creators/project";
import { Link, withRouter } from "react-router-dom";

function TodoPage({ project, updateProject, todo, userId, username, history }) {
  const isAdmin = userId === project.admin;
  const isCreatorOfTodo = userId === todo.created_by._id;
  const isAssignedUser = todo.assigned_users.find(user => user._id === userId);
  console.log({ isAdmin });
  console.log({ isCreatorOfTodo });
  console.log({ isAssignedUser });

  const [title, setTitle] = useState(todo.title);
  const [isUpdateTitle, setisUpdateTitle] = useState(false);

  const [date_due, setDateDue] = useState(todo.date_due);
  const [isUpdateDateDue, setisUpdateDateDue] = useState(false);

  const [description, setDescription] = useState(todo.description);
  const [isUpdateDescription, setisUpdateDescription] = useState(false);

  const users = project.team;
  const [assigned_users, setassigned_users] = useState(todo.assigned_users);
  let datalist = users.filter(
    user => !assigned_users.find(team => team._id === user._id)
  );
  const [isUpdateassigned_users, setisUpdateassigned_users] = useState(false);

  const [showDelete, setShowDelete] = useState(false);

  const [messageTitle, setTitleMessage] = useState("");
  const [messageText, setMessageText] = useState("");
  const [showAddMessage, setShowAddMessage] = useState(false);

  console.log("todo =", todo);
  return (
    <main className="todo-page-main">
      <Link className="project-title" to={`/project/${project._id}`}>
        {project.title}
      </Link>
      <div className="top-todo">
        <form
          onSubmit={e => {
            e.preventDefault();
            const todoId = todo._id;
            const todos = project.todos.map(todo => {
              if (todo._id === todoId) {
                todo.completed = true;
                todo.completed_by = {
                  _id: userId,
                  username
                };
                todo.date_completed = new Date();
                console.log({ todo });
              }
              return todo;
            });
            const update = { ...project, todos };
            updateProject(update);
            setisUpdateTitle(false);
          }}
        >
          {!todo.completed ? (
            isAssignedUser && (
              <button className="btn-completed" type="submit">
                Mark as
                <br />
                completed
              </button>
            )
          ) : (
            <div className="completed" title="Complited"></div>
          )}
        </form>

        <form>
          {(isAdmin || isCreatorOfTodo) && !showDelete && (
            <input
              type="button"
              value="Delete the todo"
              onClick={() => {
                setShowDelete(true);
              }}
            />
          )}

          {(isAdmin || isCreatorOfTodo) && showDelete && (
            <div>
              <input
                type="button"
                value="Confirm delete todo"
                onClick={() => {
                  const todoId = todo._id;
                  project.todos = project.todos.filter(
                    todo => todo._id !== todoId
                  );
                  updateProject(project);
                  history.push(`/project/${project._id}`);
                }}
              />
              <input
                type="button"
                value="Cancel"
                onClick={() => {
                  setShowDelete(false);
                }}
              />
            </div>
          )}
        </form>
      </div>

      <div style={{ textAlign: "right", marginTop: "1em" , textDecoration: "underline"}}>
        Created on {new Date(todo.date_create).toLocaleString()} by{" "}
        {username}
      </div>

      {!isUpdateTitle && (
        <div className="element">
          <label>Title: </label>
          <span className="text">{title}</span>
          {!todo.completed && (isAdmin || isCreatorOfTodo) && (
            <button
              className="btn-pencil"
              onClick={() => {
                setisUpdateTitle(true);
              }}
            />
          )}
        </div>
      )}

      {isUpdateTitle && (
        <form
          className="element"
          onSubmit={e => {
            e.preventDefault();
            const todoId = todo._id;
            const todos = project.todos.map(todo => {
              if (todo._id === todoId) {
                todo.title = title;
              }
              return todo;
            });
            const update = { ...project, todos };
            updateProject(update);
            setisUpdateTitle(false);
          }}
        >
          <label>Title: </label>
          <input
            className="text"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <input className="btn-approve" type="submit" value="" />
          <input
            className="btn-cancel"
            type="button"
            value=""
            onClick={() => {
              setTitle(todo.title);
              setisUpdateTitle(false);
            }}
          />
        </form>
      )}

      {!isUpdateDateDue && (
        <div className="element">
          <label>Date Due: </label>
          <span className="text">
            {date_due && new Date(date_due).toLocaleDateString()}
          </span>
          {!todo.completed && (isAdmin || isCreatorOfTodo) && (
            <button
              className="btn-pencil"
              onClick={() => {
                setisUpdateDateDue(true);
              }}
            />
          )}
        </div>
      )}
      {isUpdateDateDue && (
        <form
          className="element"
          onSubmit={e => {
            e.preventDefault();
            const todoId = todo._id;
            const todos = project.todos.map(todo => {
              if (todo._id === todoId) {
                todo.date_due = date_due;
              }
              return todo;
            });
            const update = { ...project, todos };
            updateProject(update);
            setisUpdateDateDue(false);
          }}
        >
          <label>Date Due:</label>
          <input
            className="text"
            type="date"
            value={date_due}
            onChange={e => setDateDue(e.target.value)}
            required
          />
          <input className="btn-approve" type="submit" value="" />
          <input
            className="btn-cancel"
            type="button"
            value=""
            onClick={() => {
              setDateDue(todo.date_due);
              setisUpdateDateDue(false);
            }}
          />
        </form>
      )}

      <div className="users-container">
        <label>Assigned users:</label>
        {assigned_users.map(user => (
          <span className="user_item" key={user._id}>
            {user.username}
            {isUpdateassigned_users && (
              <span
                className="user-item-delete"
                id={user._id}
                onClick={e => {
                  const user = assigned_users.find(
                    user => user._id === e.target.id
                  );
                  setassigned_users(
                    assigned_users.filter(user => user._id !== e.target.id)
                  );
                  datalist = [...users, user];
                }}
              >
                X
              </span>
            )}
          </span>
        ))}
        {!todo.completed &&
          !isUpdateassigned_users &&
          (isAdmin || isCreatorOfTodo) && (
            <button
              className="btn-add-users"
              onClick={() => setisUpdateassigned_users(true)}
            >
              assign/remove members
            </button>
          )}
        {isUpdateassigned_users && (
          <form
            onSubmit={e => {
              e.preventDefault();
              const todoId = todo._id;
              const todos = project.todos.map(todo => {
                if (todo._id === todoId) {
                  todo.assigned_users = [...assigned_users];
                }
                return todo;
              });
              const update = { ...project, todos };
              updateProject(update);
              setisUpdateassigned_users(false);
            }}
          >
            <input
              className="data-list"
              list="list-users"
              autoFocus
              onChange={e => {
                console.log("----------onchange---------");
                const user = users.find(user => user._id === e.target.value);
                datalist = datalist.filter(user => user._id !== e.target.value);
                e.target.value = "";
                if (user) setassigned_users([...assigned_users, user]);
              }}
            />
            <datalist id="list-users">
              {datalist.map(user => (
                <option key={user._id} value={user._id}>
                  {user.username}
                </option>
              ))}
            </datalist>
            <br />
            <input className="btn-approve" type="submit" value="" />
            <input
              className="btn-cancel"
              type="button"
              value=""
              onClick={() => {
                console.log("----------cancel---------");
                const tm = todo.assigned_users;
                setassigned_users(tm);
                console.log("assigned_users =", todo.assigned_users);

                datalist = users.filter(
                  user => !tm.find(tm => tm._id === user._id)
                );

                setisUpdateassigned_users(false);
              }}
            />
          </form>
        )}
      </div>

      {!isUpdateDescription && (
        <div className="wraper-description">
          <label>Description:</label>
          <p className="text-description">{todo.description}</p>

          {!todo.completed && (isAdmin || isCreatorOfTodo) && (
            <button
              className="btn-pencil"
              onClick={() => {
                setisUpdateDescription(true);
              }}
            />
          )}
        </div>
      )}

      {isUpdateDescription && (
        <form
          className="wraper-description"
          onSubmit={e => {
            e.preventDefault();
            const todoId = todo._id;
            const todos = project.todos.map(todo => {
              if (todo._id === todoId) {
                todo.description = description;
              }
              return todo;
            });
            const update = { ...project, todos };
            updateProject(update);
            setisUpdateDescription(false);
          }}
        >
          <label>Description:</label>
          <textarea
            className="textarea"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
          <div>
            <input className="btn-approve" type="submit" value="" />
            <input
              className="btn-cancel"
              type="button"
              value=""
              onClick={() => {
                setDescription(todo.description);
                setisUpdateDescription(false);
              }}
            />
          </div>
        </form>
      )}

      {todo.completed && (
        <div style={{ margin: "1em 0", textDecoration: "underline" }}>
          Closed by: {todo.completed_by.username} on{" "}
          {todo.date_completed &&
            new Date(todo.date_completed).toLocaleString()}
        </div>
      )}

      <div>
        <div style={{borderBottom:"thin solid"}}>Messages ({todo.messages.length}):</div>
        {todo.messages.map(msg => (
          <div key={msg._id} className="message-container">
            <div className="message-top">
            <div className="message-username">{msg.user.username}</div>
            <div>{new Date(msg.date_create).toLocaleString()}</div>
            </div>
           <div className="message-title">{msg.title}</div>
            <p className="message-text">{msg.text}</p>
          </div>
        ))}
        {!showAddMessage &&
          !todo.completed &&
          (isAdmin || isAssignedUser || isCreatorOfTodo) && (
            <button
              className="btn-show-add-message"
              onClick={e => {
                setShowAddMessage(true);
              }}
            >
              Add a message
            </button>
          )}
      </div>

      {showAddMessage && (
        <form
          className="todo-add-message"
          onSubmit={e => {
            e.preventDefault();
            if(!messageText) return
            const todoId = todo._id;
            const message = {
              title: messageTitle,
              text: messageText,
              user: {
                _id: userId,
                username
              }
            };
            const todos = project.todos.map(todo => {
              if (todo._id === todoId) {
                todo.messages.push(message);
              }
              return todo;
            });
            const update = { ...project, todos };
            setMessageText("");
            setTitleMessage("");
            updateProject(update);
            setShowAddMessage(false);
          }}
        >
          <input
            type="text"
            required
            placeholder="Title"
            value={messageTitle}
            onChange={e => {
              setTitleMessage(e.target.value);
            }}
          />
          <textarea
            value={messageText}
            onChange={e => {
              setMessageText(e.target.value);
            }}
          ></textarea>
          <div>
            <input type="submit" value="Add message" />
            <input
              type="button"
              value="close"
              onClick={() => {
                setMessageText("");
                setTitleMessage("");
                setShowAddMessage(false);
              }}
            />
          </div>
        </form>
      )}
    </main>
  );
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    project: state.project,
    todo: state.project && state.project.todos.find(todo => todo._id === id),
    userId: state.user._id,
    username: state.user.username
  };
};

const mapDispachToProps = dispach => {
  return {
    updateProject: project => dispach(updateProject(project))
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(withRouter(TodoPage));
