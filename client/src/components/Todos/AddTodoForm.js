import React,{ useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";

import { updateProject } from '../../redux/action_creators/project'

function AddTodoForm({ showForm, handleCloseForm, projectData }) {
const [name, setName] = useState('')
const [description, setDescription] = useState('')

const handleDescrChange = e => setDescription(e.target.value)
const handleNameChange = e => setName(e.target.value)

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
			  onSubmit={(e) => {
					e.preventDefault();
					const data = {
						// projectId,
						name,
						description,
					}
					console.log('PROJECT DATA', projectData)
					console.log('OTHER DATA', data)
				 //	updateProject(projectData)
			 }}
			>
        <Modal.Body>
          <Form.Group controlId="projectName">
            <Form.Label className="form-labels">Title</Form.Label>
            <Form.Control
              className="form-field todo-field"
              type="text"
							placeholder="Name Your todo list"
							defaultValue={name}
							onChange={handleNameChange}
            />
          </Form.Group>
					<Form.Group controlId="projectName">
            <Form.Label className="form-labels">Description</Form.Label>
            <Form.Control
              className="form-field todo-field"
              type="text"
							placeholder="Add a description"
							onChange={handleDescrChange}
            />
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

export default connect(null, { updateProject })( AddTodoForm);
