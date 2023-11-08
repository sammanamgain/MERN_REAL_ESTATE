import React from 'react'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/signin'
import Signup from './pages/signup'
import About from './pages/about'
import Profile from './pages/profile'
import Header from './Components/Header'
import PrivateRoute from './Components/privateRoute'
import CreateListing from './pages/CreateListing'
import UpdatListing from './pages/UpdatListing'
import Listing from './pages/Listing';
import Search from './pages/Search'
export default function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route path="/search" element={<Search />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/update-listing/:listingId" element={<UpdatListing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}