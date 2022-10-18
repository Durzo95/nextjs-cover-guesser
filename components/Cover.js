import Container from 'react-bootstrap/Container'
import { useState, useEffect, useRef } from 'react'
import PixelatedImage from './PixelatedImage'
import Image from 'next/image';


export default function Cover({ data }) {
    const [cover, setCover] = useState(''); // this is the state that will hold the cover image url
    const [width, setWidth] = useState(608); // this is the state that will hold the cover image width
    const [height, setHeight] = useState(810); // this is the state that will hold the cover image height
    const [gameName, setGameName] = useState(''); // this is the state that will hold the game name
    const [gameSummary, setGameSummary] = useState(''); // this is the state that will hold the game summary

    const [pixelSize, setPixelSize] = useState(10); // this is the state that will hold the pixel size
    const [pixelizeEnabled, setPixelizeEnabled] = useState(false)

    // set the state with the data from the api call once the component mounts
    useEffect(() => {
        // if the data is not null, set the state with the data
        if (data) {
            setCover(data.cover.url);
            setWidth(data.cover.width);
            setHeight(data.cover.height);
            setGameName(data.name);
            setGameSummary(data.summary);
        }
    }, [data])

    return (
        <>
            <Container className="rounded-3 bg-dark p-5 position-relative">
                {/* This is used to make sure the above container scales correctly with the SVG, it's bad workaround lol. Does not display on the screen*/}
                <Image src={cover} alt={gameName} width={width} height={height} className='d-none' />
                <PixelatedImage
                    src={cover}
                    size={pixelSize}
                    enabled={pixelizeEnabled}
                />
            </Container>
        </>
    )
}
