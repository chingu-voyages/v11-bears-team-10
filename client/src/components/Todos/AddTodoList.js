import React from "react";
import { Form, Modal, Button } from "react-bootstrap";

function AddTodoList({ showForm, handleCloseForm }) {
// const [todo, setTodo] = useState('')

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
        <Modal.Title>Add Checklist</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Group controlId="projectName">
            <Form.Label className="form-labels">Title</Form.Label>
            <Form.Control
              className="form-field todo-field"
              type="text"
              placeholder="Name Your todo list"
            />
          </Form.Group>
					<Form.Group controlId="projectName">
            <Form.Label className="form-labels">Description</Form.Label>
            <Form.Control
              className="form-field todo-field"
              type="text"
              placeholder="Add a description"
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
          >
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddTodoList;
