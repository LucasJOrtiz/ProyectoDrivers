import { Route, Routes, BrowserRouter } from 'react-router-dom';

import HomePage from '../src/Pages/HomePage/HomePage'
import DetailPage from '../src/Pages/DetailPage/DetailPage'
import FormPage from '../src/Pages/FormPage/FormPage'
import LandingPage from '../src/Pages/LandingPage/LandingPage'

import './App.css'

function App() {

  return (
    <BrowserRouter>
      <div>
      <h1>PI Drivers</h1>
      </div>
      <Routes>
        <Route exact path= "/home" element={<HomePage/>}/>
        <Route path= "/home/:id" element={<DetailPage/>}/>
        <Route path= "/form" element={<FormPage/>}/>
        <Route path= "/landing" element={<LandingPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
