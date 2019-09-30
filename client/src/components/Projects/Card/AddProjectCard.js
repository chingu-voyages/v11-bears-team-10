
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



function AddProjectCard({handleShowModal}) {
  return (
    <div
      className="add-project flex-col-centered hvr-grow-shadow hvr-icon-rotate"
      data-aos="fade-in"
    >
      <span onClick={handleShowModal}>
        <FontAwesomeIcon icon="plus-circle" className="hvr-icon" />
      </span>
    </div>
  );
}

export default AddProjectCard;
