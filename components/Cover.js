import React from 'react'
import Image from 'next/image'
import Container from 'react-bootstrap/Container'


export default function Cover() {
    return (
        <>
            <Container className="text-center rounded-3 bg-dark p-5">
                <Image src="https://images.igdb.com/igdb/image/upload/t_1080p/co2lbd.jpg" alt="Picture of the author" width={608} height={810} />
            </Container>
        </>
    )
}
