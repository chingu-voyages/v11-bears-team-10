import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";

import { connect } from "react-redux";
import { updateProject } from "../../redux/action_creators/project";

function AddMessageList({
  showForm,
  handleCloseForm,
  project,
  username,
  updateProject
}) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  return (
    <Modal
      show={showForm}
      onHide={handleCloseForm}
      dialogClassName="modal-40w"
      aria-labelledby="contained-modal-title-vcenter"
      // centered
      className="project-form"
    >
      <Modal.Header closeButton className="project-header">
        <Modal.Title>Add a message</Modal.Title>
      </Modal.Header>
      <Form
        onSubmit={e => {
          console.log("message on submit");
          e.preventDefault();
          const message = {
            title,
            text,
            user: { username }
          };
          project.message_board.push(message);
          console.log("add message project =", project);
          updateProject(project);
        }}
      >
        <Modal.Body>
          <Form.Group controlId="projectName">
            <Form.Label className="form-labels">Title</Form.Label>
            <Form.Control
              className="form-field todo-field"
              type="text"
              placeholder="Message Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="projectName">
            <Form.Label className="form-labels">Message</Form.Label>
            <Form.Control
              className="form-field todo-field"
              type="text"
              placeholder="Add a message"
              value={text}
              onChange={e => setText(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseForm}
            id="close"
            className="hvr-shadow"
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleCloseForm}
            id="save"
            className="hvr-shadow"
            type="submit"
          >
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
const mapStateToProps = state => {
  return {
    project: { ...state.project, messages: [...state.project.message_board] },
    username: state.user.username
  };
};

const mapDispachToProps = dispach => {
  return {
    updateProject: project => dispach(updateProject(project))
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(AddMessageList);
