import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function MainLayout({ children }) {
    return (
        <Container className=''>
            <Row className='justify-content-center'>
                {/* This is where the main content goes, centered on the page */}
                <Col md={12} lg={12} >{children}</Col>
            </Row>
        </Container>
    )
}
