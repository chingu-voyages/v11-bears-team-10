import React, { useState } from "react";


function TodoContent({ showForm }) {
  return showForm ? (
    <>
      <div className="flex-col todo-content-body">
        <div className="flex-row  content-body-head" >
					<span>Assigned To: {`user`}</span>
          <span>
            {" "}
            <strong>Last Update:</strong> Sept 16 2019 12:00AM{" "}
          </span>
        </div>
				<hr />
				<p>Update Todo checklist Form here</p>
      </div>
    </>
  ) : null;
}

export default TodoContent;
