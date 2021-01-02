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
        setUser(current => {
            return {
                email: e.target.value,
                password: current.password
            }
        })
    }

    function updatePassword(e){
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
            if(snap.data.name){
                window.location.href = "/user?tab=0"
            }else{
                setError(true)
            }
        }).catch(err => setError(true))
    }

    return (
        <>
        <div className="app">
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col sm={12} md={4} lg={4}>
                        <Form onSubmit={execute_login}>
                            <Form.Text className="title center paddinged">Sign In</Form.Text>
                            <Form.Text className="text-muted center">
                                Sign in to access a system where you can create and attend to 
                                conferences!
                            </Form.Text>
                            <Form.Group className="margined-top">
                                <Form.Control placeholder="Email" id="email" type="text" onChange={updateEmail}/>
                                <Form.Control placeholder="Password" id="password" type="password" onChange={updatePassword}/>
                                <Form.Text className="text-muted"><a href="/register">¿Don't have an account yet? Sign Up here</a></Form.Text>
                                <Button type="submit"variant="dark" className="margined-top" id="submit">Sign in</Button>
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