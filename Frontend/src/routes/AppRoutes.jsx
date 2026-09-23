import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import FoodPartnerLogin from '../pages/FoodPartnerLogin'
import FoodPartnerRegister from '../pages/FoodPartnerRegister'
import UserLogin from '../pages/UserLogin'
import UserRegister from '../pages/UserRegister'
import Home from '../pages/general/Home'
import CreateFood from '../pages/food-partner/CreateFood'
import Profile from '../pages/food-partner/Profile'
import Saved from '../pages/general/Saved'
import UserProfile from '../pages/general/UserProfile'

const AppRoutes = () => {
  return (
    <div>
      <Router>
        <Routes>
            <Route path='/user/register' element={<UserRegister />}/>
            <Route path='/user/login' element={<UserLogin />}/>
            <Route path='/food-partner/register' element={<FoodPartnerRegister />}/>
            <Route path='/food-partner/login' element={<FoodPartnerLogin />}/>
            <Route path='/' element={<Home/>}/>
            <Route path='/create-food' element={<CreateFood/>}/>
            <Route path='/food-partner/:id' element={<Profile/>}/>
            <Route path='/saved' element={<Saved/>}/>
            <Route path='/profile' element={<UserProfile/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default AppRoutes
