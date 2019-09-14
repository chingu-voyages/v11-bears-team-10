import React, {useState} from "react";
import { Modal, Button } from "react-bootstrap";

function AddProjectForm({showForm, handleCloseForm}) {
	// const [show, setShow] = useState(false)
	
	// const handleShow = () => setShow(true);
	// const handleClose = () => setShow(false)
  return (
    <>
      <Modal show={showForm} onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseForm}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseForm}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProjectForm;
