import React, { useState, useEffect, useContext } from "react"
import useFetch from "../components/hooks/useFetch";
import {Row, Col, Button} from "react-bootstrap"
import CreateConferenceModal from "./components/CreateConferenceModal"
import ConferencesList from "./ConferencesList"
const Conferences = () => {
    const user = useFetch("/api/user")
    const [showCreateConference, setShowCreateConference] = useState(false)
    
    return (
        <Row className="margined-top">
            <Col sm={10}>
                <div className="title-container">
                    <h3>Your conferences</h3>
                </div>
            </Col>
            <Col sm={2}>
                <Button onClick={() => setShowCreateConference(true)}><i className="material-icons">add</i></Button>
            </Col>
            <Col sm={12}>
                <div className="view-container">
                    <div className="view">
                        <CreateConferenceModal show={showCreateConference} handleClose={() => setShowCreateConference(false)} />
                        <ConferencesList />
                    </div>
                </div>
            </Col>
        </Row>
    )   
}

export default Conferences;