import React from 'react'
import Image from 'next/image'
import Container from 'react-bootstrap/Container'


export default function Cover() {
    return (
        <>
            <Container className="text-center border rounded-3 bg-dark p-5">
                <Image src="http://localhost:3000/Halo3.jpg" alt="Picture of the author" width={500} height={500} />
            </Container>
        </>
    )
}
