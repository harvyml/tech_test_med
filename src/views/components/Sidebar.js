import React, { useState, useEffect, useContext } from "react"
import ReactDOM from "react-dom"
import axios from "axios"
//bootstrap
import {Card, ListGroup} from "react-bootstrap"
import {BoardContext} from "./BoardContext"
import useFetch from "./hooks/useFetch"



const Sidebar = () => {
    const user = useFetch("/api/user")
    const {active, setActive} = useContext(BoardContext)
    function handleActivateTab(e){
        setActive(e.target.getAttribute("boardkey"))
        console.log(active, e.target.getAttribute("boardkey"))
    }
    return (
        <div className="sidebar">
            <div className="company-info">
                <Card className="company-info-card">
                    <Card.Body>
                        <div className="main-company-info flex">
                            <div className="company-logo">
                                <img src="./public/assets/logo.png" className="rounded"/>
                            </div>
                            <div className="company-name justify-self-center side-paddinged">
                                <span className="title vertical-align-sub semi-bold">{user.name}</span>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
            <div className="inline-navbar">
                <Card>
                    <List setActive={handleActivateTab}/>
                </Card>
            </div>
        </div>
    )
}

function List({active, setActive}){
    return (
        <ListGroup variant="flush" onClick={setActive}>
            <ListGroup.Item boardkey={0}><img src="./public/assets/home.png" className="paddinged-right"/>Home</ListGroup.Item>
            <ListGroup.Item boardkey={1}><img src="./public/assets/people.png" className="paddinged-right"/>Conferences</ListGroup.Item>
            <ListGroup.Item><a href="/api/logout">Cerrar Sesión</a></ListGroup.Item>
        </ListGroup>
    )
}

export default Sidebar