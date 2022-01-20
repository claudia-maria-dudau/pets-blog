// components
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import './NavigationBar.css'

export default function NavigationBar() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/home">Pets Blog</Navbar.Brand>
                    <Nav variant="pills" className="me-auto" defaultActiveKey="/home">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/articles">Articles</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/login" style={{color: "rgb(156, 76, 98)"}}>Login</Nav.Link>
                        <Nav.Link href="/signup" style={{color: "rgb(156, 76, 98)"}}>Sign up</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}
