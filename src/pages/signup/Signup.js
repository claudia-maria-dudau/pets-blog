import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'

// components
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import AlertError from '../../components/AlertError'

// styles
import './Signup.css'

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checkPassword, setCheckPassword] = useState('')
    const { error, signup } = useSignup()

    const handleSubmit = (e) => {
        e.preventDefault()
        signup(email, password, checkPassword)
    }

    return (
        <>
            <Form className="signup-form" onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                    <FloatingLabel controlId="floatingInput" label="Email address">
                        <Form.Control required type="email" placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-4 formBasicPassword">
                    <FloatingLabel className="floatingPassword" label="Password">
                        <Form.Control required type="password" placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-4 formBasicPassword">
                    <FloatingLabel className="floatingPassword" label="Check Password">
                        <Form.Control required type="password" placeholder="Check Password"
                            value={checkPassword}
                            onChange={(e) => setCheckPassword(e.target.value)} 
                        />
                    </FloatingLabel>
                </Form.Group>

                <Button variant="outline-light" type="submit">Sign up</Button>
            </Form>
            
            {error && <AlertError message={error}/>}
        </>
    )
}
