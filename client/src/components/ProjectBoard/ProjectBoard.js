import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { connect } from "react-redux";

// import Header from "../Header/Header";
import TodosBoard from "../Todos/TodosBoard/TodosBoard";
import MessageBoard from "../Messages/MessageBoard";
import Footer from '../Footer/Footer'

import setError from "../../redux/action_creators/setError";

function ProjectBoard(props) {
	const {project} = props
	const id = props.match.params.id

  const [showMessages, setShowMessages] = useState(false);
	const [showTodos, setShowTodos] = useState(true);
	const [data, setData] = useState(project)

	async function getData() {
    try {
      const response = await axios.get(`/project/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("authToken")
        }
			});
			setData(response.data.project);
    } catch (e) {
      if (!e.response) setError({ requestTimeout: e.code === "ECONNABORTED" });
      else if (e.response.status !== 401)
        setError({ statusCode: e.response.status });
    }
  }

	useEffect(() => {
		getData()
	}, [])

  return (
    <div className="projectsbody">
      {/* <Header /> */}
      <section className="board-body flex-col-centered">
        <div className="content" data-aos="fade-in">
          <section className="projects-summary flex-col" data-aos="fade-up">
            <span>
              <h3>{data !== null ? data.title : ''}</h3>
            </span>
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
						{ 
							showMessages 
						  ? 
						  <MessageBoard /> 
					  	: 
						  <TodosBoard 
							  projectId = {data !== null ? data._id : ''}
							/>
						}
          </section>
        </div>
      </section>
			<Footer />
    </div>
  );
}

const mapStateToProps = state => ({
	project : state.project,
})

export default connect(mapStateToProps)(ProjectBoard);
