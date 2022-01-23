import { Link } from "react-router-dom"
import { useDocument } from "../hooks/useDocument"

// components
import Card from "react-bootstrap/Card"

// styles
import "./ArticleCard.css"

export default function ArticleCard({ article }) {
    return (
        <>
            <Card key={article.id} className="article-card">
                <Card.Body>
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">By: {article.user}</Card.Subtitle>
                    <Card.Text>{article.content.substring(0, 100)}...</Card.Text>
                    <Link to={`/articles/${article.id}`}>Read more</Link>
                </Card.Body>
            </Card>
        </>
    );
}
