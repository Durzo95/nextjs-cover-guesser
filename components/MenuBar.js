import Stack from 'react-bootstrap/Stack';
import Link from 'next/link';

export default function MenuBar() {
    return (
        <>
            <Stack direction="horizontal" gap={3}>
                <div className="bg-light border me-auto">First item</div>
                <div className="bg-light border ms-auto">Second item</div>
                <div className="bg-light border ms-auto">Third item</div>
            </Stack>
        </>
    )
}
