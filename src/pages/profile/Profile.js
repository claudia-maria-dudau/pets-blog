import { useAuthContext } from "../../hooks/useAuthContext"
import { useState } from "react"
import { useCollection } from "../../hooks/useCollection"
import { useNavigate } from "react-router-dom"

// components
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import ListGroup from 'react-bootstrap/ListGroup'
import AlertIsPending from "../../components/AlertIsPending"
import AlertError from "../../components/AlertError"

// icons
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

// firebase
import { db } from "../../firebase/config"
import { doc, deleteDoc } from "firebase/firestore"

// styles
import './Profile.css'


export default function Profile() {
    const { user } = useAuthContext()
    const navigate = useNavigate()
    const [displayName, setDisplayName] = useState(user.email)
    const { documents: articles, isPending, error } = useCollection(
        'articles',
        ["uid", "==", user.uid]
    )

    const handleSubmit = () => {

    }

    const handleDelete = async (id) => {
        const docRef = doc(db, 'articles', id)
        deleteDoc(docRef)
    }

    return (
        <>
            <Card className="profile-card">
                <Card.Header>Hey, {user.email}</Card.Header>

                <Card.Body>
                    <Form onSubmit={handleSubmit} className="edit-profile-form">
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="2">Email</Form.Label>
                            <Col sm="10">
                                <Form.Control plaintext readOnly defaultValue={user.email} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalText">
                            <Form.Label column sm={2}>Display name</Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Col sm={{ span: 10, offset: 2 }}>
                                <Button type="submit">Save Changes</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Card.Body>

                <Card.Footer>
                    <h6>Your articles:</h6>

                    {isPending && <AlertIsPending />}

                    {articles && (
                        <ListGroup>
                            {articles.map(article => (
                                <ListGroup.Item action variant="light" key={article.id}>
                                    <Row>
                                        <Col sm={8}>
                                            {article.title}
                                        </Col>
                                        <Col sm={4}>
                                            <DeleteIcon sx={{ color: "rgb(233, 73, 73)" }} className="icon" 
                                                onClick={() => handleDelete(article.id)} 
                                            />
                                            <EditIcon sx={{ color: "rgb(109, 200, 202)" }} className="icon" 
                                                onClick={() => navigate(`/edit/${article.id}`)}
                                            />
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}

                    {error && <AlertError message={error} />}
                </Card.Footer>
            </Card>
        </>
    )
}
