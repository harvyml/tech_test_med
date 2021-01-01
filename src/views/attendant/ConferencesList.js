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

const AllConferences = ({conferences}) => {
    function handle_action(e){
        var _id = e.target.getAttribute("custom_id")
        var action = e.target.getAttribute("custom_action")

        if(action == "attend"){
            activate_conference(_id)
        }else if(action == "cancel_attendance"){
            deactivate_conference(_id)
        }else if(action == "delete"){
            delete_conference(_id)
        }
    }
    function activate_conference(conference_id){
        axios.post("/api/conference/activate", {_id: conference_id}).then(snap => {
            window.location.href = "/user?tab=1"
        }).catch(err => window.location.href = "/login")
    }
    function deactivate_conference(conference_id){
        axios.post("/api/conference/cancel", {_id: conference_id}).then(snap => {
            window.location.href = "/user?tab=1"
        }).catch(err => console.log(err))
    }
    function delete_conference(conference_id){
        axios.post("/api/conference/delete", {_id: conference_id}).then(snap => {
            window.location.href = "/user?tab=1"
        }).catch(err => console.log(err))
    }

    return (
        <div className="conferences-list" onClick={handle_action}>
            {  
                conferences.map((conf, i) => (
                    <Conference {...conf} key={i}/>
                ))
            }
        </div>
    )
}

function refactor_date(ms){
    return from_ms_to_date_format(ms)
}


const Conference = ({name, date, quota, state, _id}) => (
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
                            {state ? <li ><span className="material-icons" custom_action="cancel" custom_id={_id}>cancel</span></li> : <li><span custom_id={_id} custom_action="activate" className="material-icons">check</span></li>}
                            <li><span custom_action="delete" custom_id={_id} className="material-icons">delete</span></li>
                        </ul>
                    </div>
                </Col>
            </Row>
        </div>
    </ListGroup.Item>
)
export default ConferencesList;