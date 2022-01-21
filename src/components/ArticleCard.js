// components
import Card from "react-bootstrap/Card"

// styles
import "./ArticleCard.css"

export default function ArticleCard({ article }) {
    return (
        <Card style={{ width: '18rem' }} key={article.id}>
            <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">By: {article.user}</Card.Subtitle>
                <Card.Text>
                    {article.content}
                </Card.Text>
                <Card.Link href="/{article.id}">Read</Card.Link>
            </Card.Body>
        </Card>
    );
}
