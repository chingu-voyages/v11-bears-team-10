import React,{useState} from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";

import { createProject } from '../../redux/action_creators/project'


function AddProjectForm({ showForm, handleCloseForm, userId, createProject }) {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')

	const handleDescrChange = e => setDescription(e.target.value)
  const handleTitleChange = e => setTitle(e.target.value)

  return (
    <>
      <Modal show={showForm} onHide={handleCloseForm} className="project-form">
        <Modal.Header closeButton className="project-header">
          <Modal.Title id="project-title">Start A Project</Modal.Title>
        </Modal.Header>
        <Form
				 onSubmit={(e) => {
					  e.preventDefault();
            const data = {
							userId,
							title,
							description,
						}
            createProject(data)
				 }
				}
				>
          <Modal.Body>
            <Form.Group controlId="projectName" >
              <Form.Label className="form-labels">Project Name</Form.Label>
							<Form.Control 
								className="form-field" 
								type="text" 
								placeholder="Name Your Project" 
								defaultValue={title}
								onChange={handleTitleChange}
							/>
            </Form.Group>
            <Form.Group controlId="textArea" className="forms">
              <Form.Label className="form-labels">Project Description</Form.Label>
              <Form.Control
								as="textarea"
								className="form-field"
                placeholder="Add a project description"
								rows="3"
								defaultValue={description}
								onChange={handleDescrChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseForm} id="close" className="hvr-shadow">
              Close
            </Button>
            <Button variant="primary" onClick={handleCloseForm} id="save" type="submit" className="hvr-shadow">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}



export default  connect(null, {createProject})(AddProjectForm)
