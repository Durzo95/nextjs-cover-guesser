import Stack from 'react-bootstrap/Stack';
import Link from 'next/link';

export default function MenuBar() {
    return (
        <>
            <header className='bg-dark my-5 rounded-3'>
                <Stack direction="horizontal" gap={3}>
                    <h4 className="text-warning mx-auto py-2">Wins - 0</h4>
                    <h3 className="text-warning mx-auto py-2">Cover Guesser</h3>
                    <h4 className="text-warning mx-auto py-2">New Game</h4>
                </Stack>
            </header>
        </>
    )
}
