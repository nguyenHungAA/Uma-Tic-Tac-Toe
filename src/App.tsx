import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'

import Game from './pages/game/Game';
import HomePage from './pages/home/HomePage';
import UmaList from './pages/umaList/UmaList';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/uma-list' element={<UmaList />} />
        <Route path='/game' element={<Game />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
