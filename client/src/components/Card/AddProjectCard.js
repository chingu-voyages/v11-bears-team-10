import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../../stylesheets/css/styles.css";

function AddProject() {
  return (
      <div className="add-project flex-col-centered hvr-grow-shadow hvr-icon-rotate" data-aos="fade-in">
        <FontAwesomeIcon icon="plus-circle" className="hvr-icon" />
      </div>
  );
}

export default AddProject;
