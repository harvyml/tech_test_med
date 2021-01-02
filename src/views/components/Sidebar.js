import React, { useContext } from "react"
//bootstrap
import {Card, ListGroup} from "react-bootstrap"
import {BoardContext} from "./BoardContext"
import useFetch from "./hooks/useFetch"



const Sidebar = () => {
    const user = useFetch("/api/user")
    const {active, setActive} = useContext(BoardContext)
    function handleActivateTab(e){
        setActive(e.target.getAttribute("boardkey"))
    }
    return (
        <div className="sidebar">
            <div className="company-info">
                <Card className="company-info-card">
                    <Card.Body>
                        <div className="main-company-info flex">
                            <div className="company-logo">
                                <i className="material-icons">person</i>
                            </div>
                            <div className="company-name justify-self-center side-paddinged">
                                <span className="title vertical-align-sub semi-bold">{user.name}</span>
                                <br />
                                {user.role == 0 ? <span className="vertical-align-sub">Speaker</span> : <span className="vertical-align-sub">Attendant</span>}
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
            <div className="inline-navbar">
                <Card>
                    <List active={active} setActive={handleActivateTab}/>
                </Card>
            </div>
        </div>
    )
}

function List({active, setActive}){
    return (
        <ListGroup variant="flush" onClick={setActive} defaultActiveKey="">
            {active == 0 ? <ListGroup.Item active href="user?tab=0" action boardkey={0}><i className="material-icons paddinged-right small">people</i>Conferences</ListGroup.Item> : <ListGroup.Item  href="user?tab=0" action boardkey={0}><i className="material-icons paddinged-right small">people</i>Conferences</ListGroup.Item>}
            {active == 1 ? <ListGroup.Item action boardkey={1} className="active" href="user?tab=1"><i className="material-icons paddinged-right small">home</i>Profile</ListGroup.Item> : <ListGroup.Item action boardkey={1} href="user?tab=1"><i className="material-icons paddinged-right small">person_outlined</i>Profile</ListGroup.Item>}
            <a href="/api/logout" className="signout sidebar-signout"><span className="vertical-align-middle paddinged-right material-icons">power_settings_new</span>Log out</a>
        </ListGroup>
    )
}

export default Sidebar