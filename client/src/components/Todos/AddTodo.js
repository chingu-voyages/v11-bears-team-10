import React,{useState} from "react";
import { Form, Modal, Button } from "react-bootstrap";

function AddTodo({ showForm, handleCloseForm }) {
const [todo, setTodo] = useState('')

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
          {/* <div
					   onSubmit={(e) => {
							e.preventdefault();
							console.log("todo added")
						}}
					>
            <Form.Group controlId="projectName">
              <Form.Label className="form-labels">Todo</Form.Label>
              <Form.Control
                className="form-field todo-field"
                type="text"
								placeholder="Name Your todo list"
								defaultValue={todo}
								onChange={val => setTodo(val) }
              />
            </Form.Group>
            <Button
              variant="secondary"
              // onClick={}
							// id="close"
							type="submit"
              className="hvr-shadow add-item-button"
            >
              add todo
            </Button>
          </div> */}
          {/* <Form.Check
            custom
            type={"checkbox"}
            id={`custom-checkbox`}
            label={`Check this custom checkbox`}
          /> */}
          {/* </Form.Group> */}
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

export default AddTodo;
