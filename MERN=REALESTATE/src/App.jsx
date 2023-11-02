import React from 'react'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/signin'
import Signout from './pages/signout'
import About from './pages/about'
import Profile from './pages/profile'
import Header from './Components/Header'
export default function App() {
  return <BrowserRouter>
    <Header></Header>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sign-in' element={<Signin />} />
      <Route path='/sign-out' element={<Signout />} />
      <Route path='/about' element={<About />} />
      <Route path='/profile' element={<Profile />} />
      
  </Routes>
  
  </BrowserRouter>
}