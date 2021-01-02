import React, { } from "react"
//bootstrap
import {Spinner, Row, Col} from "react-bootstrap"

const Loader = () => {
    return (
        <div className="board paddinged">
        <Row>
            <Col sm={12} className="center">
                <Spinner animation="border" variant="success" />
            </Col>
        </Row>
        </div>
    )
}

export default Loader