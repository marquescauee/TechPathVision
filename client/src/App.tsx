import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/common/header/Header'
import HomePage from './pages/home/HomePage'
import MapProfilePage from './pages/map-profile/MapProfilePage'
import LoginRegisterPage from './pages/login-register/LoginRegisterPage'
import Career from './pages/careers-found/CareerPage'
import RoadmapPage from './pages/view-roadmap/RoadmapPage'
import ForgotPasswordPage from './pages/forgot-password/ForgotPasswordPage'
import ChangePasswordPage from './pages/change-password/ChangePasswordPage'
import MyProfilePage from './pages/my-profile-page/MyProfilePage'

const App = () => {
  return (
    <>
      <Header />

      <BrowserRouter>
        <Routes>
          <Route element={<HomePage />} path="/"></Route>
          <Route element={<MapProfilePage />} path="/map-profile"></Route>
          <Route element={<Career />} path="/careers-found"></Route>
          <Route element={<RoadmapPage />} path="/generated-roadmap"></Route>
          <Route element={<LoginRegisterPage />} path="/login"></Route>
          <Route element={<LoginRegisterPage />} path="/register"></Route>
          <Route element={<ForgotPasswordPage />} path="/forgot-password"></Route>
          <Route element={<ChangePasswordPage />} path="/set-new-password"></Route>
          <Route element={<MyProfilePage />} path="/my-profile"></Route>
          <Route path="*" element={<HomePage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
