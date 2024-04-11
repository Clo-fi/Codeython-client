import { Route, Routes } from 'react-router-dom'
import LoginPage from './routes/login/LoginPage'
import SignUpPage from './routes/signup/SignUpPage'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
      </Routes>
    </>
  )
}

export default App
