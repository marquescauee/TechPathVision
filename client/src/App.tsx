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
import { AuthProvider, useAuth } from './contexts/useAuth'
import { CareersProvider } from './contexts/useCareersContext'

type PrivateRoutesProps = {
  Item: React.FC
}

const PrivateRoutes = ({ Item }: PrivateRoutesProps) => {
  const { getCredentials } = useAuth()

  return getCredentials().token && getCredentials().user ? <Item /> : <LoginRegisterPage />
}

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <CareersProvider>
            <Header />
            <Routes>
              <Route element={<HomePage />} path="/"></Route>
              <Route element={<MapProfilePage />} path="/map-profile"></Route>
              <Route element={<Career />} path="/careers-found"></Route>
              <Route element={<RoadmapPage />} path="/generated-roadmap"></Route>
              <Route element={<LoginRegisterPage />} path="/login"></Route>
              <Route element={<LoginRegisterPage />} path="/register"></Route>
              <Route element={<ForgotPasswordPage />} path="/forgot-password"></Route>
              <Route element={<ChangePasswordPage />} path="/set-new-password/:token"></Route>

              <Route element={<PrivateRoutes Item={MyProfilePage} />} path="/my-profile"></Route>

              <Route path="*" element={<HomePage />}></Route>
            </Routes>
          </CareersProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
