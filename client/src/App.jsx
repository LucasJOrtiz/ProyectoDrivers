import { Route, Routes, BrowserRouter} from 'react-router-dom';
import React from 'react';

import HomePage from '../src/Pages/HomePage/HomePage'
import DetailPage from '../src/Pages/DetailPage/DetailPage'
import FormPage from '../src/Pages/FormPage/FormPage'
import LandingPage from '../src/Pages/LandingPage/LandingPage'
import AboutMe from '../src/Pages/AboutMe/Aboutme'
import Welcome from '../src/Pages/Welcome/Welcome'

import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path= "/" element={<Welcome/>}/>
        <Route exact path= "/home" element={<HomePage/>}/>
        <Route path= "/home/:id" element={<DetailPage/>}/>
        <Route path= "/form" element={<FormPage/>}/>
        <Route path= "/landing" element={<LandingPage/>}/>
        <Route path= "/aboutme" element={<AboutMe/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

