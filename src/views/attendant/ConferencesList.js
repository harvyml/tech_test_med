import React, { useState } from "react"
import useFetch from "../components/hooks/useFetch";
import { Row, Col, ListGroup } from "react-bootstrap"
import AllConferences from "./components/AllConferences"
const ConferencesList = () => {
    const attending_conferences = useFetch("/api/attendant/conferences/attending")
    const not_attending_conferences = useFetch("/api/attendant/conferences/notattending")

    return (
        <Row className="margined-top">
            <Col sm={12}>
                <AllConferences attending_conferences={attending_conferences} not_attending_conferences={not_attending_conferences} />
            </Col>
        </Row>
    )
}

export default ConferencesList;