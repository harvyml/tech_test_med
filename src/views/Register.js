import React, {useState, useEffect} from "react"
import ReactDOM from "react-dom"
import axios from "axios"
//bootstrap
import {Container, Row, Col, Button, Form} from "react-bootstrap"
import {password_validate} from "./components/utils/methods"




const Register = () => {
    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [password_validation, setPasswordValidation] = useState("")

    function validateAndSendDataToServer(e){
        e.preventDefault()
        let validation = password_validate(password, password_validation)
        if(validation.okay){
            axios.post("/api/register", {
                name,
                email,
                password,
                password_validation
            }).then(snap => {
                console.log("done: ",snap)
                snap.data.name ? window.location.href = "/panel" : null
            })
            .catch(err => console.log("error: ", err))
        }else{
            alert(validation.err.message)
        }
    }

    return (
        <div className="app">
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col sm={12} md={6} lg={6}>
                        <Form onSubmit={validateAndSendDataToServer}>
                            <Form.Text className="title center paddinged">Registro</Form.Text>
                            <Form.Group>
                                <Form.Control placeholder="Nombre" id="name" onChange={(e) => setName(e.target.value)}/>
                                <Form.Control placeholder="Email" id="email" type="email" onChange={(e) => setUser(e.target.value)}/>
                                <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                                    <Form.Label></Form.Label>
                                    <Form.Control as="select" size="sm" custom>
                                        <option value="0">Speaker</option>
                                        <option value="1">Attendant</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Group>
                                <Form.Control placeholder="Contraseña" id="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                                <Form.Control placeholder="Repetir Contraseña" id="password" type="password" onChange={(e) => setPasswordValidation(e.target.value)}/>
                                <Form.Text className="text-muted"><a href="/login">¿Ya estás registrado?</a></Form.Text>
                                <Button type="submit"variant="dark" className="margined-top" id="submit">Send</Button>
                            
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}




export default Register;