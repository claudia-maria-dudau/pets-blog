import { useParams } from "react-router-dom"
import { useDocument } from "../hooks/useDocument"

// components
import Alert from 'react-bootstrap/Alert'
import Container from "react-bootstrap/Container"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'

// styles
import './Article.css'

export default function Article() {
    const { id } = useParams()
    const { document: article, isPending, error } = useDocument('articles', id)

    return (
        <>
            {isPending && (
                <Alert variant="secondary" className='alert'>
                    <p>Loading data...</p>
                </Alert>
            )}

            {article && (
                <Container className="article-container">
                    <Row>
                        <Col>
                            <Stack gap={2}>
                                <h1>{article.title}</h1>
                                <span>By: {article.user}</span>
                                <span style={{ marginBottom: "5%" }}>At: {article.date.split(',')[0]}</span>
                            </Stack>
                        </Col>
                        {article.imageURL && (
                            <Col className="image-container">
                                <img src={article.imageURL} alt="article's pet"/>
                            </Col>
                        )}
                    </Row>
                    <Row>
                        <Col>
                            <article>
                                {article.content}
                            </article>
                        </Col>
                    </Row>
                </Container>
            )}

            {error && (
                <Alert variant="danger" className='alert'>
                    <p>{error}</p>
                </Alert>
            )}
        </>
    );
}