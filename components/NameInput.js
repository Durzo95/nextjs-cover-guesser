import React from 'react'
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'





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
            <Stack direction="horizontal" gap={3} className="p-3">
                <Form.Control className="me-auto" onChange={e => handleUserGuess(e)} placeholder={"Guess game name here..."} />
                <Button variant="primary" onClick={checkGuess}>Submit</Button>
            </Stack>
        </Container>
    )
}
