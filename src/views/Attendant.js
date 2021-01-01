import React, { useState, useEffect } from "react"
//bootstrap
import { Row, Col } from "react-bootstrap"

import useUser from "./components/useUser"
import Sidebar from "./components/Sidebar"
import Board from "./components/Board"
import {BoardContext} from "./components/BoardContext"
import Conferences from "./attendant/Conferences"


import HomeBoard from "./HomeBoard"
const Attendant = () => {
    const user = useUser()
    //just added for now while the conditional session handling bug is corrected
    useEffect(() => {
        if(!user){
            window.location.href = "/login"
        }
    }, [user])
    const [active, setActive] = useState(0)
    useEffect(() => {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search)
        var active_tab_from_url = params.get("tab") ? params.get("tab") : active

        setActive(active_tab_from_url)
    }, [])
    return (
        <div className="app">
            <Row>
                <BoardContext.Provider value={{active, setActive}}>
                    <Col md={3}><Sidebar/></Col>
                    <Col md={9}>
                        <TabHandler active={active} user={user}/>
                    </Col>
                </BoardContext.Provider>
            </Row>
        </div>
    )
}


const TabHandler = ({active, user}) => {
    if(active == 0) return <Board boardname="Home" user={user} customContent={HomeBoard}/> 
    if(active == 1) return <Board boardname="Conferences" user={user} customContent={Conferences}/> 
    // if(active == 2) return <Board boardname="Tareas" user={user} customContent={Tasks}/> 
    return null
}

export default Attendant;