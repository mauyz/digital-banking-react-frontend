import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}>
        </Route>
        <Route path='/home' element={<Home />}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
