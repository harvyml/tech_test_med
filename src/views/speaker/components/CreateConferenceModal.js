import axios from "axios"
import React, { useState } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import { parse_date_to_ms } from "./../../components/utils/methods"

const CreateConferenceModal = ({ show, handleClose }) => {
    const [success, setSuccess] = useState(false)
    const [err, setErr] = useState(false)
    const [conference, setConference] = useState({ name: "", date: 0, location: "", quota: 0 })

    function updateName(e) {
        setConference(current => {
            return {
                name: e.target.value, date: current.date, location: current.location, quota: current.quota
            }
        })
        console.log(conference)
    }

    function updateDate(e) {
        setConference(current => {
            return {
                name: current.name, date: e.target.value, location: current.location, quota: current.quota
            }
        })
        console.log(conference)
    }

    function updateLocation(e) {
        setConference(current => {
            return {
                name: current.name, date: current.date, location: e.target.value, quota: current.quota
            }
        })
        console.log(conference)
    }

    function updateQuota(e) {
        setConference(current => {
            return {
                name: current.name, date: current.date, location: e.target.value, quota: e.target.value
            }
        })
        console.log(conference)
    }

    function createConference() {
        axios.post("/api/conference/create", conference).then(snap => {
            setSuccess(true)
            setErr(false)
            handleClose()
        }).catch(err => {
            setSuccess(false)
            setErr(true)
            handleClose()
        })
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a new conference</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Name of the conference</Form.Label>
                            <Form.Control type="text" placeholder="my great conference" onChange={updateName} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect2">
                            <Form.Label>Date of the conference</Form.Label>
                            <Form.Control type="date" name="trip-start" min="2021-01-03" max="2080-12-31" onChange={updateDate} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect3">
                            <Form.Label>Conference location</Form.Label>
                            <Form.Control type="text" placeholder="location" onChange={updateLocation} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect4">
                            <Form.Label>Quota</Form.Label>
                            <Form.Control type="number" placeholder="quota" min="0" onChange={updateQuota} />
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
            {success ? <SuccessfulCreation handleClose={() => setSuccess(false)}/> : ""}
            {err ? <SuccessfulCreation handleClose={() => setSuccess(false)}/> : ""}
        </>
    )
}



const SuccessfulCreation = ({handleClose}) => (
    <Modal show={true} centered onHide={() => window.location.href = "/user?tab=1"} animation={false}>
        <Modal.Header closeButton>
            <Modal.Title>Create a new conference</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <span>The conference has been successfully created</span>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => window.location.href = "/user?tab=1"}>
                Okay
            </Button>
        </Modal.Footer>
    </Modal>
)


const Error = () => (
    <Modal show={true} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <span>There has been an error, please try reloading the page and creating your conference again</span>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cancel
            </Button>
        </Modal.Footer>
    </Modal>
)
export default CreateConferenceModal