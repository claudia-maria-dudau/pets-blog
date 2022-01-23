import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../../hooks/useLogin'

// components
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import AlertError from '../../components/AlertError'

// styles
import './Login.css'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { error, login } = useLogin()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
        navigate("/home")
    }

    return (
        <>
            <Form className="login-form" onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                    <FloatingLabel controlId="floatingInput" label="Email address">
                        <Form.Control required type="email" placeholder="name@example.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control required type="password" placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FloatingLabel>
                </Form.Group>

                <Button variant="outline-light" type="submit" style={{ background: "rgb(156, 76, 98)" }}>
                    Login
                </Button>
            </Form>
            
            {error && <AlertError message={error} />}
        </>
    )
}
