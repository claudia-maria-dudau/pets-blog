import Alert from 'react-bootstrap/Alert'

export default function AlertIsPending() {
    return (
        <>
            <Alert variant="secondary">
                <p>Loading data...</p>
            </Alert>
        </>
    );
}
