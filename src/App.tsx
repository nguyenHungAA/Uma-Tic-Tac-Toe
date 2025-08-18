import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import Game from './component/Game'
import Home from './component/Home';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/game' element={<Game />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
