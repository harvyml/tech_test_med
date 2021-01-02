import React, { useState, useEffect, useContext } from "react"
import useFetch from "../components/hooks/useFetch";
import {Row, Col, ListGroup} from "react-bootstrap"
import axios from "axios"
import {from_ms_to_date_format} from "../components/utils/methods"
import AttendantsModal from "../speaker/AttendantsModal"
import Loader from "../../views/components/Loader"


const ConferencesList = () => {
    const user = useFetch("/api/user")
    const conferences = useFetch("/api/speaker/conferences") 
    
    return (
        <Row className="margined-top">
            <Col sm={12}>
                <ul>
                    <li className="small grey"><span className="material-icons vertical-align-middle">cancel</span> Deactivate an event</li>
                    <li className="small grey"><span className="material-icons vertical-align-middle">check</span> Activate an event</li>
                    <li className="small grey"><span className="material-icons vertical-align-middle">delete</span> Delete an event</li>
                    <li className="small grey"><span className="material-icons vertical-align-middle">people_outline</span> See conference and attendants info</li>
                </ul>
                <AllConferences conferences={conferences}/>
            </Col>
        </Row>
    )   
}


const AllConferences = ({conferences}) => {
    const [attendants, setAttendants] = useState([])
    const [showAttendantsModal, setShowAttendantsModal] = useState(false)
    const [selectedConferenceInfo, setSelectedConferenceInfo] = useState({})
    const [loading, setLoading] = useState(false)
    function handle_action(e){
        var _id = e.target.getAttribute("custom_id")
        var action = e.target.getAttribute("custom_action")
        if(action == "activate"){
            activate_conference(_id)
        }else if(action == "cancel"){
            deactivate_conference(_id)
        }else if(action == "delete"){
            delete_conference(_id)
        }else if(action == "show_attendants"){
            setShowAttendantsModal(true)
            get_attendants(_id)
        }
    }
    function activate_conference(conference_id){
        setLoading(true)
        axios.post("/api/conference/activate", {_id: conference_id}).then(snap => {
            window.location.href = "/user?tab=0"
            setLoading(false)
        }).catch(err => window.location.href = "/login")
    }
    function deactivate_conference(conference_id){
        setLoading(true)
        axios.post("/api/conference/cancel", {_id: conference_id}).then(snap => {
            window.location.href = "/user?tab=0"
            setLoading(false)
        }).catch(err => console.log(err))
    }
    function delete_conference(conference_id){
        setLoading(true)
        axios.post("/api/conference/delete", {_id: conference_id}).then(snap => {
            window.location.href = "/user?tab=0"
            setLoading(false)
        }).catch(err => console.log(err))
    }
    function get_attendants(_id){
        setLoading(true)
        axios.get(`/api/conference?_id=${_id}`).then(snap => {
            setSelectedConferenceInfo(snap.data)
            setAttendants(snap.data.attendants)
            setLoading(false)
        }).catch(err => console.log(err))
    }

    return (
        <div className="conferences-list" onClick={handle_action}>
            {  
                conferences.map((conf, i) => (
                    <Conference {...conf} key={i}/>
                ))
            }
            {loading ? <Loader /> : null}
            <AttendantsModal loading={loading} conference={selectedConferenceInfo} attendants={attendants} show={showAttendantsModal} handleClose={() => setShowAttendantsModal(false)}/>
        </div>
    )
}

function refactor_date(ms){
    return from_ms_to_date_format(ms)
}


const Conference = ({name, date, quota, state, _id, attendants}) => (
    <ListGroup.Item>
        <div className="task">
            <Row>
                <Col sm={7}>
                    <span className="vertical-align-sub">{name}</span>
                </Col>
                <Col sm={3}>
                    <div className="task-crud">
                        <ul>
                            <li className="small grey">Spots: {quota},</li>
                            <li className="small grey">on {refactor_date(date)}</li>
                        </ul>
                    </div>
                </Col>
                <Col sm={2}>
                    <div className="task-crud">
                    <ul>
                        {
                            state && attendants.length < 1 ? (
                                <>
                                <li ><span className="material-icons" custom_action="cancel" custom_id={_id}>cancel</span></li> 
                                <li><span custom_action="delete" custom_id={_id} className="material-icons">delete</span></li>
                                </>
                            ) : null
                        }
                        {!state && attendants.length == 0 ? <li><span custom_id={_id} custom_action="activate" className="material-icons">check</span></li> : null}
                        <li><span custom_action="show_attendants" custom_id={_id} className="material-icons">people_outline</span></li>
                    </ul>
                    </div>
                </Col>
            </Row>
        </div>
    </ListGroup.Item>
)
export default ConferencesList;