import React, { useState } from "react";
import './TodoPage.css'
import { connect } from "react-redux";
import { updateProject } from "../../redux/action_creators/project";
import { Link, withRouter } from "react-router-dom"

function TodoPage({ project, updateProject, todo, userId, history}) {
  const [title, setTitle] = useState(todo.title);
  const [isUpdateTitle, setisUpdateTitle] = useState(false);

  const [date_due, setDateDue] = useState(todo.date_due);
  const [isUpdateDateDue, setisUpdateDateDue] = useState(false);

  const [description, setDescription] = useState(todo.description);
  const [isUpdateDescription, setisUpdateDescription] = useState(false);

  const [users, setUsers] = useState(project.team);
  const [assigned_users, setassigned_users] = useState(todo.assigned_users);
  let datalist = users.filter(
    user => !assigned_users.find(team => team._id === user._id)
    )
  const [isUpdateassigned_users, setisUpdateassigned_users] = useState(false);

  const [showDelete, setShowDelete ] = useState(false)

  console.log("todo =", todo);
  return (
    <main className="todo-page">
      <Link to={`/project/${project._id}`}> {project.title} </Link>
      <form
          onSubmit={e => {
            e.preventDefault();
            const todoId = todo._id;
            const todos = project.todos.map(todo => {
              if (todo._id === todoId) {
                todo.complited = true;
              }
              return todo;
            });
            const update = { ...project, todos };
            updateProject(update);
            setisUpdateTitle(false);
          }}
        >
          {!todo.complited ? todo.assigned_users.find(user => user._id === userId) && <input
            type="submit"
            value="Mark as complited"
          /> : <span>complited</span>}
          {userId === project.admin && !showDelete && <input
            type="button"
            value="Delete the todo"
            onClick={() => {
              setShowDelete(true)
            }         
          }
          />}
          {userId === project.admin && showDelete && <div>
          <input
            type="button"
            value="Confirm delete todo"
            onClick={() => {
              const todoId = todo._id;
              project.todos = project.todos.filter(todo => todo._id !== todoId);
              updateProject(project);
              history.push(`/project/${project._id}`)
            }         
          }
          />
          <input
            type="button"
            value="Cancel"
            onClick={() => {
              setShowDelete(false)
            }         
          }
          />
          </div>}
        </form>
        <div className="element">
      {!isUpdateTitle && <h1>{title}</h1>}
      {!isUpdateTitle && (
        <button
          onClick={() => {
            setisUpdateTitle(true);
          }}
        >
          update
        </button>
      )}
      </div>
      {isUpdateTitle && (
        <form
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
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <input type="submit" value="update" />
          <input
            type="button"
            value="cancel"
            onClick={() => {
              setTitle(todo.title);
              setisUpdateTitle(false);
            }}
          />
        </form>
      )}
      <h3>Date creation: {new Date(todo.date_create).toLocaleDateString()}</h3>
      <div className="element">
      {!isUpdateDateDue && (
        <h3>Date Due: {date_due && new Date(date_due).toLocaleDateString()}</h3>
      )}
      {!isUpdateDateDue && (
        <button
          onClick={() => {
            setisUpdateDateDue(true);
          }}
        >
          update
        </button>
      )}
      </div>
      {isUpdateDateDue && (
        <form
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
            type="date"
            value={date_due}
            onChange={e => setDateDue(e.target.value)}
            required
          />
          <input type="submit" value="update" />
          <input
            type="button"
            value="cancel"
            onClick={() => {
              setDateDue(todo.date_due);
              setisUpdateDateDue(false);
            }}
          />
        </form>
      )}
 <div className="element">
      {!isUpdateDescription && <p>{todo.description}</p>}
      {!isUpdateDescription && (
        <button
          onClick={() => {
            setisUpdateDescription(true);
          }}
        >
          update
        </button>
      )}
      </div>
      {isUpdateDescription && (
        <form
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
          <input type="submit" value="update" />
          <input
            type="button"
            value="cancel"
            onClick={() => {
              setDescription(todo.description);
              setisUpdateDescription(false);
            }}
          />
        </form>
      )}
      <div className="team-container">
        {assigned_users.map(user => (
          <span className="team_item" key={user._id}>
            {user.username}
            {isUpdateassigned_users && (
              <span
                className="team-item-delete"
                id={user._id}
                onClick={e => {
                  const user = assigned_users.find(user => user._id === e.target.id);
                  setassigned_users(assigned_users.filter(user => user._id !== e.target.id));
                  datalist = [...users, user];
                }}
              >
                X
              </span>
            )}
          </span>
        ))}
        {!isUpdateassigned_users && (
          <button onClick={() => setisUpdateassigned_users(true)}>
            add/remove people
          </button>
        )}
        {isUpdateassigned_users && (
          <form
            onSubmit={(e) => {
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
            <input type="submit" value="Update" />
            <input
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
          </form>
        )}
      </div>
    </main>
  );
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    project: state.project,
    todo: state.project && state.project.todos.find(todo => todo._id === id),
    userId: state.user._id
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
