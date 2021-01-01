import React, {useState, useEffect} from "react"
import ReactDOM from "react-dom"

//bootstrap
import {Container, Row, Col, Button, Form, Modal} from "react-bootstrap"
import axios from "axios"
import ModalHeader from "react-bootstrap/esm/ModalHeader"

const Login = () => {
    const [user, setUser] = useState({email: "", password: ""})
    const [error, setError] = useState(false)
    function updateEmail(e){
        console.log(user)
        setUser(current => {
            return {
                email: e.target.value,
                password: current.password
            }
        })
    }

    function updatePassword(e){
        console.log(user)
        setUser(current => {
            return {
                email: current.email,
                password: e.target.value
            }
        })
    }

    function execute_login(e){
        e.preventDefault()
        axios.post("/api/login", user).then(snap => {
            window.location.href = "/panel"
        }).catch(err => setError(true))
    }

    return (
        <>
        <div className="app">
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col sm={12} md={6} lg={6}>
                        <Form onSubmit={execute_login}>
                            <Form.Text className="title center paddinged">Titulo</Form.Text>
                            <Form.Group>
                                <Form.Control placeholder="Email" id="email" onChange={updateEmail}/>
                                <Form.Control placeholder="Password" id="password" onChange={updatePassword}/>
                                <Form.Text className="text-muted">Something really cool</Form.Text>
                                <Button type="submit"variant="dark" className="margined-top" id="submit">Send</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <ModalError show={error} handleClose={() => setError(false)}/>
        </div>
        </>
    )
}


const ModalError = ({show, handleClose}) => (
    <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Error de inicio de sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>Revisa si escribiste tu email y contraseña correctamente</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
)

export default Login;