import Alert from 'react-bootstrap/Alert'

export default function AlertError({ message }) {
    return (
        <Alert variant="danger">
            <p>{message}</p>
        </Alert>
    );
}
