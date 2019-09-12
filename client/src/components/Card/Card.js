import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Card() {
  return (
    <div className="flex-col app-card">
      <div className="project-card"></div>
      <div className="trash flex-col-centered">
        <FontAwesomeIcon icon="trash" />
      </div>
    </div>
  );
}


export default Card