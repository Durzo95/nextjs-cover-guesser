import Container from 'react-bootstrap/Container'
import { useState, useEffect } from 'react'
import PixelatedImage from './PixelatedImage'


export default function Cover({ data }) {
    const [cover, setCover] = useState(''); // this is the state that will hold the cover image url
    const [width, setWidth] = useState(608); // this is the state that will hold the cover image width
    const [height, setHeight] = useState(810); // this is the state that will hold the cover image height
    const [gameName, setGameName] = useState(''); // this is the state that will hold the game name
    const [gameSummary, setGameSummary] = useState(''); // this is the state that will hold the game summary

    const [pixelSize, setPixelSize] = useState(10); // this is the state that will hold the pixel size
    const [pixelizeEnabled, setPixelizeEnabled] = useState(true)

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
            <Container className="text-center rounded-3 bg-dark p-5">
                <PixelatedImage
                    src={cover}
                    size={pixelSize}
                    width={width}
                    height={height}
                    enabled={pixelizeEnabled}
                />
                {/* <ImagePixelated src='./ghostrunner.jpg' alt='Game Cover to Guess' pixelSize={25}
                    className="border border-light" /> */}
            </Container>
        </>
    )
}
