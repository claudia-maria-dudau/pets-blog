import { Link, useNavigate } from 'react-router-dom'
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
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate("/home")
    }

    return (
        <>
            <Navbar bg="dark" variant="dark" className="my-nav">
                <Container>
                    <Link to="/home" className="navbar-brand">Pets Blog</Link>
                    <Nav className="me-auto">
                        <Link to="/home" className="nav-link">Home</Link>
                        <Link to="/articles" className="nav-link">Articles</Link>
                        {user && <Link to="/create" className="nav-link">Create Article</Link>}
                    </Nav>
                    <Nav>
                        {!user && (
                            <>
                                <Link to="/login" className="nav-link right-buttons">Login</Link>
                                <Link to="/signup" className="nav-link right-buttons">Sign up</Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Link to="/profile" className="nav-link right-buttons">{user.displayName}</Link>
                                <Nav.Link onClick={handleLogout} className="right-buttons">Logout</Nav.Link>
                            </>
                        )}

                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}
