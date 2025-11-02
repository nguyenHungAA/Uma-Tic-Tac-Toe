import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'

import Game from './pages/game/Game';
import HomePage from './pages/home/HomePage';
import UmaList from './pages/umaList/UmaList';
import UmaProfilePage from './pages/umaProfile/UmaProfilePage';
import Layout from '@/layout/commonLayout/Layout';
import AuthLayout from './layout/authLayout/AuthLayout';
import LoginPage from './pages/auth/login/LoginPage';
import SignupPage from './pages/auth/signup/SignupPage';
import Faq from './pages/faq/Faq';
import VideoPage from './pages/video/VideoPage';
import ProfilePage from './pages/user/ProfilePage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='/uma-list' element={<UmaList />} />
          <Route path='/profile/:id' element={<UmaProfilePage />} />
          <Route path='/user/profile/:id' element={<ProfilePage />} />
          <Route path='/:id/game' element={<Game />} />
          <Route path='/faq' element={<Faq />} />
        </Route>

        <Route path='/profile/:id/intro-video' element={<VideoPage />} />

        <Route path='/auth' element={<AuthLayout />}>
          <Route path='login' element={<LoginPage />} />
          <Route path='signup' element={<SignupPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
