import { Route, Routes, BrowserRouter } from 'react-router-dom';

import HomePage from '../src/Pages/HomePage/HomePage'
import DetailPage from '../src/Pages/DetailPage/DetailPage'
import FormPage from '../src/Pages/FormPage/FormPage'
import LandingPage from '../src/Pages/LandingPage/LandingPage'

import './App.css'

function App() {

  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="header">
          <h1 className="title">PI Drivers</h1>
        </header>
      <Routes>
        <Route exact path= "/home" element={<HomePage/>}/>
        <Route path= "/home/:id" element={<DetailPage/>}/>
        <Route path= "/form" element={<FormPage/>}/>
        <Route path= "/landing" element={<LandingPage/>}/>
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
