import { useState, useEffect } from 'react'

import MenuBar from '../components/MenuBar'
import MainLayout from '../components/MainLayout'
import Cover from '../components/Cover'
import NameInput from '../components/NameInput'
import { getGameData } from './api/GamesData'
import Stack from 'react-bootstrap/Stack'



export default function Home({ data }) {
  // UseState for the data
  const [gameData, setGameData] = useState(data);
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
  // Indicator to re fetch data
  const [fetchData, setFetchData] = useState(false);

  // Function to fetch new game data
  const fetchNewGameData = async () => {
    const apiResponse = await fetch('/api/GamesData');
    let data = await apiResponse.json();
    setGameData(data);
    setFetchData(false);
  }

  // Refetch data when the fetchData state changes
  useEffect(() => {
    if (fetchData) {
      fetchNewGameData();
    }
  }, [fetchData])




  // set the state with the data from the api call once the component mounts
  useEffect(() => {
    // if the data is not null, set the state with the data
    if (gameData) {
      setCoverUrl(gameData.cover.url);
      setGameName(gameData.name);
      setGameSummary(gameData.summary);
      // Reset the pixel size
      setPixelSize(10);
      // Enable pixelation
      setPixelizeEnabled(true);
      // Reset the user guess
      setFetchData(false);
    }
  }, [gameData])

  // Create a const list of the props to be sent to NameInput
  const nameInputProps = {
    userGuess,
    setUserGuess,
    gameName,
    setScore,
    score,
    pixelSize,
    setPixelSize,
    pixelizeEnabled,
    setPixelizeEnabled,
    setFetchData
  }


  return (
    <>
      <MainLayout>
        <Stack direction='vertical' gap={4}>
          <MenuBar score={score} />
          {/* Only show the game cover once the data has been loaded */}
          {data && <Cover coverUrl={coverUrl} pixelSize={pixelSize} pixelizeEnabled={pixelizeEnabled} />}
          <NameInput {...nameInputProps}
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
