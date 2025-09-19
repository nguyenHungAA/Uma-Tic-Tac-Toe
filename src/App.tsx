import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'

import Game from './pages/game/Game';
import HomePage from './pages/home/HomePage';
import UmaList from './pages/umaList/UmaList';
import ProfilePage from './pages/profile/ProfilePage';
import Layout from '@/layout/commonLayout/Layout';
import AuthLayout from './layout/authLayout/AuthLayout';
import LoginPage from './pages/auth/login/LoginPage';
import SignupPage from './pages/auth/signup/SignupPage';
import Faq from './pages/faq/Faq';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='/uma-list' element={<UmaList />} />
          <Route path='/profile/:id' element={<ProfilePage />} />
          <Route path='/:id/game' element={<Game />} />
          <Route path='/faq' element={<Faq />} />
        </Route>

        <Route path='/auth' element={<AuthLayout />}>
          <Route path='login' element={<LoginPage />} />
          <Route path='signup' element={<SignupPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
