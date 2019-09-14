import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function AddProjectForm({ showForm, handleCloseForm }) {
  // const [show, setShow] = useState(false)

  // const handleShow = () => setShow(true);
  // const handleClose = () => setShow(false)
  return (
    <>
      <Modal show={showForm} onHide={handleCloseForm} id="project-form">
        <Modal.Header closeButton id="project-header">
          <Modal.Title id="project-title">Start A Project</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group controlId="projectName" >
              <Form.Label className="form-labels">Project Name</Form.Label>
              <Form.Control className="form-field" type="text" placeholder="Name Your Project" />
            </Form.Group>
            <Form.Group controlId="textArea" className="forms">
              <Form.Label className="form-labels">Project Description</Form.Label>
              <Form.Control
								as="textarea"
								className="form-field"
                placeholder="Add a project description"
                rows="3"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseForm} id="close" className="hvr-shadow">
              Close
            </Button>
            <Button variant="primary" onClick={handleCloseForm} id="save" className="hvr-shadow">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default AddProjectForm;
