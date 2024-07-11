import { useState } from 'react'
import './App.css'
import Routing from './Routes/routing'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <ToastContainer />
      <Routing />
    </>
  )
}

export default App
