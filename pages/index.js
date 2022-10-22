import { useState, useEffect } from 'react'

import MenuBar from '../components/MenuBar'
import MainLayout from '../components/MainLayout'
import Cover from '../components/Cover'
import NameInput from '../components/NameInput'
import HealthBar from '../components/HealthBar.js'
import { getGameData } from './api/GamesData'
import Stack from 'react-bootstrap/Stack'

const maxHealth = 4;
const maxPixelSize = 10;

export default function Home() {
  // UseState for the data
  const [gameData, setGameData] = useState();
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
  const [health, setHealth] = useState(maxHealth);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  // Indicator to re fetch data
  const [fetchData, setFetchData] = useState(false);

  const resetGameState = () => {
    setFetchData(true);
    setGameWon(false);
    setGameLost(false);
    setHealth(maxHealth);
    setPixelSize(maxPixelSize);
    setUserGuess('');
  }
  // Function to fetch new game data
  // This has to be a seperate function because useEffect can't be async
  const fetchNewGameData = async () => {
    const apiResponse = await fetch('/api/GamesData');
    let data = await apiResponse.json();
    setGameData(data);
    setFetchData(false);
  }
  // fetch the data initially
  useEffect(() => { setFetchData(true); }, [])

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
      setPixelSize(maxPixelSize);
      // Enable pixelation
      setPixelizeEnabled(true);
    }
  }, [gameData])

  // What happens when the user wins or loses
  useEffect(() => {
    if (gameWon) {
      alert('Correct!');
      setPixelizeEnabled(false);
      setScore(score + 1);
      resetGameState();
    }
    else if (gameLost) {
      alert('Game Over!');
      setPixelizeEnabled(false);
      setScore(0);
      resetGameState();
    }
    // eslint-disable-next-line
  }, [gameWon, gameLost])

  // What happens when the user loses health
  // The user never gains health, only loses it
  useEffect(() => {
    if (health === 0) {
      // set the gameLost state to true
      setGameLost(true);
    }
    else if (health < maxHealth) {
      alert('Incorrect!');
      setUserGuess('');
      if (pixelSize > 4) {
        setPixelSize(pixelSize - 2);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [health])


  // Create a const list of the props to be sent to NameInput
  const nameInputProps = {
    userGuess,
    setUserGuess,
    gameName,
    setGameLost,
    setGameWon,
    health,
    setHealth,
  }
  return (
    <>
      <MainLayout>
        <Stack direction='vertical' gap={4}>
          <MenuBar score={score} />
          <HealthBar health={health} />
          {/* Only show the game cover once the data has been loaded */}
          {gameData && <Cover coverUrl={coverUrl} pixelSize={pixelSize} pixelizeEnabled={pixelizeEnabled} />}
          <NameInput {...nameInputProps}
          />
        </Stack>
      </MainLayout>
    </>
  )
}