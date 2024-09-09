import HomeDescription from '../../components/home/home-description/HomeDescription'
import HomeTitle from '../../components/home/home-title/HomeTitle'
import StartButton from '../../components/home/start-button/StartButton'
import './HomePager.css'

const HomePage = () => {
  return (
    <div className="home-page">
      <HomeTitle />
      <HomeDescription />
      <StartButton />
    </div>
  )
}

export default HomePage
