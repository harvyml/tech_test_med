import React, { useState } from "react"
import axios from "axios"
import SeeMore from "./SeeMore"
import AttendingConference from "./AttendingConference"
import NotAttendingConference from "./NotAttendingConferences"
import Loader from "../../components/Loader"


const AllConferences = ({ attending_conferences, not_attending_conferences }) => {
    const [showSeeMore, setShowSeeMore] = useState(false)
    const [conferenceSeeMore, setConferenceSeeMore] = useState({})
    const [speaker, setSpeaker] = useState({})
    const [loading, setLoading] = useState(false)
    function handle_action(e) {
        var _id = e.target.getAttribute("custom_id")
        var action = e.target.getAttribute("custom_action")
        console.log(_id, action)
        if (action == "attend") {
            attend_conference(_id)
        } else if (action == "cancel_attendance") {
            cancel_attendance(_id)
        } else if (action == "see_more") {
            see_more(_id)
            setShowSeeMore(true)
        }
    }
    function attend_conference(conference_id) {
        axios.post("/api/conference/attend", { _id: conference_id }).then(snap => {
            console.log(conference_id)
            if (snap.data.okay) {
                window.location.href = "/user?tab=0"
            }
        }).catch(err => window.location.href = "/login")
    }
    function cancel_attendance(conference_id) {
        axios.post("/api/conference/withdraw", { _id: conference_id }).then(snap => {
            window.location.href = "/user?tab=0"
        }).catch(err => console.log(err))
    }
    async function see_more(conference_id) {
        setLoading(true)
        let conference = await axios.get(`/api/conference?_id=${conference_id}`)
        let speaker = await axios.get(`/api/user/get?userId=${conference.data.userId}`)
        setConferenceSeeMore({ ...conference.data })
        setSpeaker({ ...speaker.data })
        setLoading(false)
    }

    return (
        <>
            <div className="title-container paddinged">
                <h2 className="title">Attending Conferences</h2>
            </div>
            <div className="conferences-list" onClick={handle_action}>
                {
                    attending_conferences.map((conf, i) => {
                        return <AttendingConference {...conf} key={i} />
                    })
                }
            </div>
            <div className="title-container paddinged">
                <h2 className="title">Not attending Conferences</h2>
            </div>
            <div className="conferences-list" onClick={handle_action}>
                {
                    not_attending_conferences.map((conf, i) => {
                        return <NotAttendingConference {...conf} key={i} />
                    })
                }
            </div>
            {showSeeMore ? <SeeMore loading={loading} conference={conferenceSeeMore} speaker={speaker} handleClose={() => setShowSeeMore(false)} /> : null}
            {loading ? <Loader /> : null}
        </>
    )
}

export default AllConferences