import React, { } from "react"
import { Row, Col, ListGroup } from "react-bootstrap"
import { from_ms_to_date_format } from "../../components/utils/methods"


const AttendingConference = ({ name, date, _id }) => {
    return (
        <ListGroup.Item>
            <div className="task">
                <Row>
                    <Col sm={7}>
                        <span className="vertical-align-sub">{name}</span>
                    </Col>
                    <Col sm={3}>
                        <div className="task-crud">
                            <ul>
                                <li className="small grey">{refactor_date(date)}</li>
                            </ul>
                        </div>
                    </Col>
                    <Col sm={2}>
                        <div className="task-crud">
                            <ul>
                                <li ><span className="material-icons" custom_action="cancel_attendance" custom_id={_id}>cancel</span></li>
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

export default AttendingConference