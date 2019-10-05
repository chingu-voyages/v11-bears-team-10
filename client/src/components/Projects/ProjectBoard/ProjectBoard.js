import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { getProject } from "../../../redux/action_creators/project";
import { fetshUsers } from "../../../redux/action_creators/usersListAction";
import { updateProject } from "../../../redux/action_creators/project";
import TodosBoard from "../../Todos/TodosBoard/TodosBoard";
import MessageBoard from "../../Messages/MessageBoard";
import AppPlaceholder from "../../../AppPlaceholder";

import "./projectBoard.css";

function ProjectBoard(props) {
  const { project, usersList, fetshUsers, getProject, updateProject } = props;
  const { id } = props.match.params;

  const [showMessages, setShowMessages] = useState(false);
  const [showTodos, setShowTodos] = useState(true);

  const [users, setUsers] = useState([]);
  const [team, setTeam] = useState([]);
  const [isUpdateTeam, setisUpdateTeam] = useState(false);

  useEffect(() => {
    console.log("----------effect setUsers---------")
    if (project && project.team) setTeam(project.team);
    const users = usersList.filter(
      user => !team.find(team => team._id === user._id)
    );
    setUsers(users);
  }, [usersList, project]);

  useEffect(() => {
    console.log("----------effect fetch users---------")
    getProject(id);
    fetshUsers();
  }, [id]);
  return !project ? (
    <AppPlaceholder text="Loading..." />
  ) : (
    <div className="projectsbody">
      <section className="board-body flex-col-centered">
        <div className="content" data-aos="fade-in">
          <section className="projects-summary flex-col" data-aos="fade-up">
            <div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="team-container">
                {team.map(user => (
                  <span className="team_item" key={user._id}>
                    {user.username}
                    {isUpdateTeam && (
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
                          setUsers([...users, user]);
                        }}
                      >
                        X
                      </span>
                    )}
                  </span>
                ))}
                {!isUpdateTeam && (
                  <button onClick={() => setisUpdateTeam(true)}>
                    add/remove people
                  </button>
                )}
                {isUpdateTeam && (
                  <div>
                    <input
                      list="list-users"
                      onChange={e => {
                        console.log("----------onchange---------")
                        const user = users.find(
                          user => user._id === e.target.value
                        );
                        setUsers(
                          users.filter(user => user._id !== e.target.value)
                        );
                        e.target.value = "";
                        setTeam([...team, user]);
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
                    <input
                      type="button"
                      value="Update"
                      onClick={() => {
                        const update = { ...project, team };
                        updateProject(update);
                        setisUpdateTeam(false);
                      }}
                    />
                    <input
                      type="button"
                      value="Cancel"
                      onClick={() => {
                        console.log("----------cancel---------")
                        const tm = project.team
                        setTeam(tm);
                        console.log("team =", project.team)
                        console.log('team =', team)
                        const users = usersList.filter(
                          user => !tm.find(tm => tm._id === user._id)
                          );
                          console.log("userlist =", usersList)
                          console.log('users =',users)
                          setUsers(users);
                          setisUpdateTeam(false);
                        }}
                    />
                  </div>
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
    usersList: state.usersList
  };
};
const mapDistpatchToProps = dispatch => {
  return {
    getProject: id => dispatch(getProject(id)),
    fetshUsers: () => dispatch(fetshUsers()),
    updateProject: project => dispatch(updateProject(project))
  };
};

export default connect(
  mapStatToProps,
  mapDistpatchToProps
)(ProjectBoard);
