import React from 'react'
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Row, Col } from 'react-bootstrap'





export default function NameInput(
    {
        gameName,
        userGuess,
        setUserGuess,
        guesses,
        setGuesses,
        correctGuessesm,
        setCorrectGuesses,
        incorrectGuesses,
        setIncorrectGuesses,
        score,
        setScore
    }
) {

    const handleUserGuess = (e) => {
        setUserGuess(e.target.value);
    }

    // Check if the user's guess is correct
    const checkGuess = () => {
        if (userGuess.toLowerCase() === gameName.toLowerCase()) {
            alert('Correct!')
            setScore(score + 1);
            setCorrectGuesses(correctGuesses + 1);
        } else {
            alert('Incorrect!')
            setIncorrectGuesses(incorrectGuesses + 1);
        }
    }

    return (
        <Container className='bg-dark rounded-3'>
            {/* <Stack direction="horizontal" gap={3} className="p-3"> */}
            <Form.Group>
                <Row className='p-3'>
                    <Col xs={8} md={10}>
                        <Form.Control type="text" placeholder="Enter Game Name" value={props.userGuess} onChange={handleUserInput} className='me-auto' />
                    </Col>
                    <Col xs={4} md={2}>
                <Button variant="primary" onClick={checkGuess}>Submit</Button>
                    </Col>
                </Row>
            </Form.Group>
            {/* </Stack> */}
        </Container >
    )
}
