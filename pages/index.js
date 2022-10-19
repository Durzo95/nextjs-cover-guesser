import { useState, useEffect } from 'react'

import MenuBar from '../components/MenuBar'
import MainLayout from '../components/MainLayout'
import Cover from '../components/Cover'
import NameInput from '../components/NameInput'
import { getGameData } from './api/GamesData'
import Stack from 'react-bootstrap/Stack'



export default function Home({ data }) {
  // The values from the IGDB API
  const [coverUrl, setCoverUrl] = useState('');
  const [width, setWidth] = useState(608);
  const [height, setHeight] = useState(810);
  const [gameName, setGameName] = useState('');
  const [gameSummary, setGameSummary] = useState('');
  // The pixelation settings
  const [pixelSize, setPixelSize] = useState(10); // This changes how big the pixels are during pixelation
  const [pixelizeEnabled, setPixelizeEnabled] = useState(true)
  // Game State Settings
  const [userGuess, setUserGuess] = useState('');
  const [score, setScore] = useState(0);
  const [guesses, setGuesses] = useState(0);
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);

  // set the state with the data from the api call once the component mounts
  useEffect(() => {
    // if the data is not null, set the state with the data
    if (data) {
      setCoverUrl(data.cover.url);
      setWidth(data.cover.width);
      setHeight(data.cover.height);
      setGameName(data.name);
      setGameSummary(data.summary);
    }
  }, [data])

  return (
    <>
      <MainLayout>
        <Stack direction='vertical' gap={4}>
          <MenuBar score={score} />
          {/* Only show the game cover once the data has been loaded */}
          {data && <Cover coverUrl={coverUrl} pixelSize={pixelSize} pixelizeEnabled={pixelizeEnabled} />}
          <NameInput
            gameName={gameName}
            setUserGuess={setUserGuess}
            userGuess={userGuess}
            guesses={guesses}
            setGuesses={setGuesses}
            correctGuesses={correctGuesses}
            setCorrectGuesses={setCorrectGuesses}
            incorrectGuesses={incorrectGuesses}
            setIncorrectGuesses={setIncorrectGuesses}
            score={score}
            setScore={setScore}
          />
        </Stack>
      </MainLayout>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const data = await getGameData();

  console.log(data);
  return { props: { data } }
}
