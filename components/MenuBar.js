import Stack from 'react-bootstrap/Stack';
import Link from 'next/link';
import { Container } from 'react-bootstrap';

export default function MenuBar({ score }) {
    return (
        <>
            <Container className='bg-dark rounded-3 py-2'>
                <Stack direction="horizontal" gap={3}>
                    {/* Button to set new game */}
                    <Link href='/'>
                        <a className='btn btn-warning fs-4'>New Game</a>
                    </Link>
                </Stack>
            </Container>
        </>
    )
}
