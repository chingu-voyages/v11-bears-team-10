import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";

import { connect } from "react-redux";
import { updateProject } from "../../redux/action_creators/project";

function AddMessageForm({
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
          project.messages.push(message);
          updateProject(project);
          setTitle("");
          setText("");
          handleCloseForm();
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
              required
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
              required
              onChange={e => setText(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setTitle("");
              setText("");
              handleCloseForm();
            }}
            id="close"
            className="hvr-shadow"
          >
            Close
          </Button>
          <Button
            variant="primary"
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
    project: { ...state.project, messages: [...state.project.messages] },
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
)(AddMessageForm);
