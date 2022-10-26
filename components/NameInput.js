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

    const removeSpecialCharactersSetLowerCaseNoSpace = (str) => {
        return str.replace(/[^a-zA-Z ]/g, "").toLowerCase().replace(/\s/g, '');
    }

    const replaceRomanNumerals = (str) => {
        return str.replace(/I/g, '1')
            .replace(/II/g, '2')
            .replace(/III/g, '3')
            .replace(/IV/g, '4')
            .replace(/V/g, '5')
            .replace(/VI/g, '6')
            .replace(/VII/g, '7')
            .replace(/VIII/g, '8')
            .replace(/IX/g, '9')
            .replace(/X/g, '10');
    }

    // Function to check if the user has guessed the correct name
    const checkGuess = () => {
        // formatted user guess and game name
        // no spaces, all lowercase, no special characters
        // This is to avoid the user guessing right but getting any spaces or special characters wrong
        let formattedGuess = removeSpecialCharactersSetLowerCaseNoSpace(props.userGuess);
        let formattedGameName = removeSpecialCharactersSetLowerCaseNoSpace(props.gameName);

        // formatted user guess and game name but replacing all roman numerals with their arabic equivalent
        let formattedUserGuessNoRomanNumberals = replaceRomanNumerals(props.userGuess)
        let formattedGameNameNoRomanNumberals = replaceRomanNumerals(props.gameName)
        // format the no roman numerals strings to remove special characters and set to lowercase
        formattedUserGuessNoRomanNumberals = removeSpecialCharactersSetLowerCaseNoSpace(formattedUserGuessNoRomanNumberals);
        formattedGameNameNoRomanNumberals = removeSpecialCharactersSetLowerCaseNoSpace(formattedGameNameNoRomanNumberals);


        // Check if the user has guessed the correct name
        if (formattedGuess === formattedGameName || formattedUserGuessNoRomanNumberals === formattedGameNameNoRomanNumberals) {
            correctGuess();
        }
        else {
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
