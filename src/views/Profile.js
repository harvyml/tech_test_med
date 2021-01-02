import React, { useState, useEffect, useContext } from "react"
import useFetch from "./components/hooks/useFetch";
import {Row, Col} from "react-bootstrap"

const Profile = () => {
    const user = useFetch("/api/user")
    const conferences = useFetch("/api/speaker/conferences")
    return (
        <Row className="margined-top">
            <Col sm={12}>
                <div className="center">
                    <div className="view-container">
                        <div className="view">
                            <h4 className="title">{user.name}</h4>
                            <ul>
                                <li>{user.role == 0 ? <span className="semi-bold">Speaker</span> : <span className="semi-bold">Attendant</span>}</li>
                                <li>{user.email}</li>
                                <li>{user.role == 0 ? `Created conferences: ${conferences.length}` : null}</li>
                                <li>
                                    {
                                        user.role == 0 ? `Last Conference: ${conferences[conferences.length-1].name}` : null
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
    
}

export default Profile;