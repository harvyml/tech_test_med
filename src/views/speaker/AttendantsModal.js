import React, { useEffect, useState } from "react"
//bootstrap
import Loader from "../components/Loader"
import { Modal, Table } from "react-bootstrap"
import {from_ms_to_date_format} from "../components/utils/methods"

const AttendantsModal = ({ loading, attendants, show, handleClose, conference }) => {
    return (
        <>
            <Modal size="lg" show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Conference Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        <li>Name: {conference.name}</li>
                        <li>Location: {conference.location}</li>
                        <li>Quota: {conference.quota}</li>
                        <li>Date: {refactor_date(conference.date)}</li>
                    </ul>
                    <div className="title-container">
                        <h4 className="title">Attendants</h4>
                    </div>
                    <AllAttendants attendants={attendants} />
                    {loading ? <Loader /> : null}
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    )
}

const AllAttendants = ({ attendants }) => {
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        attendants.map((attendant, i) => {
                            return <Attendant {...attendant} index={i} key={attendant._id}/>
                        })
                    }
                </tbody>
            </Table>

        </>
    )
}

const Attendant = ({ index, name, email, userId }) => {
    return (
        <>
            <tr key={userId}>
                <td>{index}</td>
                <td>{name}</td>
                <td>{email}</td>
            </tr>
        </>
    )
}

function refactor_date(ms) {
    return from_ms_to_date_format(ms)
}
export default AttendantsModal