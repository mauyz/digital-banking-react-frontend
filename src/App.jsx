import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Register from './components/Register'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />}>
          <Route path='register' element={<Register />} />
        </Route>
        <Route path='login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
