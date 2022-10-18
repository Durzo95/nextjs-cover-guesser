import React from 'react'
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function NameInput() {
    return (
        <Container className='bg-dark rounded-3'>
            <Stack direction="horizontal" gap={3} className="p-3">
                <Form.Control className="me-auto" placeholder="Guess name here..." />
                <Button variant="secondary">Submit</Button>
                <div className="vr" />
                {/* <Button variant="outline-danger">Reset</Button> */}
            </Stack>
        </Container>
    )
}
