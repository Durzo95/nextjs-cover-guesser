import Stack from 'react-bootstrap/Stack';
import Link from 'next/link';

export default function MenuBar() {
    return (
        <>
            <header className='bg-dark rounded-3'>
                <Stack direction="horizontal" gap={3}>
                    <h4 className="text-warning mx-auto py-2">Wins - 0</h4>
                    <h1 className="text-light mx-auto py-2">Cover Guesser</h1>
                    <h4 className="text-warning mx-auto py-2">New Game</h4>
                </Stack>
            </header>
        </>
    )
}
