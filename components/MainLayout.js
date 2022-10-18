import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function MainLayout({ children }) {
    return (
        <Container className='my-4'>
            <Row className='justify-content-center position-relative'>
                {/* This is where the main content goes, centered on the page */}
                <Col xs={12} lg={8} >{children}</Col>
            </Row>
        </Container>
    )
}
