import React, { useState } from "react";
import { connect } from "react-redux";
import { updateProject } from "../../redux/action_creators/project";

function TodoPage({ project, updateProject, todo, userId }) {
  const [title, setTitle] = useState(todo.title);
  const [isUpdateTitle, setisUpdateTitle] = useState(false);

  const [date_due, setDateDue] = useState(todo.date_due);
  const [isUpdateDateDue, setisUpdateDateDue] = useState(false);

  const [description, setDescription] = useState();
  const [isUpdateDescription, setisUpdateDescription] = useState(false);

  const [users, setUsers] = useState(project.team);
  const [assigned_users, setassigned_users] = useState(todo.assigned_users);
  const [isUpdateassigned_users, setisUpdateassigned_users] = useState(false);

  const deleteTodo = () => {
    const todoId = todo._id;
    project.todos = project.todos.filter(todo => todo._id !== todoId);
    updateProject(project);
  };
  console.log("todo =", todo);
  return (
    <div>
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
          {todo.complited ? todo.assigned_users.find(user => user._id === userId) && <input
            type="submit"
            value="Mark as complited"
          /> : <span>complited</span>}
        </form>
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
              setTitle(project.title);
              setisUpdateTitle(false);
            }}
          />
        </form>
      )}
      <h3>Date creation: {new Date(todo.date_create).toLocaleDateString()}</h3>
      {!isUpdateDateDue && (
        <h3>Date Due: {new Date(date_due).toLocaleDateString()}</h3>
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
                  setUsers([...users, user]);
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
                setUsers(users.filter(user => user._id !== e.target.value));
                e.target.value = "";
                if (user) setassigned_users([...assigned_users, user]);
              }}
            />
            <datalist id="list-users">
              {users.map(user => (
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
                console.log("assigned_users =", assigned_users);
                const userlist = users.filter(
                  user => !tm.find(tm => tm._id === user._id)
                );
                console.log("userlist =", userlist);
                setUsers(userlist);
                setisUpdateassigned_users(false);
              }}
            />
          </form>
        )}
      </div>
    </div>
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
)(TodoPage);
