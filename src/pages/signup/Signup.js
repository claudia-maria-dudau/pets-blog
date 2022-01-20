// components
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

import { useState } from 'react'

// styles
import './Signup.css'

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checkPassword, setCheckPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email, password, checkPassword)
    }

    return (
        <>
            <Form className="signup-form" onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                    <FloatingLabel controlId="floatingInput" label="Email address">
                        <Form.Control type="email" placeholder="name@example.com" 
                            onChange={(e) => setEmail(e.target.value)}/>
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control type="password" placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}/>
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                    <FloatingLabel controlId="floatingPassword" label="Check Password">
                        <Form.Control type="password" placeholder="Check Password"
                            onChange={(e) => setCheckPassword(e.target.value)}/>
                    </FloatingLabel>
                </Form.Group>

                <Button variant="outline-light" type="submit" style={{ background: "rgb(156, 76, 98)"}}>
                    Sign up
                </Button>
            </Form>
        </>
    )
}
