import React, { useState, useEffect, useContext } from "react"
import useFetch from "../components/hooks/useFetch";
import {Row, Col, ListGroup} from "react-bootstrap"
import axios from "axios"
import {from_ms_to_date_format} from "../components/utils/methods"

const ConferencesList = () => {
    const user = useFetch("/api/user")
    const conferences = useFetch("/api/speaker/conferences") 
    
    return (
        <Row className="margined-top">
            <Col sm={12}>
                <AllConferences conferences={conferences}/>
            </Col>
        </Row>
    )   
}

function get_conferences(){
    axios.get("/api/speaker/conferences").then(snap => {
        console.log(snap.data)
        return snap.data
    }).catch(err => {
        return err
    })
}

const AllConferences = ({conferences}) => {
    return (
        <>
            {  
                conferences ? conferences.map((conf, i) => (
                    <Conference {...conf} key={i}/>
                )) : null
            }
        </>
    )
}

function refactor_date(ms){
    return `${from_ms_to_date_format(ms).year}-${from_ms_to_date_format(ms).month}-${from_ms_to_date_format(ms).day}`
}
const Conference = ({name, date, quota}) => (
    <ListGroup.Item>
        <div className="task">
            <Row>
                <Col sm={7}>
                    <span className="vertical-align-sub">{name}</span>
                </Col>
                <Col sm={5}>
                    <div className="task-crud">
                        <ul>
                            <li className="small grey">Spots: {quota},</li>
                            <li className="small grey">on {refactor_date(date)}</li>
                            <li><span className="material-icons">edit</span></li>{/* 'create' is just the icon for edit*/}
                            <li><span className="material-icons">delete</span></li>
                        </ul>
                    </div>
                </Col>
            </Row>
        </div>
    </ListGroup.Item>
)
export default ConferencesList;