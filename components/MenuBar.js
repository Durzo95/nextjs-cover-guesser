import Stack from 'react-bootstrap/Stack';
import Link from 'next/link';
import { Container, Button } from 'react-bootstrap';

export default function MenuBar({ score, setRestartGame }) {
    return (
        <>
            <Container className='bg-dark rounded-3 py-2 top-bar'>
                <Stack direction="horizontal" gap={3}>
                    <p className='text-center text-warning fs-3 fw-bold mb-0 w-25'>Wins {score}</p>
                    <p className='text-center text-light fs-2 fw-bold mb-0 w-50'>Cover Guesser</p>
                    {/* Button to restart the game */}
                    <Button className='text-center btn btn-danger fs-5' onClick={() => setRestartGame(true)}>Restart</Button>
                </Stack>
            </Container>
        </>
    )
}
