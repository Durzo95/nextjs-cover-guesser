import Stack from 'react-bootstrap/Stack';
import Link from 'next/link';
import { Container } from 'react-bootstrap';

export default function MenuBar({ score }) {
    return (
        <>
            <Container className='bg-dark rounded-3 py-2'>
                <Stack direction="horizontal" gap={3}>
                    <p className='text-center text-warning fs-3 fw-bold w-25'>Wins - {score}</p>
                    <p className='text-center text-light fs-2 fw-bold w-50'>Cover Guesser</p>
                    <p className='text-center text-warning fs-3 fw-bold w-25'>New Game</p>
                </Stack>
            </Container>
        </>
    )
}
