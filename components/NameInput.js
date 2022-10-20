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

    // function for the correct guess
    const correctGuess = () => {
        // increase the score by 1
        props.setScore(props.score + 1);
        // reset the user guess
        props.setUserGuess('');
        // reset the pixel size
        props.setPixelSize(10);
        // enable pixelation
        props.setPixelizeEnabled(true);
    }

    // Function to check if the user has guessed the correct name
    const checkGuess = () => {
        // If the user has guessed the correct name
        if (props.userGuess.toLowerCase() === props.gameName.toLowerCase()) {
            alert('Correct!');
            // Increase the score by 1
            props.setScore(props.score + 1);
            // Reset the user guess
            props.setUserGuess('');
            // Reset the pixel size
            props.setPixelSize(10);
            // Enable pixelation
            props.setPixelizeEnabled(true);
            // Fetch new game data
            props.setFetchData(true);
        } else {
            alert('Incorrect!');
            // Reset the user guess
            props.setUserGuess('');
            // Reset the pixel size
            if (props.pixelSize > 3) {
                props.setPixelSize(props.pixelSize - 1);
            }
            //If the health is not 0, decrease the health by 1
            props.health === 0 ? alert('Game Over') : props.setHealth(props.health - 1);
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
