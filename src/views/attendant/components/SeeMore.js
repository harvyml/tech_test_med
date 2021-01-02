import React, { } from "react"
//bootstrap
import { Modal } from "react-bootstrap"
import Loader from "../../components/Loader"
import { from_ms_to_date_format } from "../../components/utils/methods"


const SeeMore = ({loading, conference, speaker, handleClose }) => {
    
    return (
        <>
            <Modal size="lg" show={true} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Conference Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        <li>Conference Name: {conference.name}</li>
                        <li>Speaker: {speaker.name}</li>
                        <li>Date: {refactor_date(conference.date)}</li>
                        <li>location: {conference.location}</li>
                        <li>Quota: {conference.quota}</li>
                    </ul>
                    {loading ? <Loader /> : null}
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    )
}


function refactor_date(ms) {
    return from_ms_to_date_format(ms)
}

export default SeeMore