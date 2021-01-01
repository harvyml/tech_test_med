import React, {} from "react"

const CreateConferenceModal = ({show, handleClose, createConference}) => {
    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Name of the conference</Form.Label>
                        <Form.Control type="text" placeholder="my great conference" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect2">
                        <input type="date" id="start" name="trip-start" value="2018-07-22" min="2018-01-01" max="2018-12-31"/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect3">
                        <Form.Label>Conference location</Form.Label>
                        <Form.Control type="text" placeholder="location" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect4">
                        <Form.Label>Quota</Form.Label>
                        <Form.Control as="select" multiple>
                        <option value="25">25</option>
                        <option value="25">25</option>
                        <option value="25">25</option>
                        <option value="25">25</option>
                        <option value="25">25</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={createConference}>
                    Create Conference
                </Button>
            </Modal.Footer>
      </Modal>
    )
}