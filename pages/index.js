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
  const [gameName, setGameName] = useState('');
  const [gameSummary, setGameSummary] = useState('');
  // The pixelation settings
  const [pixelSize, setPixelSize] = useState(10); // This changes how big the pixels are during pixelation
  const [pixelizeEnabled, setPixelizeEnabled] = useState(true)
  // Game State Settings
  const [userGuess, setUserGuess] = useState('');
  const [score, setScore] = useState(0);
  // New Game button
  const [newGame, setNewGame] = useState(false);

  // Get a new game when the new game button is clicked
  useEffect(() => {
    if (newGame) {
      // Get new game data from the IGDB API
      const data = getGameData().then(data => {
        // Set the state with the new game data
        setCoverUrl(data.cover.url);
        setGameName(data.name);
        setGameSummary(data.summary);
        // Clear the user's guess
        setUserGuess('');
        // Reset the new game button
        setNewGame(false);
      })
    }

  }, [newGame])


  // set the state with the data from the api call once the component mounts
  useEffect(() => {
    // if the data is not null, set the state with the data
    if (data) {
      setCoverUrl(data.cover.url);
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
