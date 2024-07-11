import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router } from "react-router-dom"
// import { createPopper } from '@popperjs/core';
// window.createPopper = createPopper;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router> <App /></Router>
  </React.StrictMode>
)
