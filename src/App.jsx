import { useState } from 'react'
import './App.css'
import Homepage from './Pages/Homepage/Homepage'
import Cardpage from './Pages/Cardpage/Cardpage'
import Errorpage from './Pages/Errorpage/Errorpage'
import { Routes, Route } from 'react-router-dom'

function App() {
  

  return (
    <>
   <Routes>
    <Route path='/' element={<Homepage></Homepage>}></Route>
    <Route path='/pages/:id' element={ <Cardpage></Cardpage>}></Route>
    <Route path='*' element={ <Errorpage></Errorpage>}></Route>
    
   </Routes>
    </>
  )
}

export default App
