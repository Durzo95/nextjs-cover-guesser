import MenuBar from '../components/MenuBar'
import MainLayout from '../components/MainLayout'
import Cover from '../components/Cover'
import NameInput from '../components/NameInput'

export default function Home() {
  return (
    <>
      <MainLayout>
        <MenuBar />
        <Cover />
        <NameInput />
      </MainLayout>
    </>
  )
}



