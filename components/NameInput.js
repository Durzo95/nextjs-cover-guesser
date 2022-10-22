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
            console.log(e.target.value)
            handleUserInput(e);
            checkGuess();
        }
    }


    // What happens when the user wins
    const correctGuess = () => {
        props.setGameWon(true);
    }
    // What happens when the user loses
    const incorrectGuess = () => {
        if (props.health <= 1) {
            props.setGameLost(true);
            return;
        }
        props.setHealth(props.health - 1);
    }

    // Function to check if the user has guessed the correct name
    const checkGuess = () => {
        // If the user has guessed the correct name
        if (props.userGuess.toLowerCase() === props.gameName.toLowerCase()) {
            correctGuess();
        } else {
            incorrectGuess();
        }
    }

    return (
        <Container className='bg-dark rounded-3'>
            {/* <Stack direction="horizontal" gap={3} className="p-3"> */}
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
            {/* </Stack> */}
        </Container >
    )
}
