import React from 'react'
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Row, Col } from 'react-bootstrap'


export default function NameInput(props) {

    const handleUserInput = (e) => {
        props.setUserGuess(e.target.value);
    }

    // handle the user pressing enter
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleUserInput(e);
            checkGuess();
        }
    }

    // What happens when the user guesses correctly
    const correctGuess = () => {
        props.setGameWon(true);
    }
    // What happens when the user guesses incorrectly
    const incorrectGuess = () => {
        if (props.health <= 1) {
            props.setGameLost(true);
        } else {
            props.setHealth(props.health - 1);
        }
    }

    // Function to check if the user has guessed the correct name
    const checkGuess = () => {
        if (props.userGuess.toLowerCase() === props.gameName.toLowerCase()) {
            correctGuess();
        } else {
            incorrectGuess();
        }
    }

    return (
        <Container className='bg-dark rounded-3'>
            <Form.Group>
                <Row className='p-3'>
                    <Col xs={8} md={10}>
                        <Form.Control type="text" placeholder="Enter Game Name" value={props.userGuess} onChange={handleUserInput} onKeyUp={handleKeyPress} className='me-auto' />
                    </Col>
                    <Col xs={4} md={2}>
                        <Button variant="primary" onClick={checkGuess}>Submit</Button>
                    </Col>
                </Row>
            </Form.Group>
        </Container >
    )
}
