import React, { useState, useEffect, useContext } from "react"
import useFetch from "../components/hooks/useFetch";
import {Row, Col, Button} from "react-bootstrap"
import CreateConferenceModal from "./components/CreateConferenceModal"

const Conferences = () => {
    const user = useFetch("/api/user")
    const [showCreateConference, setShowCreateConference] = useState(false)
    
    return (
        <Row className="margined-top">
            <Col sm={12}>
                <div className="center">
                    <div className="view-container">
                        <div className="view">
                            <div className="title-container">
                                <h3>Create a great conference {user.name}!</h3>
                            </div>
                            <Button onClick={() => setShowCreateConference(true)}><i className="material-icons">add</i></Button>
                            <CreateConferenceModal show={showCreateConference} handleClose={() => setShowCreateConference(false)} />
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )   
}

export default Conferences;