import Stack from 'react-bootstrap/Stack';
import Link from 'next/link';
import { Container } from 'react-bootstrap';

export default function MenuBar({ score }) {
    return (
        <>
            <Container className='bg-dark rounded-3 py-2'>
                <Stack direction="horizontal" gap={3}>
                    <p className='text-center text-warning fs-3 fw-bold mb-0 w-25'>Wins - {score}</p>
                    <p className='text-center text-light fs-2 fw-bold mb-0 w-50'>Cover Guesser</p>
                    {/* Button to set new game */}
                    <Link href='/'>
                        <a className='btn btn-warning fs-4'>New Game</a>
                    </Link>
                </Stack>
            </Container>
        </>
    )
}
