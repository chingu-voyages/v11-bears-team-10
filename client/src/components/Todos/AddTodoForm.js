import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";

import { updateProject } from "../../redux/action_creators/project";

function AddTodoForm({ showForm, handleCloseForm, project, updateProject, user }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Modal
      show={showForm}
      onHide={handleCloseForm}
      dialogClassName="modal-40w"
      className="project-form"
    >
      <Modal.Header closeButton className="project-header">
        <Modal.Title>Add Checklist</Modal.Title>
      </Modal.Header>
      <Form
        onSubmit={e => {
          e.preventDefault();
          const todo = {
            title,
            description,
            created_by:  {
              _id: user._id,
              username: user.username
            }
          };
          project.todos.unshift(todo);
          updateProject(project);
          setTitle("");
          setDescription("");
          handleCloseForm();
        }}
      >
        <Modal.Body>
          <Form.Group controlId="projectName">
            <Form.Label className="form-labels">Title</Form.Label>
            <Form.Control
              className="form-field todo-field"
              type="text"
              placeholder="Name Your todo list"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="projectName">
            <Form.Label className="form-labels">Description</Form.Label>
            <Form.Control
              className="form-field todo-field"
              type="text"
              placeholder="Add a description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setTitle("");
              setDescription("");
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
    project: { ...state.project, todos: [...state.project.todos] },
    user: state.user
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
)(AddTodoForm);
