import React, { useState } from "react";
import "./TodoPage.css";
import { connect } from "react-redux";
import { updateProject } from "../../redux/action_creators/project";
import { Link, withRouter } from "react-router-dom";

function TodoPage({ project, updateProject, todo, userId, username, history }) {
  const isAdmin = userId === project.admin;
  const isCreatorOfTodo = userId === todo.created_by._id;
  const isAssignedUser = todo.assigned_users.find(user => user._id === userId);

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

  const [textDelete, setTextDelete] = useState("");

  const [messageTitle, setTitleMessage] = useState("");
  const [messageText, setMessageText] = useState("");
  const [showAddMessage, setShowAddMessage] = useState(false);

  const [opts, setShowOpts] = useState(false);
  const [editBtn, setShowEditBtn] = useState(false);
  const [formDelete, setFormDelete] = useState(false);

  return (
    <main
      className="todo-page-main"
      onClick={() => {
        if (opts === true) setShowOpts(false);
      }}
    >
      <section className="sect-todo">
        <Link to={`/project/${project._id}`}>
          <div className="link-project-title">{project.title}-Todo</div>
        </Link>
        <div className="sect-project-header">
          {todo.completed ? (
            <div className="sect-project-completed"></div>
          ) : (
            <div></div>
          )}
          {(isAdmin || isCreatorOfTodo) && (
            <div
              className="sect-project-opts-wraper"
              onClick={() => {
                setShowOpts(!opts);
              }}
            >
              <div className="sect-project-btn-opts"></div>
              <div className={`sect-project-opts ${!opts && "opts-hide"}`}>
                <div
                  className="sect-project-opts-item"
                  onClick={() => {
                    const todoId = todo._id;
                    const todos = project.todos.map(todo => {
                      if (todo._id === todoId) {
                        todo.completed = !todo.completed;
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
                  }}
                >
                  Mark as Complete
                </div>
                <div
                  className="sect-project-opts-item"
                  onClick={() => {
                    setShowEditBtn(!editBtn);
                  }}
                >
                  Edit
                </div>
                <div
                  className="sect-project-opts-item"
                  onClick={() => {
                    setFormDelete(true);
                  }}
                >
                  Delete
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="sect-project-title">
          <h1>{todo.title}</h1>
          {editBtn && !isUpdateTitle && (
            <button
              className="btn-edit"
              onClick={() => {
                setisUpdateTitle(true);
              }}
            >
              Edit
            </button>
          )}
        </div>

        {isUpdateTitle && (
          <form
            className="sect-project-form-title-update"
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
            <input
              className="input-text"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              autoFocus
            />
            <div className="btns-update-wraper">
              <input className="btn-save" type="submit" value="Save" />
              <input
                className="btn-cancel"
                type="button"
                value="cancel"
                onClick={() => {
                  setTitle(project.title);
                  setisUpdateTitle(false);
                }}
              />
            </div>
          </form>
        )}
        <div className="sect-project-creator">
          Created by {username} on {new Date(todo.date_create).toLocaleString()}
        </div>

        <div className="sect-project-description">
          <div className="sect-project-description-wraper">
            {!isUpdateDescription && <p>{todo.description}</p>}
            {editBtn && !isUpdateDescription && (
              <button
                className="btn-edit"
                onClick={() => {
                  setisUpdateDescription(true);
                }}
              >
                Edit
              </button>
            )}
          </div>
          {isUpdateDescription && (
            <form
              className="sect-project-form-description"
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
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
              />
              <div className="btns-update-wraper">
                <input className="btn-save" type="submit" value="Save" />
                <input
                  className="btn-cancel"
                  type="button"
                  value="cancel"
                  onClick={() => {
                    setDescription(todo.description);
                    setisUpdateDescription(false);
                  }}
                />
              </div>
            </form>
          )}
        </div>

        <div className="sect-project-title">
          <span>Date Due: </span>
          <span className="text">
            {date_due && new Date(date_due).toLocaleDateString()}
          </span>
          {editBtn && !isUpdateTitle && (
            <button
              className="btn-edit"
              onClick={() => {
                setisUpdateDateDue(true);
              }}
            >
              Edit
            </button>
          )}
        </div>

        {isUpdateDateDue && (
          <form
            className="sect-project-form-title-update"
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
            <input
              className="text"
              type="date"
              value={date_due}
              onChange={e => setDateDue(e.target.value)}
              required
            />
            <input className="btn-save" type="submit" value="Save" />
            <input
              className="btn-cancel"
              type="button"
              value="Cancel"
              onClick={() => {
                setDateDue(todo.date_due);
                setisUpdateDateDue(false);
              }}
            />
          </form>
        )}

        <div className="sect-project-team-title">Assigned users:</div>
        <div className="sect-project-team">
          {assigned_users.map(user => (
            <div className="team_item" key={user._id}>
              <span>{user.username}</span>
              {isUpdateassigned_users && (
                <span
                  className="team-item-delete"
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
                  x
                </span>
              )}
            </div>
          ))}
          {editBtn && !isUpdateassigned_users && (
            <button
              className="btn-edit"
              onClick={() => setisUpdateassigned_users(true)}
            >
              add/remove people
            </button>
          )}
        </div>

        {isUpdateassigned_users && (
          <form
            className="sect-project-form-team"
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
            <div className="btns-update-wraper">
              <input className="btn-save" type="submit" value="Save" />
              <input
                className="btn-cancel"
                type="button"
                value="Cancel"
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
            </div>
          </form>
        )}

        {todo.completed && (
          <div>
            Closed by: {todo.completed_by.username} on{" "}
            {todo.date_completed &&
              new Date(todo.date_completed).toLocaleString()}
          </div>
        )}
        {formDelete && (
          <form
            className="sect-project-form-delete"
            onSubmit={e => {
              const todoId = todo._id;
              project.todos = project.todos.filter(todo => todo._id !== todoId);
              updateProject(project);
              history.push(`/project/${project._id}`);
            }}
          >
            <input
              type="text"
              value={textDelete}
              onChange={e => setTextDelete(e.target.value)}
              placeholder="Title of the project"
            />
            <input
              className="btn-save"
              type="submit"
              value="Delete"
              disabled={todo.title !== textDelete}
            />
            <input
              className="btn-cancel"
              type="button"
              value="cancel"
              onClick={() => {
                setTextDelete("");
                setFormDelete(false);
              }}
            />
          </form>
        )}
      </section>

      <section className="sect-todo-messages">
        <div>
          <div style={{ borderBottom: "thin solid", marginBottom: "1em" }}>
            Messages ({todo.messages.length}):
          </div>
          {!todo.completed && (isAdmin || isAssignedUser || isCreatorOfTodo) && (
            <div
              className="sect-project-btn-add"
              onClick={() => {
                setShowAddMessage(true);
              }}
            >
              +
            </div>
          )}
          {todo.messages.map(msg => (
            <div key={msg._id} className="sect-project-message-item">
              <div className="message-top">
                <div className="message-username">{msg.user.username}</div>
                <div>{new Date(msg.date_create).toLocaleString()}</div>
              </div>
              <div className="message-title">{msg.title}</div>
              <p className="message-text">{msg.text}</p>
            </div>
          ))}
        </div>

        {showAddMessage && (
          <form
            className="sect-project-form-description"
            onSubmit={e => {
              e.preventDefault();
              if (!messageText) return;
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
            <div className="btns-update-wraper">
              <input className="btn-save" type="submit" value="Save" />
              <input
                className="btn-cancel"
                type="button"
                value="close"
                onClick={() => {
                  setMessageText("");
                  setTitleMessage("");
                  setShowAddMessage(false);
                }}
              />
              message-container
            </div>
          </form>
        )}
      </section>
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
