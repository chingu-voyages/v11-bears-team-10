import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Header from "../Header/Header";
import TodosBoard from "../Todos/TodosBoard/TodosBoard";
import MessageBoard from "../Messages/MessageBoard";

function ProjectBoard() {
  const [showMessages, setShowMessages] = useState(false);
  const [showTodos, setShowTodos] = useState(false);
  return (
    <>
      <Header />
      <section className="board-body flex-col-centered">
        <div className="content" data-aos="fade-in">
          <section className="projects-summary flex-col" data-aos="fade-up">
            <span>
              <h3>Project Name</h3>
            </span>
            <hr />
            <section className="flex-row summary-cards">
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
          <section className="projects-shelf flex-row" data-aos="fade-up">
            {showTodos ? <TodosBoard /> : <MessageBoard />}
          </section>
        </div>
      </section>
    </>
  );
}

export default ProjectBoard;
