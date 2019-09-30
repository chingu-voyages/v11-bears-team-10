import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect, } from "react-redux";


import TodosBoard from "../../Todos/TodosBoard/TodosBoard";
import MessageBoard from "../../Messages/MessageBoard";
import Footer from '../../Footer/Footer'



function ProjectBoard({projectList,project, match}) {
  const [data, setData] = useState({})
  const [showMessages, setShowMessages] = useState(false);
	const [showTodos, setShowTodos] = useState(true);

  useEffect(() => {
		const id = match.params.id
		//get the rest of project data from user projects array
		const data = projectList.filter(item =>  item._id === id)
		setData(data[0])
	}, [])
	
	//see when projects data changes
	useEffect(() =>{
     console.log('project data after todo', project)
	}, [project])

  return (
    <div className="projectsbody">
      <section className="board-body flex-col-centered">
        <div className="content" data-aos="fade-in">
          <section className="projects-summary flex-col" data-aos="fade-up">
            <span>
              <h3>{data.title}</h3>
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
							  project = {data}
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
	projectList: state.user.projectList,
	project: state.project
})

export default connect(mapStateToProps)(ProjectBoard);
