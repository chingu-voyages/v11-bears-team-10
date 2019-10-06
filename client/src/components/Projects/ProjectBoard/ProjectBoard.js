import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";

import { updateProject, deleteProject } from "../../../redux/action_creators/project";
import TodosBoard from "../../Todos/TodosBoard/TodosBoard";
import MessageBoard from "../../Messages/MessageBoard";
import AppPlaceholder from "../../../AppPlaceholder";

import { withRouter } from "react-router-dom";

import "./projectBoard.css";

function ProjectBoard(props) {
  if(!props.project || !props.usersList){
   return <AppPlaceholder text="Loading..." />
  }else{
    return <Project {...props} />
  }
}
function Project(props){
  const { project, usersList, updateProject, deleteProject, history, isAdmin } = props;
  console.log('---------project---------', project)

  const [showMessages, setShowMessages] = useState(false);
  const [showTodos, setShowTodos] = useState(true);

  
  const [team, setTeam] = useState(project.team);
  let users = usersList.filter(
    user => !team.find(team => team._id === user._id)
    )
  console.log('userlist =', usersList)
  // const [users, setUsers] = useState([...props.usersList]);
  console.log('team =', team)
  console.log('users =', users)
  const [isUpdateTeam, setisUpdateTeam] = useState(false);

  const [title, setTitle] = useState(project.title);
  const [isUpdateTitle, setisUpdateTitle] = useState(false);

  const [description, setDescription] = useState(project.description);
  const [isUpdateDescription, setisUpdateDescription] = useState(false);

  const [textDelete, setTextDelete] = useState("");
  const [projecetDelete, setProjectDelete] = useState(false);

  return(
    <div className="projectsbody">
      <section className="board-body flex-col-centered">
      {isAdmin && !projecetDelete && (
        <button
          onClick={() => {
            setProjectDelete(true);
          }}
        >
          Delete Project
        </button>
      )}
      {projecetDelete && (
        <form
          onSubmit={e => {
            e.preventDefault();
            deleteProject(project._id)
            setisUpdateTitle(false);
            history.push('/dashboard')
          }}
        >
          <input
            type="text"
            value={textDelete}
            onChange={e => setTextDelete(e.target.value)}
            placeholder="Type the title of the project to delete"
          />
          <input type="submit" value="Delete" disabled = {title !== textDelete} />
          <input
            type="button"
            value="cancel"
            onClick={() => {
              setTextDelete('');
              setProjectDelete(false);
            }}
          />
        </form>
      )}
        <div className="content" data-aos="fade-in">
          <section className="projects-summary flex-col" data-aos="fade-up">
            <div>
              <div style={{ display: "flex" }}>
                {!isUpdateTitle && <h1>{title}</h1>}
                {isAdmin && !isUpdateTitle && (
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
                      const update = { ...project, title };
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
              </div>
              {!isUpdateDescription && <p>{project.description}</p>}
              {isAdmin && !isUpdateDescription && (
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
                  <input type="submit" value="update" />
                  <input
                    type="button"
                    value="cancel"
                    onClick={() => {
                      setDescription(project.description);
                      setisUpdateDescription(false);
                    }}
                  />
                </form>
              )}

              <div className="team-container">
                {team.map(user => (
                  <span className="team_item" key={user._id}>
                    {user.username}
                    {isUpdateTeam && user._id !== project.admin && (
                      <span
                        className="team-item-delete"
                        id={user._id}
                        onClick={e => {
                          const user = team.find(
                            user => user._id === e.target.id
                          );
                          setTeam(
                            team.filter(user => user._id !== e.target.id)
                          );
                          users = [...users, user];
                        }}
                      >
                        X
                      </span>
                    )}
                  </span>
                ))}
                {isAdmin && !isUpdateTeam && (
                  <button onClick={() => setisUpdateTeam(true)}>
                    add/remove people
                  </button>
                )}
                {isUpdateTeam && (
                  <form
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
                        const user = users.find(
                          user => user._id === e.target.value
                        );
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
                    <br />
                    <input type="submit" value="Update" />
                    <input
                      type="button"
                      value="Cancel"
                      onClick={() => {
                        console.log("----------cancel---------");
                        const tm = project.team;
                        setTeam(tm);
                        console.log("team =", project.team);
                        console.log("team =", team);
                        users = usersList.filter(
                          user => !tm.find(tm => tm._id === user._id)
                        );
                        console.log("userlist =", usersList);
                        console.log("users =", users);
                        
                        setisUpdateTeam(false);
                      }}
                    />
                  </form>
                )}
              </div>
            </div>
            <hr />
            <section className="flex-row projects-items">
              <div className="flex-row">
                <div className="summary-icon flex-row-centered summary-icon-clicked">
                  <FontAwesomeIcon icon="list-ul" />
                </div>
                <div
                  className={`summary ${showTodos ? "clicked" : ""}`}
                  onClick={() => {
                    setShowMessages(false);
                    setShowTodos(true);
                  }}
                >
                  <h3>Todos</h3>
                </div>
              </div>
              <div className="flex-row">
                <div className="summary-icon flex-row-centered">
                  <FontAwesomeIcon icon="sticky-note" />
                </div>
                <div
                  className={`summary ${showMessages ? "clicked" : ""}`}
                  onClick={() => {
                    setShowTodos(false);
                    setShowMessages(true);
                  }}
                >
                  <h3>Message Board</h3>
                </div>
              </div>
            </section>
          </section>
          <section className="flex-col" data-aos="fade-up">
            {showMessages ? (
              <MessageBoard />
            ) : (
              <TodosBoard project={project.todos} />
            )}
          </section>
        </div>
      </section>
    </div>
  );
}
const mapStatToProps = state => {
  return {
    project: state.project,
    usersList: state.usersList,
    isAdmin: state.project && state.project.admin.toString() === state.user._id.toString()
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
