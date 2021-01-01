import React, { useState, useEffect, useContext } from "react"
import useFetch from "../components/hooks/useFetch";
import {Row, Col, ListGroup} from "react-bootstrap"
import axios from "axios"
import {from_ms_to_date_format} from "../components/utils/methods"

const ConferencesList = () => {
    const attending_conferences = useFetch("/api/attendant/conferences/attending") 
    const not_attending_conferences = useFetch("/api/attendant/conferences/notattending") 
    
    return (
        <Row className="margined-top">
            <Col sm={12}>
                <AllConferences attending_conferences={attending_conferences} not_attending_conferences={not_attending_conferences}/>
            </Col>
        </Row>
    )   
}

const AllConferences = ({attending_conferences, not_attending_conferences}) => {
    function handle_action(e){
        var _id = e.target.getAttribute("custom_id")
        var action = e.target.getAttribute("custom_action")

        if(action == "attend"){
            attend_conference(_id)
        }else if(action == "cancel_attendance"){
            cancel_attendance(_id)
        }
    }
    function attend_conference(conference_id){
        axios.post("/api/conference/attend", {_id: conference_id}).then(snap => {
            console.log(conference_id)
            if(snap.data.okay){
                window.location.href = "/user?tab=1"
            }else{
                alert("There has been an error, please reload the page")
            }
        }).catch(err => window.location.href = "/login")
    }
    function cancel_attendance(conference_id){
        axios.post("/api/conference/withdraw", {_id: conference_id}).then(snap => {
            window.location.href = "/user?tab=1"
        }).catch(err => console.log(err))
    }

    return (
        <>
        <h2 className="title">
            Attending Conferences
        </h2>
        <div className="conferences-list" onClick={handle_action}>
            {  
                attending_conferences.map((conf, i) => {
                    return <AttendingConference {...conf} key={i}/>
                })
            }
        </div>
        <h2 className="title">
            Not attending Conferences
        </h2>
        <div className="conferences-list" onClick={handle_action}>
            {  
                not_attending_conferences.map((conf, i) => {
                    return <NotAttendingConference {...conf} key={i}/>
                })
            }
        </div>
        </>
    )
}

function refactor_date(ms){
    return from_ms_to_date_format(ms)
}


const AttendingConference = ({name, date, quota, _id}) => {
    return (
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
                                <li ><span className="material-icons" custom_action="cancel_attendance" custom_id={_id}>cancel</span></li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </div>
        </ListGroup.Item>
    )
}

const NotAttendingConference = ({name, date, quota, _id }) => {
    return (
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
                                <li ><span className="material-icons" custom_action="attend" custom_id={_id}>add</span></li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </div>
        </ListGroup.Item>
    )
}
export default ConferencesList;