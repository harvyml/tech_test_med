import React, { } from "react"
import { Row, Col, ListGroup } from "react-bootstrap"
import { from_ms_to_date_format } from "../../components/utils/methods"


const NotAttendingConference = ({ name, date, quota, _id }) => {
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
                                <li ><span className="material-icons" custom_action="see_more" custom_id={_id}>read_more</span></li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </div>
        </ListGroup.Item>
    )
}

function refactor_date(ms) {
    return from_ms_to_date_format(ms)
}

export default NotAttendingConference