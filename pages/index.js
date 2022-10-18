import { useState, useEffect } from 'react'

import MenuBar from '../components/MenuBar'
import MainLayout from '../components/MainLayout'
import Cover from '../components/Cover'
import NameInput from '../components/NameInput'
import { getGameData } from './api/GamesData'
import Stack from 'react-bootstrap/Stack'



export default function Home({ data }) {

  const [coverUrl, setCoverUrl] = useState('');
  const [width, setWidth] = useState(608);
  const [height, setHeight] = useState(810);
  const [gameName, setGameName] = useState('');
  const [gameSummary, setGameSummary] = useState('');

  const [pixelSize, setPixelSize] = useState(10); // This changes how big the pixels are during pixelation
  const [pixelizeEnabled, setPixelizeEnabled] = useState(true)

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
          <MenuBar />
          {/* Only show the game cover once the data has been loaded */}
          {data && <Cover coverUrl={coverUrl} pixelSize={pixelSize} pixelizeEnabled={pixelizeEnabled} />}
          <NameInput data={{ gameName }} />
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
