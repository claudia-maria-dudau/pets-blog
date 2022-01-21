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
                        <Nav.Item>
                            <Nav.Link href="#/home" eventKey="/home" className="nav-pills">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#/articles" eventKey="/articles" className="nav-pills">Articles</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/login" className="nav-no-pills">Login</Nav.Link>
                        <Nav.Link href="/signup" className="nav-no-pills">Sign up</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}
