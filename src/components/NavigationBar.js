import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

// components
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

// styles
import './NavigationBar.css'

export default function NavigationBar() {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const location = useLocation()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate("/home")
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/home">Pets Blog</Navbar.Brand>
                    <Nav variant="pills" className="me-auto" defaultActiveKey={location.pathname}>
                        <Nav.Link eventKey="/home" className="nav-pills">
                            <Link to="/home">Home</Link>
                        </Nav.Link>
                        <Nav.Link eventKey="/articles" className="nav-pills">
                            <Link to="/articles">Articles</Link>
                        </Nav.Link>
                        {user && (
                            <Nav.Link eventKey="/create" className="nav-pills">
                                <Link to="/create">Create Article</Link>
                            </Nav.Link>
                        )}
                    </Nav>
                    <Nav>
                        {!user && (
                            <>
                                <Nav.Link>
                                    <Link to="/login" className="right-buttons">Login</Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link to="/signup" className="right-buttons">Sign up</Link>
                                </Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link>
                                    <Link to="/profile" className="right-buttons">{user.displayName}</Link>
                                </Nav.Link>
                                <Nav.Link onClick={handleLogout} className="right-buttons">Logout</Nav.Link>
                            </>
                        )}

                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}
