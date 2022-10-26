import { useState, useEffect } from 'react'

import MenuBar from '../components/MenuBar'
import MainLayout from '../components/MainLayout'
import Cover from '../components/Cover'
import NameInput from '../components/NameInput'
import HealthBar from '../components/HealthBar.js'
import Stack from 'react-bootstrap/Stack'
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

const maxHealth = 4;
const maxPixelSize = 10;

export default function Home() {
  // UseState for the data
  const [gameData, setGameData] = useState();
  // The values from the IGDB API
  const [coverUrl, setCoverUrl] = useState('');
  const [gameName, setGameName] = useState('');
  const [gameSummary, setGameSummary] = useState('');
  const [gameReleaseDate, setGameReleaseDate] = useState('');
  const [gameRating, setGameRating] = useState('');
  const [gameGenres, setGameGenres] = useState('');
  // The pixelation settings
  const [pixelSize, setPixelSize] = useState(10); // This changes how big the pixels are during pixelation
  const [pixelizeEnabled, setPixelizeEnabled] = useState(true)
  // Game State Settings
  const [userGuess, setUserGuess] = useState('');
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(maxHealth);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [restartGame, setRestartGame] = useState(false);
  // Indicator to re fetch data
  const [fetchData, setFetchData] = useState(false);

  const notifyCorrectGuess = () => {
    let message = `Correct! ${gameName} was released in ${gameReleaseDate} and has a rating of ${gameRating}`;
    toast.success(message);
  }

  const notifyGameLost = () => {
    let message = `Game Over! ${gameName} was released in ${gameReleaseDate} and has a rating of ${gameRating}`;
    toast.error(message);
  }

  const notifyIncorrectGuess = () => {
    let hint = '';

    if (health == 3) {
      hint = `Hint: Game was released in ${gameReleaseDate}`;
    }
    else if (health == 2) {
      hint = `Hint: Game has the following genres ${gameGenres}`;
    }
    else if (health == 1) {
      hint = `Hint: ${gameSummary}`;
    }

    let message = `Incorrect! ${hint}`;


    toast.error(message);
  }


  const resetGameState = (resetScore = true) => {
    setFetchData(true);
    setGameWon(false);
    setGameLost(false);
    setHealth(maxHealth);
    setPixelSize(maxPixelSize);
    setUserGuess('');
    if (resetScore) {
      setScore(0);
    }
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
      // Set the release date
      setGameReleaseDate(gameData.first_release_date);
      // Set the rating
      setGameRating(gameData.rating);
      // Set the genres
      setGameGenres(gameData.genres);

    }
  }, [gameData])

  // What happens when the user wins or loses
  useEffect(() => {
    if (gameWon) {
      // alert('Correct!');
      notifyCorrectGuess();
      setPixelizeEnabled(false);
      setScore(score + 1);
      // Reset the game state
      // Do not reset the score
      resetGameState(false);
    }
    else if (gameLost) {
      // alert('Game Over!');
      setPixelizeEnabled(false);
      resetGameState();
    }
    // eslint-disable-next-line
  }, [gameWon, gameLost])

  // When the user presses the restart button
  useEffect(() => {
    if (restartGame) {
      setScore(0);
      resetGameState();
      setRestartGame(false);
    }
  }, [restartGame])


  // What happens when the user loses health
  // The user never gains health, only loses it
  useEffect(() => {
    if (health === 0) {
      notifyGameLost();
      // set the gameLost state to true
      setGameLost(true);

    }
    else if (health < maxHealth) {
      // alert('Incorrect!');
      notifyIncorrectGuess();
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

  // Create a const list of the props to be sent to the toast notification
  const toastNotificationProps = {
    gameWon,
    gameLost,
    restartGame,
    gameName,
    gameSummary,
    gameReleaseDate,
    gameRating,
    gameGenres
  }


  return (
    <>
      <MainLayout>
        <Stack direction='vertical' gap={4}>
          <MenuBar score={score} setRestartGame={setRestartGame} />
          <HealthBar health={health} />
          {/* Only show the game cover once the data has been loaded */}
          {gameData && <Cover coverUrl={coverUrl} pixelSize={pixelSize} pixelizeEnabled={pixelizeEnabled} />}
          <NameInput {...nameInputProps} />
        </Stack>
      </MainLayout  >
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </>
  )
}