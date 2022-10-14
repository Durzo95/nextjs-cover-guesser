import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function MainLayout({ children }) {
    return (
        <Container>
            <Row>
                <Col></Col>
                {/* This is where the main content goes, centered on the page */}
                <Col xs={8}>{children}</Col>
                <Col></Col>
            </Row>
        </Container>
    )
}
