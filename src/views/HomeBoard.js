import React, { useState, useEffect, useContext } from "react"
import useFetch from "./components/hooks/useFetch";
import {Row, Col} from "react-bootstrap"

const HomeBoard = () => {
    const user = useFetch("/api/user")
    return (
        <Row className="margined-top">
            <Col sm={12}>
                <div className="center">
                    <div className="view-container">
                        <div className="view">
                            <div className="title-container">
                                <h3>Bienvenido {user.name}</h3>
                            </div>
                            <div className="img-container">
                                <img src="./public/assets/illustration.png" alt="Home"/>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
    
}

export default HomeBoard;