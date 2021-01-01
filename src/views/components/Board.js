import React, { useState, useEffect, useContext } from "react"
import ReactDOM from "react-dom"
import axios from "axios"
//bootstrap
import { Container, Row, Col, Button, Form, Card, Nav} from "react-bootstrap"

const Board = ({user, customContent, boardname}) => {
    const CustomContent = customContent
    return (
        <div className="board paddinged">
            <div className="board-header">
                <Row>
                    <Col sm={4}>
                        <h5>{boardname}</h5>
                    </Col>
                    <Col sm={8}>
                        <Nav className="justify-content-end" activeKey="/home">
                            <Nav.Item>
                            <Nav.Link href="/home"></Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey="disabled"><i className="material-icons">search</i></Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey="disabled"><i className="material-icons">notifications</i></Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey="disabled" disabled>
                                |{"  " + user.name}
                            </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Row>
            </div>
            <CustomContent/>
        </div>
    )
}

export default Board