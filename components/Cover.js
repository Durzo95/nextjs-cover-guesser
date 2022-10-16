import Image from 'next/image'
import Container from 'react-bootstrap/Container'
import { getGameData } from '../pages/api/GamesData'
import { useState, useEffect } from 'react'


export default function Cover({ data }) {
    const [cover, setCover] = useState(''); // this is the state that will hold the cover image url
    const [width, setWidth] = useState(608); // this is the state that will hold the cover image width
    const [height, setHeight] = useState(810); // this is the state that will hold the cover image height
    const [gameName, setGameName] = useState(''); // this is the state that will hold the game name
    const [gameSummary, setGameSummary] = useState(''); // this is the state that will hold the game summary

    console.log(data)
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
                <Image src={cover} alt='Game Cover to Guess' width={width} height={height} className="border border-light" />
                {/*width={608} height={810} */}
            </Container>
        </>
    )
}
