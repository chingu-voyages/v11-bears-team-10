import React, { useState } from "react";
import { connect } from "react-redux";

import {
  updateProject,
  deleteProject
} from "../../../redux/action_creators/project";
import AppPlaceholder from "../../../AppPlaceholder";
import AddTodo from "../../Todos/AddTodoForm";
import AddMessageList from "../../Messages/AddMessageList";

import { withRouter } from "react-router-dom";

import "./projectBoard.css";

function ProjectBoard(props) {
  if (!props.project) {
    return <AppPlaceholder text="Loading..." />;
  } else {
    return <Project {...props} />;
  }
}
function Project(props) {
  const {
    project,
    usersList,
    updateProject,
    deleteProject,
    history,
    isAdmin
  } = props;


  const [showModaltodo, setShowModaltodo] = useState(false);
  const closeModaltodo = () => setShowModaltodo(false);
  const [showModalmessage, setShowModalmessage] = useState(false);
  const closeModalmessage = () => setShowModalmessage(false);

  const [team, setTeam] = useState(project.team);
  let users = usersList.filter(
    user => !team.find(team => team._id === user._id)
  );
  const admin = project.team.find(user => user._id === project.admin);
  const [isUpdateTeam, setisUpdateTeam] = useState(false);

  const [title, setTitle] = useState(project.title);
  const [isUpdateTitle, setisUpdateTitle] = useState(false);

  const [description, setDescription] = useState(project.description);
  const [isUpdateDescription, setisUpdateDescription] = useState(false);

  const [textDelete, setTextDelete] = useState("");

  const [opts, setShowOpts] = useState(false);
  const [editBtn, setShowEditBtn] = useState(false);
  const [formDelete, setFormDelete] = useState(false);

  return (
    <main
      className="main-project"
      onClick={() => {
        if (opts === true) setShowOpts(false);
      }}
    >
      <section className="sect-project">
        <div className="sect-project-header">
          {project.completed ? (
            <div className="sect-project-completed"></div>
          ) : (
            <div></div>
          )}
          {isAdmin && (
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
                    const update = {
                      ...project,
                      completed: !project.completed,
                      date_completed: new Date()
                    };
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
          <h1>{title}</h1>
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
              const update = { ...project, title };
              updateProject(update);
              setisUpdateTitle(false);
            }}
          >
            sect-project-message-item
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
          Created by {admin.username} on{" "}
          {new Date(project.date_create).toLocaleString()}
        </div>

        <div className="sect-project-description">
          <div className="sect-project-description-wraper">
            {!isUpdateDescription && <p>{project.description}</p>}
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
                const update = { ...project, description };
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
                    setDescription(project.description);
                    setisUpdateDescription(false);
                  }}
                />
              </div>
            </form>
          )}
        </div>

        <div className="sect-project-team-title">Team members:</div>
        <div className="sect-project-team">
          {team.map(user => (
            <div className="team_item" key={user._id}>
              <span>{user.username}</span>
              {isUpdateTeam && user._id !== project.admin && (
                <span
                  className="team-item-delete"
                  id={user._id}
                  onClick={e => {
                    const user = team.find(user => user._id === e.target.id);
                    setTeam(team.filter(user => user._id !== e.target.id));
                    users = [...users, user];
                  }}
                >
                  x
                </span>
              )}
            </div>
          ))}
          {editBtn && !isUpdateTeam && (
            <button className="btn-edit" onClick={() => setisUpdateTeam(true)}>
              add/remove people
            </button>
          )}
        </div>

        {isUpdateTeam && (
          <form
            className="sect-project-form-team"
            onSubmit={() => {
              const update = { ...project, team };
              updateProject(update);
              setisUpdateTeam(false);
            }}
          >
            <input
              list="list-users"
              onChange={e => {
                console.log("----------onchange---------");
                const user = users.find(user => user._id === e.target.value);
                users = users.filter(user => user._id !== e.target.value);
                e.target.value = "";
                if (user) setTeam([...team, user]);
              }}
            />
            <datalist id="list-users">
              {users.map(user => (
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
                  const tm = project.team;
                  setTeam(tm);
                  users = usersList.filter(
                    user => !tm.find(tm => tm._id === user._id)
                  );
                  setisUpdateTeam(false);
                }}
              />
            </div>
          </form>
        )}
        {project.completed && (
          <div>
            Project completed on:{" "}
            {new Date(project.date_completed).toLocaleString()}
          </div>
        )}
        {formDelete && (
          <form
            className="sect-project-form-delete"
            onSubmit={e => {
              e.preventDefault();
              deleteProject(project._id);
              history.push("/dashboard");
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
              disabled={project.title !== textDelete}
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
      <section className="sect-project-todos">
        <h2 className="sect-title">Todos</h2>
        <div
          className="sect-project-btn-add"
          onClick={() => {
            setShowModaltodo(true);
          }}
        >
          +
        </div>
        {project.todos.map(todo => (
          <div
            className="sect-project-todo-item"
            key={todo._id}
            onClick={() => {
              history.push(`/todo/${todo._id}`);
            }}
          >
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            {todo.completed && <div>Completed</div>}
          </div>
        ))}
      </section>
      <section className="sect-project-messages">
        <h2 className="sect-title">Discussion</h2>
        <div
          className="sect-project-btn-add"
          onClick={() => {
            setShowModalmessage(true);
          }}
        >
          +
        </div>
        {project.messages.map(message => (
          <div className="sect-project-message-item" key={message._id}>
            <h2>{message.user.username}</h2>
            <h3>{message.title}</h3>
            <p>{message.text}</p>
            <p>{new Date(message.date_create).toLocaleString()}</p>
          </div>
        ))}
      </section>
      <AddTodo showForm={showModaltodo} handleCloseForm={closeModaltodo} />
      <AddMessageList
        showForm={showModalmessage}
        handleCloseForm={closeModalmessage}
      />
    </main>
  );
}
const mapStatToProps = state => {
  return {
    project: state.project,
    usersList: state.usersList,
    isAdmin:
      state.project &&
      state.project.admin.toString() === state.user._id.toString()
  };
};
const mapDistpatchToProps = dispatch => {
  return {
    updateProject: project => dispatch(updateProject(project)),
    deleteProject: project => dispatch(deleteProject(project))
  };
};

export default connect(
  mapStatToProps,
  mapDistpatchToProps
)(withRouter(ProjectBoard));
