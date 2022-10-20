import React from 'react'
import { Container } from 'react-bootstrap'
import Image from 'next/image'
// import heart.svg
import heart from '../public/heart.svg'

export default function HealthBar({ health }) {
    return (
        <>
            <Container className='bg-dark rounded-3'>
                {/* Display heart.svg with how much health you have */}
                {[...Array(health)].map((h, i) =>
                    <Image key={i} src={heart} alt='heart' />
                )}
            </Container>

        </>
    )
}
