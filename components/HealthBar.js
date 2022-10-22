import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import Image from 'next/image'
// import heart.svg
import heart from '../public/heart.svg'

export default function HealthBar({ health }) {
    return (
        <>
            <Container className='bg-dark rounded-3 top-bar'>
                {/* Loop through and add hears centered and spaced evenly */}
                <Row className='justify-content-center'>
                    {[...Array(health)].map((h, i) =>
                        <Col key={i} className='text-center'>
                            <Image src={heart} alt='heart' />
                        </Col>
                    )}
                </Row>
            </Container>
        </>
    )
}
