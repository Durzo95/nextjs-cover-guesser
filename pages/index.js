import MenuBar from '../components/MenuBar'
import MainLayout from '../components/MainLayout'
import Cover from '../components/Cover'
import NameInput from '../components/NameInput'
import { getGameData } from './api/GamesData'
import Stack from 'react-bootstrap/Stack'

export default function Home({ data }) {
  return (
    <>
      <MainLayout>
        <Stack direction='vertical' gap={4}>
          <MenuBar />
          <Cover data={data} />
          <NameInput />
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
